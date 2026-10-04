/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {
  cleanup,
  updateTimeline,
  onUserLoginChanged,
  onUserSubscriptionChanged,
} from "./functions";
import {
  REGION_AU,
  MAX_TIMEOUT_SECONDS,
  AT_2_AM_EVERY_DAY,
  ALLOWED_ORIGINS,
} from "./config";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

exports.updateTimeline = functions
  .runWith({ timeoutSeconds: MAX_TIMEOUT_SECONDS })
  .region(REGION_AU)
  .pubsub.schedule(AT_2_AM_EVERY_DAY)
  .onRun(updateTimeline);

exports.cleanup = functions
  .runWith({ timeoutSeconds: MAX_TIMEOUT_SECONDS })
  .region(REGION_AU)
  .pubsub.schedule(AT_2_AM_EVERY_DAY)
  .onRun(cleanup);

exports.onUserLoggedIn = functions
  .runWith({ timeoutSeconds: MAX_TIMEOUT_SECONDS })
  .region(REGION_AU)
  .firestore.document("users/{userId}")
  .onWrite(onUserLoginChanged);

exports.onUserSubscriptionsChanged = functions
  .runWith({ timeoutSeconds: MAX_TIMEOUT_SECONDS })
  .region(REGION_AU)
  .firestore.document("users/{userId}")
  .onWrite(onUserSubscriptionChanged);

const app = express();

app.use(cors({ origin: ALLOWED_ORIGINS }));

exports.widgets = functions.region(REGION_AU).https.onRequest(app);
