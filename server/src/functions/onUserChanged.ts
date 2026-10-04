import { Change, firestore } from "firebase-functions";
import { logger, TIMELINE_UPDATE_THROTTLE } from "../config";
import { getSubscriptionsDiff } from "../utils";
import { User } from "../types";
import { createUserTimeline } from "./createUserTimeline";

export const onUserLoginChanged = async (
  change: Change<firestore.DocumentSnapshot>,
) => {
  logger.info("On user loggedin.");
  const newUser = change.after.data() as User | undefined;
  const oldUser = change.before.data() as User | undefined;
  if (!newUser || !newUser.accessToken) return;

  if (
    newUser.lastLogin - (oldUser?.lastLogin || 0) >
    TIMELINE_UPDATE_THROTTLE
  ) {
    logger.info("Create user timeline", newUser);
    await createUserTimeline(newUser);
  }
};

export const onUserSubscriptionChanged = async (
  change: Change<firestore.DocumentSnapshot>,
) => {
  logger.info("On UserSubscriptionsChanged.");
  const newUser = change.after.data() as User;
  const oldUser = change.before.data() as User;

  if (newUser && oldUser && newUser.accessToken === oldUser.accessToken) {
    const subscriptionsDiff = getSubscriptionsDiff({
      oldUser,
      newUser,
    });
    const { subscribed, unsubscribed } = subscriptionsDiff;

    if (subscribed.length > 0 || unsubscribed.length > 0) {
      logger.info("Update timeline", subscriptionsDiff);
      await createUserTimeline(newUser, subscriptionsDiff);
    }
  }
};
