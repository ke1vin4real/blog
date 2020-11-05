import { THEME_DARK, THEME_LIGHT } from "./constant";

type Props = {
  [key: string]: {
    [key: string]: string
  },
};

const theme: Props =  {
  body: { [THEME_LIGHT]: '#fff', [THEME_DARK]: 'rgb(26, 32, 44)' },
};

export default theme;