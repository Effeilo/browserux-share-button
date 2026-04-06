# Attributes

All configuration is done through HTML attributes set on `<browserux-share-button>`. No JavaScript is required for standard usage.

```html
<browserux-share-button
  url="https://example.com/article"
  title="My article"
  text="A short description"
  lang="en"
  manifest-src="/manifest.webmanifest"
  facebook="false"
  sms="false"
  no-shadow
></browserux-share-button>
```

---

## Quick reference

| Attribute | Type | Default | Description |
|---|---|---|---|
| `url` | `string` | `location.href` | URL to share |
| `title` | `string` | `document.title` | Share title |
| `text` | `string` | `<meta description>` | Share description |
| `lang` | `string` | `<html lang>` or `'en'` | Language for labels |
| `manifest-src` | `string` | `<link rel="manifest">` | Custom manifest path |
| `no-shadow` | boolean | absent | Disable Shadow DOM |
| `email` | `"false"` | enabled | Disable email platform |
| `x` | `"false"` | enabled | Disable X (Twitter) platform |
| `facebook` | `"false"` | enabled | Disable Facebook platform |
| `whatsapp` | `"false"` | enabled | Disable WhatsApp platform |
| `sms` | `"false"` | mobile only | Disable SMS platform |
| `linkedin` | `"false"` | enabled | Disable LinkedIn platform |
| `telegram` | `"false"` | enabled | Disable Telegram platform |
| `reddit` | `"false"` | enabled | Disable Reddit platform |

---

## `url`

**Type:** `string` - **Default:** `location.href`

The URL to be shared. If not provided, the current page URL is used.

```html
<browserux-share-button url="https://example.com/article/123"></browserux-share-button>
```

Can also be updated at runtime via the programmatic API:

```js
el.setShareData({ url: 'https://example.com/new-page' });
```

---

## `title`

**Type:** `string` - **Default:** `document.title` → manifest `name` → `"Untitled"`

The title passed to `navigator.share()` and used as the heading in the copy-to-clipboard section of the fallback modal.

```html
<browserux-share-button title="Read my article on CSS Grid"></browserux-share-button>
```

If not set, the component tries `document.title`, then the `name` field from the Web App Manifest. If all fail, it defaults to `"Untitled"`.

---

## `text`

**Type:** `string` - **Default:** `<meta name="description">` → manifest `description` → `""`

The description passed to `navigator.share()`. Used in the SMS, WhatsApp, Telegram, and X share URLs.

```html
<browserux-share-button text="An in-depth guide to CSS Grid layout"></browserux-share-button>
```

If not set, the component reads `<meta name="description">`, then the `description` field from the manifest.

---

## `lang`

**Type:** `string` - **Default:** `document.documentElement.lang` or `'en'`

Sets the language used for all built-in labels: the button text, the modal heading, the copy confirmation message, and error messages.

```html
<browserux-share-button lang="fr"></browserux-share-button>
```

Supported language codes:

| Code | Language |
|---|---|
| `en` | English (default) |
| `fr` | French |
| `es` | Spanish |
| `de` | German |
| `ja` | Japanese |
| `ru` | Russian |
| `pt` | Portuguese |
| `it` | Italian |
| `nl` | Dutch |
| `zh` | Chinese |
| `ko` | Korean |
| `ar` | Arabic |

If an unsupported code is provided, the component falls back to English.

---

## `manifest-src`

**Type:** `string` - **Default:** resolved from `<link rel="manifest">`

Specifies a custom path to the Web App Manifest. Used when the manifest is not linked via a standard `<link rel="manifest">` tag, or when you want a different manifest than the one in the document head.

```html
<browserux-share-button manifest-src="/my-custom-manifest.json"></browserux-share-button>
```

The manifest is fetched during `connectedCallback`. If the fetch fails, the component falls back to `document.title` and `<meta name="description">`.

---

## `no-shadow`

**Type:** boolean (presence/absence) - **Default:** absent (Shadow DOM is used)

When present, disables Shadow DOM encapsulation. The component template is injected into the element's light DOM.

```html
<browserux-share-button no-shadow></browserux-share-button>
```

The fallback modal is always appended to `<body>` regardless of this attribute.

> This attribute is read once in `connectedCallback`. Changing it after connection has no effect.

---

## Platform disabling

Each built-in platform can be individually disabled by setting its corresponding attribute to `"false"`.

```html
<!-- Disable individual platforms -->
<browserux-share-button
  facebook="false"
  reddit="false"
  sms="false"
></browserux-share-button>
```

Platform attributes and their fallback modal targets:

| Attribute | Platform | Notes |
|---|---|---|
| `email="false"` | Email | Disabled in all contexts |
| `x="false"` | X (Twitter) | Disabled in all contexts |
| `facebook="false"` | Facebook | Disabled in all contexts |
| `whatsapp="false"` | WhatsApp | Disabled in all contexts |
| `sms="false"` | SMS / Messages | Only shown on mobile by default |
| `linkedin="false"` | LinkedIn | Disabled in all contexts |
| `telegram="false"` | Telegram | Disabled in all contexts |
| `reddit="false"` | Reddit | Disabled in all contexts |

Custom platforms registered via `ShareButton.registerPlatform()` can also be disabled using the same `key="false"` convention. See [Platforms](platforms.md).
