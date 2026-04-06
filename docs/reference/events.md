# Events

`browserux-share-button` dispatches custom events for every significant action. All events bubble and are composed (they cross Shadow DOM boundaries).

---

## Event overview

| Event | When | Detail |
|---|---|---|
| `bux:share-success` | Native share completed | `{ title, text, url }` |
| `bux:share-abort` | User cancelled the native share dialog | none |
| `bux:share-error` | Unexpected native share failure | `{ error }` |
| `bux:fallback-open` | Fallback modal opened | none |
| `bux:fallback-close` | Fallback modal closed | none |
| `bux:copy-success` | URL copied to clipboard | `{ url }` |
| `bux:copy-error` | Clipboard write failed | `{ error }` |

All events have `bubbles: true` and `composed: true`. You can listen on the element itself or at the `document` level.

---

## `bux:share-success`

Fired when `navigator.share()` completes without error.

```ts
interface ShareSuccessDetail {
  title: string;
  text: string;
  url: string;
}
```

```js
el.addEventListener('bux:share-success', (e) => {
  console.log('Shared successfully:', e.detail.url);
});
```

---

## `bux:share-abort`

Fired when the user dismisses the native share dialog without completing the share. This corresponds to `navigator.share()` rejecting with an `AbortError`.

No detail payload. The fallback modal does **not** open in this case.

```js
el.addEventListener('bux:share-abort', () => {
  console.log('User cancelled the share');
});
```

---

## `bux:share-error`

Fired when `navigator.share()` rejects with an unexpected error (not an `AbortError`). The fallback modal opens automatically after this event.

```ts
interface ShareErrorDetail {
  error: unknown;
}
```

```js
el.addEventListener('bux:share-error', (e) => {
  console.error('Share failed:', e.detail.error);
});
```

---

## `bux:fallback-open`

Fired when the fallback modal becomes visible. Useful for analytics or pausing background interactions.

```js
el.addEventListener('bux:fallback-open', () => {
  console.log('Fallback modal opened');
});
```

---

## `bux:fallback-close`

Fired when the fallback modal is dismissed, via the Escape key, backdrop click, swipe down, or `closeFallback()`.

```js
el.addEventListener('bux:fallback-close', () => {
  console.log('Fallback modal closed');
});
```

---

## `bux:copy-success`

Fired when the URL is successfully written to the clipboard via the copy button in the fallback modal.

```ts
interface CopySuccessDetail {
  url: string;
}
```

```js
el.addEventListener('bux:copy-success', (e) => {
  console.log('Link copied:', e.detail.url);
});
```

---

## `bux:copy-error`

Fired when the clipboard write fails (e.g. the user denied clipboard permission).

```ts
interface CopyErrorDetail {
  error: unknown;
}
```

```js
el.addEventListener('bux:copy-error', (e) => {
  console.error('Copy failed:', e.detail.error);
});
```

---

## Listening at the document level

Because all events bubble, you can listen on the document for a global handler:

```js
document.addEventListener('bux:share-success', (e) => {
  analytics.track('share', { url: e.detail.url });
});

document.addEventListener('bux:copy-success', (e) => {
  analytics.track('copy_link', { url: e.detail.url });
});
```

---

## Use cases

### Analytics tracking

```js
const el = document.querySelector('browserux-share-button');

el.addEventListener('bux:share-success', (e) => {
  analytics.track('native_share', e.detail);
});

el.addEventListener('bux:copy-success', (e) => {
  analytics.track('copy_link', { url: e.detail.url });
});

el.addEventListener('bux:share-abort', () => {
  analytics.track('share_cancelled');
});
```

### Showing a toast notification

```js
el.addEventListener('bux:copy-success', () => {
  showToast('Link copied to clipboard!');
});
```

### Disabling page interactions while modal is open

```js
el.addEventListener('bux:fallback-open', () => {
  document.body.style.overflow = 'hidden';
});

el.addEventListener('bux:fallback-close', () => {
  document.body.style.overflow = '';
});
```
