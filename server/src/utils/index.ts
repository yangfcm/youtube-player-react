import { SubscriptionDiff, User } from "../types";

export const getTimeInISO08601Format = (timestamp: number) => {
  const t = new Date(timestamp);
  const year = t.getUTCFullYear();
  const month = (t.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = t.getUTCDate().toString().padStart(2, "0");
  const hours = t.getUTCHours().toString().padStart(2, "0");
  const minutes = t.getUTCMinutes().toString().padStart(2, "0");
  const seconds = t.getUTCSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};

/**
 * Given the number of channels a user subscribed and return the maximum number of videos to fetch.
 * This is to prevent a very big timeline if the user subscribes many channels.
 * If user subscribes many channels, fetch less videos. Otherwise, fetch more videos.
 * @param channelCount How many channels a user has subscribed
 */
export const getMaxVideosToFetch = (channelCount: number) => {
  let maximum = 10;
  if (channelCount <= 10) {
    maximum = 30;
  } else if (channelCount <= 100) {
    maximum = 10;
  } else {
    maximum = 5;
  }
  return maximum;
};

/**
 * Get the difference in the given user's subscriptions
 * @param users
 * @returns
 */
export const getSubscriptionsDiff = (users: {
  oldUser: User;
  newUser: User;
}): SubscriptionDiff => {
  const { oldUser, newUser } = users;
  const oldSubscriptions = oldUser.subscriptions || [];
  const newSubscriptions = newUser.subscriptions || [];

  const subscribed = newSubscriptions.filter(
    (el) => !oldSubscriptions.includes(el)
  );
  const unsubscribed = oldSubscriptions.filter(
    (el) => !newSubscriptions.includes(el)
  );

  return {
    subscribed,
    unsubscribed,
  };
};

export const escapeSpecialCharacters = (str: string) => {
  const specialCharsRegex = /[<>\/\\?'",:;{}()&*^$%#@!`]|[\p{Emoji}]/gu;
  const escaped = str.replace(specialCharsRegex, (match) => {
    if (/^\d+$/.test(match)) {
      return match; // Don't escape numbers
    } else {
      return "_"; // Escape special characters
    }
  });
  return escaped.replace(" ", "_");
};
