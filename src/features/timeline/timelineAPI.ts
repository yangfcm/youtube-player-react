import { AxiosResponse } from "axios";
import {
  doc,
  query,
  orderBy,
  startAt,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../settings/firebaseConfig";

export async function fetchTimelineAPI(userId: string) {
  const timelineCollectionRef = collection(db, "users", userId, "items");
  const timelineQuery = query(
    timelineCollectionRef,
    orderBy("publishTimestamp", "desc")
  );
  const querySnapshot = await getDocs(timelineQuery);
  const timelineVideos: any[] = [];
  querySnapshot.forEach((doc) => {
    timelineVideos.push(doc.data());
  });
  return timelineVideos;
}
