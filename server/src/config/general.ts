export const ONE_MINUTE = 60 * 1000;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = ONE_HOUR * 24;
export const TIMELINE_THRESHOLD = 30 * ONE_DAY;
export const REGION_AU = "australia-southeast1";
export const MAX_TIMEOUT_SECONDS = 9 * 60;
export const AT_2_AM_EVERY_DAY = "0 2 * * *";
export const ALLOWED_ORIGINS = [
  "https://fantube.netlify.app",
  "http://localhost:3000",
  "http://localhost:8080",
];

// Minimum time that must pass since a user's last login before their timeline
// is rebuilt again. Overridable via env for tuning without a code change.
export const TIMELINE_UPDATE_THROTTLE =
  Number(process.env.TIMELINE_UPDATE_THROTTLE_MS) || 2 * ONE_HOUR;
