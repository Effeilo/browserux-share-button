# Getting started

`browserux-share-button` works in any HTML page or JavaScript project. Choose the installation method that fits your setup.

---

## Requirements

| Environment | Minimum version |
|---|---|
| Node.js | 18+ (for npm-based projects) |
| Browser | Any browser with Custom Elements support |

For browser compatibility details, see [Compatibility](../compatibility.md).

---

## Installation

### Via npm

```bash
npm install browserux-share-button
```

### Via CDN

No build step required. Add the script tag directly to your HTML:

```html
<script type="module" src="https://unpkg.com/browserux-share-button/dist/browserux-share-button.esm.js"></script>
```

---

## Basic usage

Once the script is loaded, place the component anywhere in your HTML:

```html
<browserux-share-button></browserux-share-button>
```

That's it. The component reads `document.title` and `location.href` automatically and renders the share button with a localized label based on the page's `lang` attribute.

---

## Usage in a bundler project

Import the package once in your entry file. The component registers itself globally on import:

```js
import 'browserux-share-button';
```

Then use it in any HTML template:

```html
<browserux-share-button></browserux-share-button>
```

---

## Providing share data

Override any part of the default metadata using HTML attributes:

```html
<browserux-share-button
  title="My article title"
  text="A short description of the article"
  url="https://example.com/article"
></browserux-share-button>
```

Any attribute not provided is resolved automatically from the page. See [Attributes](../reference/attributes.md) for the full resolution order.

---

## Disabling platforms

By default, all built-in platforms appear in the fallback modal. Disable any of them by setting its attribute to `"false"`:

```html
<browserux-share-button
  facebook="false"
  sms="false"
></browserux-share-button>
```

Supported platform attribute names: `email`, `x`, `facebook`, `whatsapp`, `sms`, `linkedin`, `telegram`, `reddit`.

---

## Verifying the output

On a desktop browser that does not support the Web Share API, click the button. The fallback modal should appear with:

- A copy-to-clipboard button at the top showing the page icon, title, and URL
- Platform links below for all enabled sharing targets

On a mobile browser (iOS Safari, Android Chrome), click the button. The native share sheet should appear.

---

## SSR and hydration notes

Because `browserux-share-button` reads `location.href`, `document.title`, and `navigator.share` in the browser, it must not be server-rendered. In frameworks with SSR (Next.js, Nuxt, SvelteKit), import or register the component only on the client side.

For Next.js, use `'use client'` or dynamic import with `ssr: false`:

```jsx
'use client';
import 'browserux-share-button';
```

For Nuxt 3, use `<ClientOnly>` or guard with `process.client`.
