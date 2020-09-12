/***
 * date => yyyy-MM-dd HH:mm:ss
 *
 * @param date date对象
 * @param type
 * @returns {string}
 * @constructor
 */
export const convertDateFormat = function (date: Date, type: string = 'daytime') {
  if (!date) return '';
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  const seconds = '0' + date.getSeconds();
  if (type === 'daytime') {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  } else {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  }
};
