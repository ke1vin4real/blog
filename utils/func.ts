import { THEME } from './theme';

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
/***
 * @description
 * @param {string} name
 * @param {string} value
 * @param {number} expireDays
 * @returns {string}
 * @constructor
 */
export const setCookie = function(name: string, value: string, expireDays: number = 30) {
  const date = new Date();
  date.setTime(date.getTime()+(expireDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
};
/***
 * @description
 * @param {string} name
 * @param {string} allCookies
 * @returns {string}
 * @constructor
 */
export const getCookie = function(name: string, allCookies: string) {
  if (!name) {
    return null;
  }
  
  const _name =`${name}=`;
  
  const cookies = allCookies.split(';');
  
  for(let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    
    if (cookie.indexOf(_name) === 0) {
      return cookie.substring(_name.length, cookie.length);
    }
  }
  
  return '';
};

export const detectSystemTheme = function (fallback?: Function) {
  const isSystemDark = window?.matchMedia('(prefers-color-scheme: dark)')?.matches;
  const isSystemLight = window?.matchMedia('(prefers-color-scheme: light)')?.matches;

  if (!isSystemDark && !isSystemLight) {
    fallback && fallback();
  } else if (isSystemDark) {
    return THEME.DARK;
  } else if (isSystemLight) {
    return THEME.LIGHT;
  }

  return null;
};