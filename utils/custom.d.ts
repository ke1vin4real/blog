declare module "*.svg" {
  const content: any;
  export default content;
}

interface Window {
  __LOCAL_THEME__: string | undefined;
}
