// rehype-github-alerts only provides named exports (no default export).
// The @next/mdx loader resolves plugins via `interopDefault(mod)`, which returns
// `mod.default || mod`. Without a default export, it receives the entire module
// namespace object and passes it to unified as a preset — causing the
// "Expected usable value but received an empty preset" error.
//
// This wrapper re-exports the named export as a default so the loader can
// correctly identify and invoke the plugin.
export { rehypeGithubAlerts as default } from 'rehype-github-alerts';
