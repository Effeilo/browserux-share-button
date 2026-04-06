# Platforms

`browserux-share-button` includes 8 built-in sharing platforms that appear in the fallback modal. Each can be individually disabled. You can also register additional custom platforms via the static API.

---

## Built-in platforms

| Platform | Attribute | Share URL format | Notes |
|---|---|---|---|
| Email | `email` | `mailto:?subject=...&body=...` | Uses title as subject, text + url as body |
| X (Twitter) | `x` | `https://x.com/intent/tweet?text=...` | Uses text + url |
| Facebook | `facebook` | `https://www.facebook.com/sharer/sharer.php?u=...` | URL only |
| WhatsApp | `whatsapp` | `https://api.whatsapp.com/send?text=...` | Uses text + url |
| SMS | `sms` | `sms:?body=...` | Mobile only, hidden on desktop |
| LinkedIn | `linkedin` | `https://www.linkedin.com/sharing/share-offsite/?url=...` | URL only |
| Telegram | `telegram` | `https://t.me/share/url?url=...&text=...` | Uses url + text |
| Reddit | `reddit` | `https://www.reddit.com/submit?url=...&title=...` | Uses url + title |

All platform links open in a new tab (`target="_blank"`).

---

## Disabling built-in platforms

Set any platform attribute to `"false"` to remove it from the fallback modal:

```html
<browserux-share-button
  facebook="false"
  reddit="false"
></browserux-share-button>
```

Multiple platforms can be disabled in the same tag. The order of remaining platforms in the modal follows the built-in order: email → x → facebook → whatsapp → sms → linkedin → telegram → reddit.

---

## SMS visibility

The SMS platform is special: it is hidden on desktop devices (where `window.matchMedia('(pointer: coarse)')` returns `false`) even if not explicitly disabled. On touch devices (mobile, tablet), it appears normally.

To hide SMS on all devices:

```html
<browserux-share-button sms="false"></browserux-share-button>
```

---

## Custom platform registry

Additional sharing platforms can be registered globally using `ShareButton.registerPlatform()`. Registered platforms appear in the fallback modal of every `<browserux-share-button>` instance on the page.

### Registering a platform

```js
import { ShareButton } from 'browserux-share-button';

ShareButton.registerPlatform('mastodon', {
  label: 'Mastodon',
  icon: 'https://example.com/icons/mastodon.png',
  getHref: (title, text, url) =>
    `https://mastodon.social/share?text=${encodeURIComponent(text + ' ' + url)}`,
});
```

### `CustomPlatformConfig` interface

```ts
interface CustomPlatformConfig {
  /** Display label shown below the icon in the fallback modal */
  label: string;
  /** URL of the platform icon, 48×48px recommended */
  icon: string;
  /** Returns the share URL for this platform given the current share data */
  getHref: (title: string, text: string, url: string) => string;
}
```

### More examples

```js
ShareButton.registerPlatform('bluesky', {
  label: 'Bluesky',
  icon: 'https://example.com/icons/bluesky.png',
  getHref: (_title, text, url) =>
    `https://bsky.app/intent/compose?text=${encodeURIComponent(text + ' ' + url)}`,
});

ShareButton.registerPlatform('threads', {
  label: 'Threads',
  icon: 'https://example.com/icons/threads.png',
  getHref: (_title, text, url) =>
    `https://www.threads.net/intent/post?text=${encodeURIComponent(text + ' ' + url)}`,
});

ShareButton.registerPlatform('pinterest', {
  label: 'Pinterest',
  icon: 'https://example.com/icons/pinterest.png',
  getHref: (_title, _text, url) =>
    `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`,
});
```

### Disabling a custom platform per instance

Custom platforms respect the same `key="false"` convention as built-in platforms. Use the registration key as the attribute name:

```html
<!-- Mastodon was registered globally, but disabled on this instance -->
<browserux-share-button mastodon="false"></browserux-share-button>
```

### Registration order

Custom platforms appear in the modal **after** all built-in platforms, in the order they were registered.

### Registration timing

Register platforms before the first `<browserux-share-button>` connects to the DOM. The fallback modal is rendered lazily on first use, so platforms registered before the first click will appear correctly. Registering after the modal has already been opened will not affect currently rendered instances.

---

## Platform icons

Built-in platform icons are hosted on the browserux.com CDN and loaded at runtime via their URLs. They are rendered at 48×48px inside circular `<img>` elements in the fallback modal.

For custom platforms, provide a publicly accessible icon URL. A square icon at 48×48px or higher resolution is recommended.
