/**
 * Separate every 3 number digits by comma.
 * e.g. 12345678 => 12,345,678
 * @param {number} number
 */
export const separateNumber = number => {
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
