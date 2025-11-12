declare module "*.svg" {
  const content: string;
  export default content;
}

interface Window {
  __LOCAL_THEME__: string | undefined;
}
