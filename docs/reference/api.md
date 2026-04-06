# Programmatic API

`browserux-share-button` exposes public instance methods for triggering the share flow and controlling the fallback modal from JavaScript. These are in addition to the attribute-based configuration.

---

## Instance methods

### `share()`

**Returns:** `Promise<void>`

Programmatically triggers the share flow, exactly as if the user clicked the button. Uses the native Web Share API when available, falls back to the modal otherwise.

```js
const el = document.querySelector('browserux-share-button');
await el.share();
```

All events (`bux:share-success`, `bux:share-abort`, `bux:share-error`, `bux:fallback-open`) are dispatched normally.

---

### `setShareData(data)`

**Parameters:** `data: Partial<{ title: string; text: string; url: string }>`  
**Returns:** `void`

Updates the share data used by the component at runtime. Only the fields you provide are overwritten. The next call to `share()` or a user click will use the updated values.

```js
const el = document.querySelector('browserux-share-button');

el.setShareData({
  title: 'New article title',
  url: 'https://example.com/new-article',
});
```

```js
// Partial update, only url changes
el.setShareData({ url: 'https://example.com/page-2' });
```

**Use case:** Single-page applications where the current page changes without a full reload.

```js
router.afterEach((to) => {
  const el = document.querySelector('browserux-share-button');
  el?.setShareData({
    title: to.meta.title,
    url: window.location.href,
  });
});
```

---

### `openFallback()`

**Returns:** `void`

Programmatically opens the fallback share modal. Useful for triggering it from a different UI element, such as a keyboard shortcut or another button.

```js
document.querySelector('browserux-share-button').openFallback();
```

The `bux:fallback-open` event is dispatched. Focus management (trap + restoration) works the same as when the modal is triggered by a click.

---

### `closeFallback()`

**Returns:** `void`

Programmatically closes the fallback share modal. Safe to call even if the modal is not currently open.

```js
document.querySelector('browserux-share-button').closeFallback();
```

The `bux:fallback-close` event is dispatched and focus is restored to the share button.

---

## Static methods

### `ShareButton.registerPlatform(key, config)`

**Parameters:**
- `key: string`, unique identifier for the platform (used as the attribute name to disable it)
- `config: CustomPlatformConfig`, label, icon URL, and href builder

**Returns:** `void`

Registers a custom sharing platform that will appear in the fallback modal of **every** `<browserux-share-button>` instance on the page. The registration is shared across all instances via a static `Map`.

```ts
interface CustomPlatformConfig {
  label: string;
  icon: string;   // URL to a 48×48 image
  getHref: (title: string, text: string, url: string) => string;
}
```

```js
import { ShareButton } from 'browserux-share-button';

ShareButton.registerPlatform('mastodon', {
  label: 'Mastodon',
  icon: 'https://example.com/icons/mastodon.png',
  getHref: (title, text, url) =>
    `https://mastodon.social/share?text=${encodeURIComponent(text + ' ' + url)}`,
});
```

```js
ShareButton.registerPlatform('bluesky', {
  label: 'Bluesky',
  icon: 'https://example.com/icons/bluesky.png',
  getHref: (title, text, url) =>
    `https://bsky.app/intent/compose?text=${encodeURIComponent(text + ' ' + url)}`,
});
```

### Disabling a custom platform

Custom platforms respect the same disable-via-attribute convention as built-in platforms. Use the platform `key` as the attribute name:

```html
<browserux-share-button mastodon="false"></browserux-share-button>
```

### Registration timing

Call `registerPlatform()` before any `<browserux-share-button>` element connects to the DOM, ideally in your application's entry file. If called after connection, the platform will appear in future fallback modal opens (the modal is rendered lazily on first use).

```js
// Entry point, before any component renders
import { ShareButton } from 'browserux-share-button';

ShareButton.registerPlatform('mastodon', { /* ... */ });
```

---

## TypeScript types

The following types are exported from the package:

```ts
import type { ShareData, CustomPlatformConfig, SharePlatform, LangKeys } from 'browserux-share-button';
```

| Type | Description |
|---|---|
| `ShareData` | `{ title: string; text: string; url: string }` |
| `CustomPlatformConfig` | Config object for `registerPlatform()` |
| `SharePlatform` | Union of built-in platform keys |
| `LangKeys` | Union of supported language codes |
