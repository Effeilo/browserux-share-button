# Customization

`browserux-share-button` exposes CSS custom properties for both the main share button and the fallback modal. All properties can be set via the `style` attribute or a CSS rule targeting the component.

---

## Share button CSS properties

The main share button is controlled by these custom properties:

| Property | Default | Description |
|---|---|---|
| `--bux-share-btn-bg` | `#eaeaea` | Button background color |
| `--bux-share-btn-color` | `#121212` | Button text and icon color |
| `--bux-share-btn-font-size` | `2rem` | Font size of the button label |
| `--bux-share-btn-height` | `4.2rem` | Button height |
| `--bux-share-btn-padding-inline` | `1.5rem` | Horizontal padding |
| `--bux-share-btn-border-radius` | `0.5rem` | Border radius |
| `--bux-share-btn-gap` | `0.5rem` | Gap between icon and label |
| `--bux-share-btn-hover-bg` | `#121212` | Background color on hover |
| `--bux-share-btn-hover-color` | `#eaeaea` | Text color on hover |

### Via the `style` attribute

```html
<browserux-share-button
  style="
    --bux-share-btn-bg: #0066cc;
    --bux-share-btn-color: #ffffff;
    --bux-share-btn-hover-bg: #004499;
    --bux-share-btn-hover-color: #ffffff;
    --bux-share-btn-border-radius: 2rem;
  "
></browserux-share-button>
```

### Via a CSS rule

```css
browserux-share-button {
  --bux-share-btn-bg: #0066cc;
  --bux-share-btn-color: #ffffff;
  --bux-share-btn-height: 3rem;
  --bux-share-btn-border-radius: 2rem;
}
```

> CSS custom properties set via the `style` attribute are automatically forwarded into the Shadow DOM by the component's `applyInlineCSSVars()` method. Both approaches work identically whether Shadow DOM is enabled or not.

---

## Fallback modal CSS properties

The fallback modal injects its own `<style>` tag into `<head>` once, the first time the modal is opened. These custom properties control its appearance:

| Property | Default | Description |
|---|---|---|
| `--bux-share-fallback-bg` | `#251f17` | Modal panel background color |
| `--bux-share-fallback-color` | `#ede0d4` | Modal text color |
| `--bux-share-fallback-border-radius` | `2rem` | Modal panel border radius |
| `--bux-share-fallback-title-font-size` | `2.2rem` | Font size of the modal title |
| `--bux-share-fallback-copy-box-bg` | `#302921` | Background of the copy link box |

Set these properties on `:root` to override the defaults:

```css
:root {
  --bux-share-fallback-bg: #1a1a2e;
  --bux-share-fallback-color: #e0e0ff;
  --bux-share-fallback-border-radius: 1rem;
  --bux-share-fallback-copy-box-bg: #16213e;
}
```

---

## Customizing the button icon

The button displays a 🔗 emoji by default. Replace it using the `icon` slot:

```html
<!-- Custom emoji -->
<browserux-share-button>
  <span slot="icon">📤</span>
</browserux-share-button>

<!-- SVG icon -->
<browserux-share-button>
  <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <!-- your SVG path -->
  </svg>
</browserux-share-button>

<!-- Image -->
<browserux-share-button>
  <img slot="icon" src="/icons/share.svg" alt="" width="20" height="20">
</browserux-share-button>
```

See [Slots](../reference/slots.md) for full details.

---

## Hiding the button label

The button label is a localized "Share" string rendered in a `<span>`. To show only the icon, hide the label via CSS:

```css
browserux-share-button::part(label) {
  display: none;
}
```

Or with `no-shadow`, target it directly:

```css
browserux-share-button #label-placeholder {
  display: none;
}
```

---

## Adapting to your theme

Because the modal properties are on `:root`, you can override them per theme using `[data-theme]` (compatible with `browserux-theme-switcher`):

```css
[data-theme="light"] {
  --bux-share-fallback-bg: #ffffff;
  --bux-share-fallback-color: #111111;
  --bux-share-fallback-copy-box-bg: #f0f0f0;
}

[data-theme="dark"] {
  --bux-share-fallback-bg: #1a1a1a;
  --bux-share-fallback-color: #f0f0f0;
  --bux-share-fallback-copy-box-bg: #2a2a2a;
}
```
