declare module "*.svg" {
  const content: any;
  export default content;
}

type LocalTheme = string;

interface Window {
  __LOCAL_THEME__: LocalTheme;
}
