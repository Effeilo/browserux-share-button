**EN** | [FR](./fr/CHANGELOG.md)

<div>
  <img src="https://browserux.com/img/logos/logo-browserux-share-button-300.png" alt="logo BrowserUX Share Button"/>
</div>

# 📦 Changelog

All notable changes to this project will be documented in this file.

This changelog format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
and this project adheres to [Semantic Versioning](https://semver.org/).

---

<br>

## [1.1.0] – 2026-03-28

### ✨ Added

- 🌍 Added 3 new built-in languages: Chinese (`zh`), Korean (`ko`), Arabic (`ar`) — now 12 languages total
- 📡 Custom event system: the component now dispatches the following `CustomEvent`s (bubbling, Shadow DOM-aware):
  - `bux:share-success` — native share completed, detail: `{ title, text, url }`
  - `bux:share-abort` — user cancelled the native share dialog
  - `bux:share-error` — unexpected native share failure, detail: `{ error }`
  - `bux:fallback-open` — fallback modal opened
  - `bux:fallback-close` — fallback modal closed
  - `bux:copy-success` — link copied to clipboard, detail: `{ url }`
  - `bux:copy-error` — clipboard write failed, detail: `{ error }`
- 🖱 **Programmatic API** — new public methods:
  - `share()` — triggers the share flow programmatically
  - `setShareData({ title?, text?, url? })` — updates share data at runtime
  - `openFallback()` — opens the fallback modal programmatically
  - `closeFallback()` — closes the fallback modal programmatically
- 🔌 **Custom platform registry** — `ShareButton.registerPlatform(key, config)` static method to add third-party share targets (e.g. Mastodon, Bluesky) that appear in the fallback modal and respect the disable attribute convention
- 🧪 **Test suite** — 33 unit tests with [Vitest](https://vitest.dev/) + [happy-dom](https://github.com/capricorn86/happy-dom), covering language detection, share data, custom events, public API, platform registry, mobile detection, and focus restoration

### 🛠 Fixed

- 📱 Mobile detection now uses `window.matchMedia('(pointer: coarse)')` instead of User-Agent sniffing — more reliable across modern browsers and unusual UA strings
- ♿️ Focus is now properly restored to the triggering element when the fallback modal closes (via Escape key, backdrop click, swipe, or `closeFallback()`)
- 🔁 Fallback close logic centralized in a single `hideFallback()` method — eliminates duplicated teardown code across event handlers

### 📦 New types exported

- `CustomPlatformConfig` — interface for custom platform registration
- `ShareData` — interface for share payload (`title`, `text`, `url`)

<br>

---

<br>

## [1.0.3] – 2025-06-29

### 🛠 Fixed

- 📱 Prevented fallback modal from appearing after user cancels native sharing (e.g. on mobile)
- 🚫 Improved error handling by ignoring user-initiated `AbortError` and `cancel`-related exceptions from `navigator.share()`

<br>

---

<br>

## [1.0.2] – 2025-06-28

### 🛠 Fixed

- 🧩 Introduced internal `applyInlineCSSVars()` method to map `style` attribute custom properties into the component's Shadow DOM

<br>

---

<br>

## [1.0.1] – 2025-06-27

### 🛠 Fixed

- 🐛 Fixed inability to override CSS variables from the `style` attribute due to Shadow DOM encapsulation
- ✅ Now supports inline styles via `style="--bux-share-btn-bg: red"` thanks to injected `:host { ... }` rule during `connectedCallback`

<br>

---

<br>

## [1.0.0] – 2025-06-23

### ✨ Added

- 💡 Web Component `<browserux-share-button>` to trigger native share or fallback
- ✨ Supports native navigator.share() API when available
- ❓ Automatic fallback with platform links: Email, SMS, Facebook, WhatsApp, X, etc.
- 🌍 Multilingual support (lang detection + 9 built-in languages)
- ♿️ Accessible and keyboard-navigable fallback UI
- 🎨 Styleable via CSS and no-shadow mode
- 🔹 Attributes for custom share content (title, text, url)
- 🏑 Dynamic fallback populated from web manifest
- 🔧 Written in TypeScript, outputs in ESM, UMD + types
- 🗃 Fully compatible with all frameworks (React, Vue, Angular) or vanilla HTML

<br>

---