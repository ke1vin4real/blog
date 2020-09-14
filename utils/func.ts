/***
 * @description {Date} => yyyy-MM-dd HH:mm:ss
 * @param {Date} date date对象
 * @returns {string}
 * @constructor
 */
export const convertDateFormat = function(date: Date | string) {
  const _date = date instanceof Date ? date : new Date(date);
  const day = _date.getDate();
  const month = _date.getMonth();
  return `${_date.getFullYear()}-${month < 9 ? '0' + (month + 1) : month + 1}-${day < 10 ? '0' + day : day}`;
};
