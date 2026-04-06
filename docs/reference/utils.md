# Utilities

`browserux-share-button` exports two utility functions that are used internally by the component and available for external use.

---

## `getShareIcon()`

**File:** `src/utils/share-icons.ts`

Returns the icon URL for a given built-in sharing platform or special key.

### Signature

```ts
function getShareIcon(platform: ShareIconKey): string
```

### Type

```ts
type ShareIconKey =
  | 'email'
  | 'x'
  | 'facebook'
  | 'whatsapp'
  | 'sms'
  | 'linkedin'
  | 'telegram'
  | 'reddit'
  | 'copy'
  | 'website';
```

### Returns

A URL string pointing to the platform icon on the browserux.com CDN. Returns an empty string if the key is not found.

### Example

```js
import { getShareIcon } from 'browserux-share-button';

const facebookIcon = getShareIcon('facebook');
// → 'https://browserux.com/commons/logos/facebook.png'

const unknownIcon = getShareIcon('unknown');
// → ''
```

### Available icons

| Key | Description |
|---|---|
| `email` | Email / mail icon |
| `x` | X (Twitter) icon |
| `facebook` | Facebook icon |
| `whatsapp` | WhatsApp icon |
| `sms` | SMS / Messages icon |
| `linkedin` | LinkedIn icon |
| `telegram` | Telegram icon |
| `reddit` | Reddit icon |
| `copy` | Copy-to-clipboard icon |
| `website` | Generic website / app icon (used as fallback in copy box) |

---

## `getBestIconUrl()`

**File:** `src/utils/icons.ts`

Resolves the best available app icon from the document's `<link>` elements. Used internally to display the app icon in the fallback modal's copy-to-clipboard box.

### Signature

```ts
function getBestIconUrl(fallbackUrl: string): string
```

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `fallbackUrl` | `string` | URL returned if no `<link>` icon is found |

### Returns

The best available icon URL from the document head, resolved in this priority order:

1. SVG icon (`<link rel="icon" type="image/svg+xml">`)
2. Apple touch icon (`<link rel="apple-touch-icon">`)
3. Other favicon (`<link rel="icon">` with any href)
4. The provided `fallbackUrl`

### Example

```js
import { getBestIconUrl } from 'browserux-share-button';

// Will return the SVG favicon if available, otherwise apple-touch-icon, etc.
const iconUrl = getBestIconUrl('https://browserux.com/commons/logos/website.png');
```

### Use case

This function is used internally when rendering the copy-to-clipboard section of the fallback modal. It picks the highest-quality icon available in the document rather than always using a generic placeholder.

If your page does not have any `<link rel="icon">` elements, the `fallbackUrl` is returned. You can call this function yourself if you want to display the detected icon elsewhere in your UI.
