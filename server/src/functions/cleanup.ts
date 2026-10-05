import { logger, db, TIMELINE_THRESHOLD } from "../config";
import { getAllUsers } from "./utils";

const removeOldVideosFromTimeline = async () => {
  try {
    const users = await getAllUsers();
    for (const user of users) {
      const timelineRef = db.collection("timeline").doc(user.id);
      const timelineCollectionRef = timelineRef.collection("items");
      const querySnapshot = await timelineCollectionRef
        .where("publishTimestamp", "<", Date.now() - TIMELINE_THRESHOLD)
        .get();
      for (const doc of querySnapshot.docs) {
        const docRef = timelineCollectionRef.doc(doc.id);
        await docRef.delete();
      }
      const countSnapshot = await timelineCollectionRef
        .where("isActive", "==", true)
        .count()
        .get();
      const totalCount = countSnapshot.data().count;
      await timelineRef.set(
        {
          totalCount,
        },
        { merge: true },
      );
      logger.info("Removed old videos for user", user, totalCount);
    }
  } catch (err: any) {
    logger.error("Failed to remove docs from timeline", err.message);
  }
};

export const cleanup = async () => {
  // await removeDownloadedVideos();
  // await removeDownloadFilesFromStorage();
  // await removeDocsInDownloadProgress();
  await removeOldVideosFromTimeline();
};
