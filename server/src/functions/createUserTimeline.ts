import { db, logger } from "../config";
import { SubscriptionDiff, User, Video } from "../types";
import { fetchVideosInChannel } from "../api";

export const getCurrentTimelineData = async (userId: string) => {
  let updatedAt = 0;
  try {
    const timelineRef = db.collection("timeline").doc(userId);
    const timelineDoc = await timelineRef.get();
    if (timelineDoc.exists) {
      updatedAt = timelineDoc.data()?.updatedAt || 0;
    }
    return {
      updatedAt,
    };
  } catch (e) {
    return {
      updatedAt: 0,
    };
  }
};

export const createUserTimeline = async (
  user: User,
  diff?: SubscriptionDiff
) => {
  const { subscribed = [], unsubscribed = [] } = diff || {};
  const userChannelIds = (user.subscriptions || []).filter(
    (c) => !subscribed.includes(c)
  );

  const { updatedAt } = await getCurrentTimelineData(user.id);

  const timelineRef = db.collection("timeline").doc(user.id);
  const timelineCollectionRef = timelineRef.collection("items");
  await timelineRef.set(
    {
      loading: true,
    },
    { merge: true }
  );

  logger.info(
    "Start creating timeline",
    updatedAt,
    subscribed,
    unsubscribed,
    userChannelIds
  );

  {
    // Add videos from newly subscribed channels to timeline.
    let videos: Video[] = [];
    for (const channelId of subscribed) {
      const videosInChannel = await fetchVideosInChannel({
        channelId,
      });
      videos = [...videos, ...videosInChannel];
    }
    const batch = db.batch();
    for (const item of videos) {
      const docRef = timelineCollectionRef.doc(item.id);
      batch.set(docRef, item);
    }
    await batch.commit();
    logger.info("Finish subscribed", videos.length);
  }

  {
    // Add new videos from already subscribed channels to timeline since last update time.
    {
      let videos: Video[] = [];
      for (const channelId of userChannelIds) {
        const videosInChannel = await fetchVideosInChannel({
          channelId,
          publishedAfter: updatedAt,
        });
        videos = [...videos, ...videosInChannel];
      }
      const batch = db.batch();
      for (const item of videos) {
        const docRef = timelineCollectionRef.doc(item.id);
        batch.set(docRef, item);
      }
      await batch.commit();
      logger.info("Finish original subscriptions", videos.length);
    }
  }

  {
    // Remove videos from timeline for unsubscribed channels.
    for (const channelId of unsubscribed) {
      const querySnapshot = await timelineCollectionRef
        .where("channelId", "==", channelId)
        .get();
      for (const doc of querySnapshot.docs) {
        const docRef = timelineCollectionRef.doc(doc.id);
        await docRef.delete();
      }
    }
    logger.info("Finish unsubscribed");
  }

  // Recompute totalCount from the actual collection instead of tracking it
  // incrementally, since upserts (same video re-fetched across overlapping
  // or concurrent runs) would otherwise double-count.
  const countSnapshot = await timelineCollectionRef
    .where("isActive", "==", true)
    .count()
    .get();
  const totalCount = countSnapshot.data().count;

  // Save totalCount and update timestamp.
  await timelineRef.set(
    {
      updatedAt: Date.now(),
      totalCount,
      loading: false,
    },
    { merge: true }
  );
  logger.info("Saved user timeline", totalCount);
};
