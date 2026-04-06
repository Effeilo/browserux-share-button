# Slots

`browserux-share-button` exposes one named slot for customizing the icon displayed inside the main share button.

---

## `icon`

**Position:** Left side of the button label  
**Default:** 🔗

The icon displayed inside the share button, to the left of the label text.

```
[ icon ] [ Share ]
   🔗
```

---

## Examples

### Default (no slot)

```html
<!-- Renders: 🔗 Share -->
<browserux-share-button></browserux-share-button>
```

### Custom emoji

```html
<browserux-share-button>
  <span slot="icon">📤</span>
</browserux-share-button>
```

### SVG icon

```html
<browserux-share-button>
  <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7..."/>
  </svg>
</browserux-share-button>
```

### Image

```html
<browserux-share-button>
  <img slot="icon" src="/icons/share.svg" alt="" width="20" height="20">
</browserux-share-button>
```

---

## Icon-only button

To display only the icon without the label, hide the label via CSS:

```css
/* With Shadow DOM (default) */
browserux-share-button::part(label) {
  display: none;
}

/* With no-shadow */
browserux-share-button #label-placeholder {
  display: none;
}
```

Or override the label text entirely with a visually hidden span for screen readers:

```html
<browserux-share-button>
  <span slot="icon" aria-hidden="true">📤</span>
</browserux-share-button>
```

---

## Shadow DOM and slots

Slots are a Shadow DOM feature. When `no-shadow` is used, the component's template is rendered in the light DOM and the `<slot name="icon">` element may not work as expected in all browsers.

If you use `no-shadow`, prefer setting the icon via a CSS approach or by targeting the rendered `#bux-share-btn` element directly.

---

## Accessibility

The slot content is inside the share button (`<button>`). Screen readers will announce the button's accessible name from its text content, which includes both the slotted icon and the label span.

For SVG icons, use `aria-hidden="true"` on the SVG to prevent screen readers from announcing the raw SVG markup:

```html
<browserux-share-button>
  <svg slot="icon" aria-hidden="true" width="20" height="20"><!-- ... --></svg>
</browserux-share-button>
```

For image icons, use `alt=""` to mark them as decorative:

```html
<browserux-share-button>
  <img slot="icon" src="/icons/share.svg" alt="" width="20" height="20">
</browserux-share-button>
```
