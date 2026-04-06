**EN** | [FR](./fr/README.md)

<div>
  <img src="https://browserux.com/img/logos/logo-browserux-share-button-300.png" alt="logo BrowserUX Share Button"/>
</div>

# BrowserUX Share Button

**A modern solution to enable seamless content sharing across all devices and platforms.**

BrowserUX Share Button is a lightweight, accessible, and customizable Web Component that simplifies sharing URLs via the native Web Share API, when available, or a responsive fallback modal. It supports multiple platforms (Email, X, WhatsApp, etc.), automatically retrieves share metadata, and offers full localization, visual customization, and framework compatibility.

- [Project website](https://browserux.com/share-button/)
- [Demo](https://browserux.com/share-button/demo/)
- [Documentation](./docs/index.md)
- [Changelog](./CHANGELOG.md)

<br>

[![npm version](https://img.shields.io/npm/v/browserux-share-button.svg)](https://www.npmjs.com/package/browserux-share-button)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-brightgreen)](https://unpkg.com/browserux-share-button/dist/browserux-share-button.min.js)

## Features

- 📱 Uses the native Web Share API when available (mobile, PWA)
- 🗂 Falls back to a rich modal with platform links on desktop
- 🔗 Copy-to-clipboard button with app icon, title, and URL preview
- 🌐 8 built-in platforms: Email, X, Facebook, WhatsApp, SMS, LinkedIn, Telegram, Reddit
- 🔌 Custom platform registry via `ShareButton.registerPlatform()`
- 🧠 Auto-resolves share data from `document.title`, `<meta>`, and Web App Manifest
- 🌍 Built-in i18n for 12 languages, auto-detected from `<html lang>`
- ♿ Accessible: keyboard navigation, focus trapping, focus restoration
- 📡 7 custom events: `bux:share-success`, `bux:share-abort`, `bux:copy-success`, and more
- 🖱 Programmatic API: `share()`, `setShareData()`, `openFallback()`, `closeFallback()`
- 🎨 Fully customizable via CSS custom properties
- 🧩 Optional Shadow DOM, disable with `no-shadow`

## Installation

```bash
npm install browserux-share-button
```

Or via CDN:

```html
<script type="module" src="https://unpkg.com/browserux-share-button/dist/browserux-share-button.esm.js"></script>
```

## Usage

```js
import 'browserux-share-button';
```

```html
<browserux-share-button></browserux-share-button>
```

With explicit share data and platform control:

```html
<browserux-share-button
  title="My article"
  text="A short description"
  url="https://example.com/article"
  lang="en"
  facebook="false"
  sms="false"
></browserux-share-button>
```

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `url` | Attribute | URL to share (default: `location.href`) |
| `title` | Attribute | Share title (default: `document.title`) |
| `text` | Attribute | Share description (default: `<meta description>`) |
| `lang` | Attribute | Language code for built-in labels |
| `manifest-src` | Attribute | Custom path to Web App Manifest |
| `no-shadow` | Attribute | Disable Shadow DOM encapsulation |
| `[platform]="false"` | Attribute | Disable a platform: `email`, `x`, `facebook`, `whatsapp`, `sms`, `linkedin`, `telegram`, `reddit` |
| `icon` | Slot | Custom icon inside the share button (default: 🔗) |
| `bux:share-success` | Event | Native share completed, `e.detail: { title, text, url }` |
| `bux:share-abort` | Event | User cancelled the native share dialog |
| `bux:share-error` | Event | Share failed, `e.detail: { error }` |
| `bux:fallback-open` | Event | Fallback modal opened |
| `bux:fallback-close` | Event | Fallback modal closed |
| `bux:copy-success` | Event | Link copied, `e.detail: { url }` |
| `bux:copy-error` | Event | Clipboard write failed, `e.detail: { error }` |
| `share()` | Method | Trigger share programmatically |
| `setShareData(data)` | Method | Update share data at runtime |
| `openFallback()` | Method | Open the fallback modal programmatically |
| `closeFallback()` | Method | Close the fallback modal programmatically |

## Documentation

For detailed documentation, see [docs/index.md](docs/index.md).

### Guide

- [Introduction](docs/guide/introduction.md) : what it is, the two-path approach, metadata resolution
- [Getting started](docs/guide/getting-started.md) : installation via npm or CDN, basic usage
- [How it works](docs/guide/how-it-works.md) : lifecycle, Web Share API, fallback modal, accessibility
- [Framework usage](docs/guide/framework-usage.md) : React, Vue, Angular, vanilla JS
- [Customization](docs/guide/customization.md) : CSS custom properties for button and modal

### Reference

- [Attributes](docs/reference/attributes.md) : `url`, `title`, `text`, `lang`, `no-shadow`, platform disabling
- [Events](docs/reference/events.md) : all `bux:*` events with payloads and use cases
- [Slots](docs/reference/slots.md) : `icon` slot for custom button icon
- [Programmatic API](docs/reference/api.md) : `share()`, `setShareData()`, `openFallback()`, `closeFallback()`
- [Platforms](docs/reference/platforms.md) : built-in platforms and custom platform registry
- [Utilities](docs/reference/utils.md) : `getShareIcon`, `getBestIconUrl`

### Additional reference

- [Compatibility](docs/compatibility.md) : browser support, framework compatibility, build formats
- [Contributing](docs/contributing.md) : report a bug, suggest an improvement, submit a PR

## License

MIT © 2026 [Effeilo](https://github.com/Effeilo)
