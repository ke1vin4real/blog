declare module "*.svg" {
  const content: React.ReactNode;
  export default content;
}

interface Window {
  __LOCAL_THEME__: string | undefined;
}
