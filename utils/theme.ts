import IconLight from '../svgs/sun.svg';
import IconDark from '../svgs/moon.svg';
import IconSystem from '../svgs/system.svg';

const THEME_LIGHT = 'LIGHT';

const THEME_DARK = 'DARK';

export const THEME_SYSTEM = 'SYSTEM';

export enum THEME {
  LIGHT = THEME_LIGHT,
  DARK = THEME_DARK,
  SYSTEM = THEME_SYSTEM,
}

export const THEME_LIST: Array<{ key: THEME; icon: string }> = [{
  key: THEME.LIGHT, icon: IconLight,
}, {
  key: THEME.DARK, icon: IconDark,
}, {
  key: THEME.SYSTEM, icon: IconSystem,
}];



const theme =  {
  body: { [THEME.LIGHT]: '#fff', [THEME.DARK]: 'rgb(26, 32, 44)' },
};

export default theme;