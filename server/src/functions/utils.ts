import { User } from "../types";
import { db, logger } from "../config";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const users: User[] = [];
    const usersSnapshot = await db.collection("users").get();
    usersSnapshot.forEach((doc) => {
      users.push(doc.data() as User);
    });
    logger.info("Got all users ", users.length);

    return users;
  } catch (err: any) {
    logger.error("Error when getting all users", err.message);
    return [];
  }
};
