const MINUTE = 1000 * 60; // How many milliseconds for one minute.
const HOUR = MINUTE * 60; // How many milliseconds for one hour.
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

export function fromNow(time: Date | number | string): string {
  if (typeof time === "string" && isNaN(new Date(time).getTime())) return time; // If argument time is not a representation of date time, return it as it is.

  let then = 0;
  if (typeof time === "number") {
    then = time;
  }
  const now = Date.now(); // Timestamp for now.
  then = Date.parse(
    time instanceof Date ? time.toISOString() : time.toString()
  ); // Timestamp for time.
  const diff = now - then;

  const diffYear = Math.floor(diff / YEAR);
  if (diffYear > 0)
    return diffYear + " year" + (diffYear > 1 ? "s" : "") + " ago";

  const diffMonth = Math.floor(diff / MONTH);
  if (diffMonth > 0)
    return diffMonth + " month" + (diffMonth > 1 ? "s" : "") + " ago";

  const diffDay = Math.floor(diff / DAY);
  if (diffDay > 0) return diffDay + " day" + (diffDay > 1 ? "s" : "") + " ago";

  const diffHour = Math.floor(diff / HOUR);
  if (diffHour > 0)
    return diffHour + " hour" + (diffHour > 1 ? "s" : "") + " ago";

  const diffMinute = Math.floor(diff / MINUTE);
  if (diffMinute > 0)
    return diffMinute + " minute" + (diffMinute > 1 ? "s" : "") + " ago";

  return "Just now";
}

/**
 * Separate every 3 number digits by comma.
 * e.g. 12345678 => 12,345,678
 * @param {number} number
 */
export const formatNumber = (number: number) => {
  let strNum = String(number);
  let arrNum = strNum.split("");
  let arr = [];
  let part = "";
  for (let i = 0; i < arrNum.length; i++) {
    let num = arrNum[arrNum.length - i - 1];
    part = num + part;
    if ((i + 1) % 3 === 0) {
      arr.unshift(part);
      part = "";
    }
  }
  if (part.length > 0) {
    arr.unshift(part);
  }
  return arr.join(",");
};

export const getSearchString = (search: string, key: string) => {
  const query = search.substring(1); // Remove the first '?' letter
  const vars = query.split("&");
  let value = "";
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === key) {
      value = decodeURIComponent(pair[1]);
      break;
    }
  }
  return value;
};

export const formatDate = (date: string | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
