import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();
export const db = admin.firestore();
const storage = admin.storage();
export const bucket = storage.bucket();

export const { logger, firestore } = functions;
