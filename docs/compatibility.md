# Compatibility

---

## Runtime requirements

| Environment | Minimum version | Reason |
|---|---|---|
| Node.js | 18+ | Required for npm-based projects |
| Browser | See table below | Custom Elements v1, Shadow DOM, Clipboard API |

---

## Browser support

`browserux-share-button` uses standard Web Component APIs (Custom Elements v1, Shadow DOM v1) and optional browser APIs (Web Share API, Clipboard API) with built-in fallbacks.

| Feature | Chrome | Firefox | Safari | Edge |
|---|---|---|---|---|
| Custom Elements v1 | 67+ | 63+ | 10.1+ | 79+ |
| Shadow DOM v1 | 53+ | 63+ | 10+ | 79+ |
| Web Share API | 89+ (desktop 120+) | Not supported | 12.1+ | 93+ |
| Clipboard API | 66+ | 63+ | 13.1+ | 79+ |
| `prefers-color-scheme` | 76+ | 67+ | 12.1+ | 79+ |

### Web Share API notes

- The Web Share API is most widely supported on **mobile browsers** (iOS Safari, Android Chrome).
- On **desktop**, support varies: Chrome 120+ supports it on Windows/macOS, but Firefox does not support it at all.
- When the API is not available, the component falls back to the modal automatically, no configuration needed.

### Clipboard API notes

- The Clipboard API (`navigator.clipboard.writeText`) requires a secure context (HTTPS or `localhost`).
- On browsers without Clipboard API support, the copy button in the fallback modal will dispatch `bux:copy-error`.

---

## Framework compatibility

| Framework | Status | Notes |
|---|---|---|
| Vanilla HTML | Supported | Direct `<script type="module">` or CDN |
| React 17+ | Supported | Import in client components only |
| Next.js 13+ | Supported | Use `'use client'` or dynamic import with `ssr: false` |
| Vue 3 | Supported | Add to `isCustomElement` in Vite config to silence warnings |
| Nuxt 3 | Supported | Use `<ClientOnly>` or guard with `process.client` |
| Angular 14+ | Supported | Add `CUSTOM_ELEMENTS_SCHEMA` to your module |
| Svelte | Supported | Import the package in your component script |
| SvelteKit | Supported | Import only in client context |

See [Framework usage](guide/framework-usage.md) for implementation details.

---

## Build output formats

The package ships three pre-built bundles:

| File | Format | Use case |
|---|---|---|
| `browserux-share-button.esm.js` | ES Module | Bundler projects (Vite, Webpack, Rollup) |
| `browserux-share-button.umd.js` | UMD | Legacy script tags, CommonJS environments |
| `browserux-share-button.min.js` | Minified UMD | CDN usage, production without bundler |
| `browserux-share-button.d.ts` | TypeScript | Type-checked projects |

The ESM bundle is the default export (`"module"` field in `package.json`).

---

## Dependencies

`browserux-share-button` has no runtime dependencies. The package is a self-contained Web Component compiled from TypeScript using Rollup.

Build-time dependencies:

| Package | Role |
|---|---|
| [rollup](https://rollupjs.org/) | Module bundler |
| [typescript](https://www.typescriptlang.org/) | TypeScript compiler |
| [@rollup/plugin-typescript](https://github.com/rollup/plugins) | Rollup TypeScript plugin |
| [@rollup/plugin-node-resolve](https://github.com/rollup/plugins) | Node module resolution |
| [@rollup/plugin-terser](https://github.com/rollup/plugins) | Minification |
| [rollup-plugin-dts](https://github.com/Swatinem/rollup-plugin-dts) | TypeScript declaration bundling |
| [vitest](https://vitest.dev/) | Unit testing framework |
| [happy-dom](https://github.com/capricorn86/happy-dom) | DOM environment for tests |
