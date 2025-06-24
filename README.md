**EN** | [FR](./fr/README.md)

<div>
  <img src="https://browserux.com/assets/img/logo/logo-browserux-share-button-250.png" alt="logo BrowserUX Share Button"/>
</div>

# BrowserUX Share Button

A modern and adaptable Web Component that streamlines content sharing across all devices and platforms. It prioritizes the native Web Share API when available, while providing a polished and universal fallback experience. Lightweight, multilingual, and framework-independent.

[![npm version](https://img.shields.io/npm/v/browserux-share-button.svg)](https://www.npmjs.com/package/browserux-share-button)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-brightgreen)](https://unpkg.com/browserux-share-button/dist/browserux-share-button.min.js)

## Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [Parameters](#parameters-of-browserux-theme-switcher)
- [Build & Development](#build--development)
- [License](#license)

## Features

### 🚀 Smart Sharing Behavior

- 🔗 **Native Web Share API Support**
  Uses the `navigator.share()` method when available, ideal for mobile and PWA contexts.

- 🧭 **Automatic Fallback**  
  Gracefully falls back to a modern, touch-friendly modal when native sharing isn't supported.

- 🎯 **Share Metadata Detection**  
  Automatically reads share `title`, `text`, and `url` from attributes, the HTML document, or the web manifest.

- 📧 **Multi-Platform Sharing**  
  Supports Email, SMS, X (Twitter), Facebook, WhatsApp, LinkedIn, Telegram, and Reddit.

- 🚫 **Per-Platform Disabling**  
  Disable any platform using attributes like `facebook="false"` or `sms="false"`.

### 🌍 Accessibility & Internationalization

- 🌐 **Multilingual Support(`lang`)**  
  Fully localized interface and ARIA labels, auto-detected or manually set via the `lang` attribute.

- 🦮 **Keyboard & ARIA Support**  
  Accessible modal with proper roles, focus trap, and keyboard navigation (Escape, Tab, Shift+Tab).

- 📢 **Assistive Feedback**  
  Custom messages on copy success/failure, sharing errors, or initialization issues.

### 🎨 Visual Customization

- 🖌 **CSS Variables for Styling**  
  Customize both button and modal via CSS custom properties (`--bux-share-btn-*`, `--bux-share-fallback-*`, etc.).

- 🪄 **Slot-Based Button Content**  
  Add your own icon and/or label inside the main button using `<slot name="icon">`.

- 📱 **Mobile Modal Animation**  
  Mobile-first fallback with slide-up motion and swipe-to-dismiss support.

### 🔧 Developer Experience

- 🧼 **Optional Shadow DOM (`no-shadow`)**  
  Renders in Shadow DOM by default; opt out to apply global styles more freely.

- 🧩 **Framework Agnostic**  
  Works with any frontend framework (React, Vue, Angular, etc.) or plain HTML.

- 📦 **Lightweight and Tree-shakable**  
  Zero dependencies. Only imports what you use, with TypeScript typings included.

- 🧪 **Typed and Modular**  
  Built in TypeScript with typed `SharePlatform` enums and exportable utilities (`getShareIcon`, `getBestIconUrl`).

## How It Works

The `<browserux-share-button>` Web Component provides a seamless sharing experience by leveraging the [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) when available, and falling back to a fully featured, accessible modal on unsupported platforms.

### 1. Auto-Detection of Sharing Capabilities

When the user clicks the button:

- If `navigator.share()` is supported (typically mobile or PWA), it opens the native share sheet.
- If not, it displays a custom modal fallback with share links and a copy-to-clipboard option.

### 2. Metadata Resolution

The component automatically determines what to share:

- Title: from the `title` attribute, `<title>` tag, or manifest.
- Text: from the `text` attribute, meta description, or manifest.
- URL: from the `url` attribute or `location.href`.

This behavior ensures zero setup for simple cases, just drop the component in your HTML.

### 3. Customizable Fallback Modal

When fallback is triggered, the modal:

- Lists only the enabled platforms (email, X, WhatsApp, etc.).
- Displays a preview box with the app’s icon, title, and link.
- Allows users to copy the link with visual feedback (`"Link copied!"`).
- Supports keyboard and touch navigation (Escape key, swipe-to-dismiss on mobile)

### 4. Language & Accessibility

- The component auto-detects the UI language via the `lang` attribute or `<html lang>`.
- All labels and ARIA messages are translated (10+ languages supported).
- Modal and button are fully accessible (ARIA roles, keyboard navigation, focus trapping).

## Installation

```bash
npm install browserux-share-button
```

Or via CDN:

```html
<script type="module" src="https://unpkg.com/browserux-share-button/dist/browserux-share-button.min.js"></script>
```

> Use the `.esm.js` build when integrating via a bundler (React, Vue, Angular, etc.), and the `.min.js` version when using directly in HTML via a `<script>` tag.

## Usage

### Modern project with bundler (Vite, Webpack, etc.)

1. Import the component globally in your main script:

```js
import 'browserux-share-button';
```

2. Then use it in your HTML:

```html
<browserux-share-button 
    url="https://example.com" 
    text="Check this out!"
></browserux-share-button>
```

### React / Next.js

1. Dynamically import the component inside a `useEffect`:

```js
import { useEffect } from 'react';

useEffect(() => {
  import('browserux-share-button');
}, []);
```

2. Then use it in JSX as a regular HTML tag:

```html
<browserux-share-button></browserux-share-button>
```

> For JSX type support, you can manually create a `browserux-share-button.d.ts` typing file if needed.

### Vue 3

1. Import it globally in your main.js or main.ts:

```js
import 'browserux-share-button';
```

2. Use it like a native HTML element:

```html
<browserux-share-button></browserux-share-button>
```

### Angular

1. Add the import to your `main.ts`:

```js
import 'browserux-share-button';
```

2. In `AppModule`, allow custom elements:

```js
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

### HTML only (No bundler)

1. Load the script directly from a CDN:

```html
<script type="module" src="https://unpkg.com/browserux-share-button/dist/browserux-share-button.min.js"></script>
```

2. Use the tag wherever you want:

```html
<browserux-share-button></browserux-share-button>
```

## Parameters of `<browserux-share-button>`

`<browserux-share-button>` supports various customization options and integration features:

| Parameter                | Type      | Name                   | Description                                                        |
|--------------------------|-----------|------------------------|--------------------------------------------------------------------|
| URL                     | Attribute | `url`                  | The URL to share (default: current `location.href`)                |
| Title                   | Attribute | `title`                | Title used in native and fallback share methods                    |
| Text                    | Attribute | `text`                 | Text snippet to accompany the shared link                          |
| Language                | Attribute | `lang`                 | Forces the component language (`en`, `fr`, etc.)                   |
| No Shadow DOM           | Attribute | `no-shadow`            | Renders component without Shadow DOM                               |
| Platform Disabling      | Attribute | `facebook="false"`    | Disables specific platform in fallback UI                          |
| Manifest Source         | Attribute | `manifest-src`         | Custom path to web app manifest for metadata fallback              |
| Custom Labels           | Data attr | `data-label-*`         | Override default labels (`data-label-copy`, etc.)                  |
| Share Button icon             | Slot      | `icon`         | Customize Share Button icon                                            |

### Custom Share URL (`url`)

By default, the `<browserux-share-button>` component shares the current page's URL (`location.href`).
However, you can override this behavior by explicitly setting a different URL using the `url` attribute.

#### Attribute: `url`

- Type: `string` (valid URL)
- Default value: `location.href`
- Effect: specifies the URL to be passed to the native Web Share API or fallback share links.

#### Example

```html
<browserux-share-button 
    url="https://example.com/page-to-share"
></browserux-share-button>
```

In this example, clicking the share button will share `https://example.com/page-to-share`, regardless of the actual page URL.
This is useful for:
- Sharing a specific canonical or shortened URL
- Promoting a landing page from multiple contexts
- Testing different links without changing the page's location

#### Tip

Make sure the URL is publicly accessible and starts with `https://` for best compatibility across social and native share services.

### Custom Share Title (`title`)

The title is used by some sharing platforms as a **subject** (e.g. email) or **headline** (e.g. Twitter/X or LinkedIn). 
By default, the component tries to extract the title from the current document or web app manifest.

#### Attribute: `title`

- Type: `string`
- Default value: from `<title>` tag or web manifest
- Effect: provides a human-readable headline or subject in share payloads

#### Example

```html
<browserux-share-button 
    title="Check out this amazing article!"
></browserux-share-button>
```

In this case, platforms like email will use this as the subject line, and X/Twitter will include it as part of the tweet text.

#### Fallback behavior

If no `title` is provided:
1. The component checks the current page's `<title>` tag
2. If unavailable, it attempts to read the `name` field from the app manifest (if found)
3. If all fail, the title is omitted

#### When to override
Provide a custom `title` if:
- The current page title is too generic
- You want to promote a specific message or product
- You’re sharing a page from within an app shell or embedded view

> Tip: Combine `title`, `text`, and `url` for best presentation across all platforms.

### Custom Share Text (`text`)

The `text` attribute provides a message or summary accompanying the shared URL. This content is commonly used in messaging apps, social platforms, and even email bodies.

#### Attribute: `text`

- Type: `string`
- Default: fetched from the web manifest (`description`) or left blank
- Effect: adds context to the share payload—especially useful when URLs alone aren't descriptive enough

#### Example

```html
<browserux-share-button 
    text="Here's a quick read I think you'll enjoy."
></browserux-share-button>
```

#### Use Cases

- Suggesting a reason to click or read the link
- Including promotional copy alongside the URL
- Describing the linked content more clearly

#### Fallback behavior

If no `text` is defined:

1. The component attempts to fetch the `description` field from the web manifest
2. If not available, it leaves the message portion empty in the share payload

> Tip: Keep it concise and relevant to maximize click-through across platforms.

### Custom Language (`lang`)

The `lang` attribute controls which language is used for all built-in labels, ARIA descriptions, and fallback UI content.

#### Attribute: `lang`

- Type: `string` (e.g., `"en"`, `"fr"`, `"es"`, `"de"`)
- Default: derived from the component, `<html lang>`, or fallback to `en`
- Effect: adjusts internationalized content inside the component

#### Example

```html
<browserux-share-button lang="fr"></browserux-share-button>
```

In this example, all labels such as "Copy link" or error messages will appear in French.

#### Language Detection Order

1. Explicit `lang` attribute on the component
2. Fallback to `<html lang>`
3. Fallback to `"en"` (English)

#### Supported Languages

- English (`en`)
- French (`fr`)
- Spanish (`es`)
- German (`de`)
- Japanese (`ja`)
- Russian (`ru`)
- Portuguese (`pt`)
- Italian (`it`)
- Dutch (`nl`)

> Tip: You can also override any label with `data-label-*` for custom copy regardless of language.

### Shadow DOM Toggle (`no-shadow`)

By default, the component uses Shadow DOM to encapsulate its styles and structure. You can disable this behavior by adding the `no-shadow` attribute.

#### Attribute: `no-shadow`

- Type: `boolean` (presence-only)
- Effect: renders component content in the light DOM (no encapsulation)

#### Example

```html
<browserux-share-button no-shadow></browserux-share-button>
```

#### When to Use

- You want to style the component via global CSS
- You use a framework that has limitations or bugs with Shadow DOM
- You prefer easier inspection/debugging in DevTools

> ⚠️ Disabling Shadow DOM makes the component more vulnerable to global style conflicts.

### Disabling Share Platforms (`facebook="false"`, etc.)

The `<browserux-share-button>` component includes a fallback UI that shows sharing options for multiple platforms. If you want to hide specific platforms (e.g., those irrelevant to your audience or use case), you can disable them using a simple boolean attribute.

#### Format

- Attribute name: matching the platform name
- Attribute value: `"false"` (as a string)

#### Supported Platforms

- `email`
- `sms`
- `x`
- `facebook` 
- `whatsapp` 
- `linkedin` 
- `telegram`
- `reddit`

#### Example

```html
<browserux-share-button facebook="false" sms="false"></browserux-share-button>
```

### Custom Manifest Source (`manifest-src`)

By default, if you do not explicitly provide the `title` or `text` attributes, `<browserux-share-button>` will try to load metadata from your web app's manifest file.

The component looks for:

- `name` → used as the share title
- `description` → used as the share text

This enables automatic integration with existing PWA metadata.

#### Attribute: `manifest-src`

- Type: `string` (valid URL path or absolute URL)
- Default: uses `<link rel="manifest">` from the current page
- Effect: overrides the manifest URL used to fetch metadata

#### Example

```html
<browserux-share-button 
  manifest-src="/custom-manifest.webmanifest"
></browserux-share-button>
```

#### When to use

- Your manifest file is not declared in the page header
- You want to load share metadata from a different file (e.g., per-page manifest)
- The default manifest path is incorrect or inaccessible

#### Fallback logic

If no `manifest-src` is defined:

1. The component looks for a `<link rel="manifest">` in the `<head>`
2. If found, it tries to fetch and parse it
3. If this fails, the component continues with defaults or empty values

> Tip: The manifest must be served with the correct MIME type (`application/manifest+json`) and must be accessible via CORS.html&#x20;

### Custom Labels (ARIA & UI)

You can override the component’s built-in labels (used for ARIA accessibility or fallback UI) using `data-label-*` attributes. This is particularly helpful for localization, branding tone, or changing default behavior messages.

#### Format

- Attribute name: `data-label-*`
- Value: custom string (visible to screen readers or in the UI)

#### Available Attributes

| Attribute                | Purpose                                         |
| ------------------------ | ----------------------------------------------- |
| `data-label-copy`        | Text shown on the "Copy link" button            |
| `data-label-copied`      | Message shown briefly after copying success     |
| `data-label-error-copy`  | Error shown when clipboard copy fails           |
| `data-label-error-init`  | Warning shown if manifest or init fails         |
| `data-label-error-share` | Message when `navigator.share()` throws an error |

#### Example

```html
<browserux-share-button
  data-label-copy="Copier le lien"
  data-label-copied="Lien copié !"
  data-label-error-copy="Erreur lors de la copie"
  data-label-error-init="Erreur lors de l'initialisation"
  data-label-error-share="Échec du partage natif"
></browserux-share-button>
```

#### When to Use

- To provide localized labels outside the default `lang` system
- To customize tone or phrasing for your brand
- To replace fallback text with emojis or icons (e.g., ✅ Copied!)

> Tip: These labels override those provided by `lang`, so they are useful for hybrid or multilingual apps.

## Build & Development

```bash
npm install
npm run build
```

The project uses TypeScript and Rollup to generate build outputs:
- `dist/browserux-share-button.esm.js`
- `dist/browserux-share-button.umd.js`
- `dist/browserux-share-button.d.ts`
- `dist/browserux-share-button.min.js`

> These builds are ready to be used in both module-based environments and traditional script loading contexts.

### Class architecture

```ts
class ShareButton extends HTMLElement
│
├── 🔐 Private properties
│   ├── shareTitle: string
│   ├── shareText: string
│   ├── shareUrl: string
│   ├── root: ShadowRoot | HTMLElement
│   ├── labels: typeof I18N_LABELS[string]
│   ├── externalFallbackEl?: HTMLDivElement
│   └── focusTrapRemover?: () => void
│
├── 🛠️ Configuration & Utilities
│   ├── private isDisabled(platform: SharePlatform): boolean
│   └── private getShareConfig(platform: SharePlatform): { href: string; label: string; icon: string } | null
│
├── 🌐 Localization & Initialization
│   └── private onKeyDown = (e: KeyboardEvent): void
│
├── 🖼️ Main Button Rendering
│   └── private render(): void
│
├── 📱 Fallback Rendering (Modal)
│   ├── private renderExternalFallback(): void
│   ├── private renderPlatformLinks(container: HTMLElement): void
│   ├── private renderCopyButton(container: HTMLElement, initialCopyHtml: string): void
│   ├── private bindFallbackEvents(container: HTMLElement): void
│   └── private showFallback(): void
│
└── 🔄 Lifecycle
    └── async connectedCallback(): Promise<void>
```

## License

MIT License, Free to use, modify, and distribute.