import { TIMELINE_UPDATE_THROTTLE, db } from "../config";
import { createUserTimeline } from "./createUserTimeline";
import { getAllUsers } from "./utils";

export const updateTimeline = async () => {
  const users = await getAllUsers();
  for (const user of users) {
    const timelineRef = db.collection("timeline").doc(user.id);
    const timelineDoc = await timelineRef.get();
    const lastUpdatedAt = timelineDoc.exists
      ? timelineDoc.data()?.updatedAt || 0
      : 0;

    if (Date.now() - lastUpdatedAt > TIMELINE_UPDATE_THROTTLE) {
      await createUserTimeline(user);
    }
  }
};
