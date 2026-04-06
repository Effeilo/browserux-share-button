# How it works

`browserux-share-button` is a native Custom Element that manages its own lifecycle, rendering, and state. Understanding how each part works helps you integrate the component correctly and anticipate its behavior.

---

## Component lifecycle overview

```
<browserux-share-button> connected to DOM
│
├── connectedCallback (async)
│   ├── Shadow DOM or light DOM root setup
│   ├── Language resolution
│   ├── Manifest fetch (if title or text not set via attributes)
│   ├── Share data resolution (title, text, url)
│   ├── render()          → inject button template, bind click handler
│   └── applyInlineCSSVars() → map style="" CSS variables into Shadow DOM
│
│   [User clicks the button]
│
├── navigator.share available?
│   ├── YES → navigator.share(data)
│   │   ├── Success → dispatch bux:share-success
│   │   ├── AbortError → dispatch bux:share-abort
│   │   └── Other error → dispatch bux:share-error → showFallback()
│   └── NO → showFallback()
│
└── showFallback()
    ├── renderExternalFallback() (runs once, appended to <body>)
    ├── .visible class added → CSS transition opens modal
    ├── dispatch bux:fallback-open
    └── Focus trap + Escape key + backdrop click + swipe-down enabled
```

---

## Language resolution

The active language is resolved in `connectedCallback` using this priority:

1. The `lang` attribute on the component itself
2. The `lang` attribute on `<html>`
3. Fallback to `'en'`

If the resolved language code does not match a supported language, `'en'` is used. Supported codes: `en`, `fr`, `es`, `de`, `ja`, `ru`, `pt`, `it`, `nl`, `zh`, `ko`, `ar`.

---

## Metadata resolution

The component resolves three fields before rendering: `title`, `text`, and `url`. Each falls through a priority chain:

```
title : attribute "title" → document.title → manifest.name → "Untitled"
text  : attribute "text"  → <meta name="description"> → manifest.description → ""
url   : attribute "url"   → location.href
```

If `title` or `text` are not provided as attributes, the component automatically fetches the Web App Manifest. The manifest URL is resolved from:

1. The `manifest-src` attribute on the component
2. `<link rel="manifest" href="...">` in the document head

The fetch is wrapped in a `try/catch`, if it fails (missing file, network error, invalid JSON), the component silently falls back to `document.title` and `<meta name="description">`.

---

## Native sharing

When the user clicks the button:

1. The share payload is assembled: `{ title, text, url }`
2. `'share' in navigator` is checked
3. If `navigator.canShare` is available, the payload is validated, invalid payloads skip straight to the fallback
4. `navigator.share(data)` is called
5. On success: `bux:share-success` is dispatched with `detail: { title, text, url }`
6. On `AbortError` (user cancelled): `bux:share-abort` is dispatched, no fallback
7. On other errors: `bux:share-error` is dispatched with `detail: { error }`, then the fallback opens

---

## Fallback modal

The fallback modal is rendered lazily, it is only created the first time it is needed. It is appended directly to `<body>` (not inside the Shadow DOM) to avoid stacking context issues.

### Structure

```
.bux-share-fallback (fullscreen backdrop, fixed positioned)
└── #bux-share-fallback-menu
    └── .bux-share-fallback-inner (role="dialog")
        ├── #bux-share-fallback-title  (localized heading)
        ├── #bux-copy-box
        │   └── #bux-copy-link (button: icon + title + url → copies to clipboard)
        └── #bux-platforms-list (ul of platform links)
```

### Mobile behavior

On small screens (`max-width: 768px`), the modal anchors to the bottom of the viewport and slides up using a CSS transform transition. The `.bux-share-fallback-inner` border radius is applied only on the top corners.

Touch support:
- **Swipe down** by more than 60px on the modal closes it
- **Backdrop tap** closes it

### Desktop behavior

On larger screens, the modal is centered on the page with a semi-transparent backdrop. Clicking the backdrop closes it.

### SMS platform visibility

The SMS platform link is only rendered when the device is detected as a touch device via `window.matchMedia('(pointer: coarse)').matches`. On desktop, SMS is hidden automatically even if not explicitly disabled.

### Keyboard accessibility

When the fallback opens:
- Focus moves to the modal container (`.bux-share-fallback-inner`)
- Tab and Shift+Tab are trapped within the modal's focusable elements
- Escape closes the modal
- When the modal closes, focus is restored to the share button that triggered it

---

## Copy to clipboard

The copy button calls `navigator.clipboard.writeText(url)`. On success, the button label temporarily changes to the localized "Link copied!" message for 2 seconds, then restores the original content. Events dispatched: `bux:copy-success` with `detail: { url }`, or `bux:copy-error` with `detail: { error }`.

---

## CSS variable injection into Shadow DOM

CSS custom properties set via the `style` attribute are not automatically inherited into the Shadow DOM. After `render()`, `applyInlineCSSVars()` reads all `--*` properties from `this.style` and re-applies them to the host element using `style.setProperty()`. This makes `style="--bux-share-btn-bg: red"` work identically whether Shadow DOM is enabled or not.

---

## Shadow DOM and `no-shadow`

When `no-shadow` is present, the template is injected into the element's light DOM. The same render path is used in both modes. The difference is only the root node: `this.attachShadow({ mode: 'open' })` vs `this` (the element itself).

The fallback modal is always appended to `<body>` regardless of Shadow DOM mode.
