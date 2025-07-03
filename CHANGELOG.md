**EN** | [FR](./fr/CHANGELOG.md)

<div>
  <img src="https://browserux.com/assets/img/logo/logo-browserux-share-button-250.png" alt="logo BrowserUX Share Button"/>
</div>

# 📦 Changelog

All notable changes to this project will be documented in this file.

This changelog format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
and this project adheres to [Semantic Versioning](https://semver.org/).

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