# Introduction

## What is `browserux-share-button`?

`browserux-share-button` is a Web Component that provides a smart, accessible share button. It uses the native Web Share API when the browser supports it, and falls back to a fully featured modal with platform links when it does not.

It is built as a native Custom Element, works in any browser that supports Web Components, and integrates without modification into React, Vue, Angular, or plain HTML pages. Share data is resolved automatically from the page's metadata, requiring zero configuration in most cases.

---

## Why this component?

Implementing a share button from scratch involves solving several distinct problems:

- **API detection**: the Web Share API is not universally supported, desktop Chrome, Firefox, and Safari all have different levels of support.
- **Fallback UI**: when native sharing is not available, users need an alternative with platform links and clipboard copying.
- **Metadata resolution**: the title, text, and URL to share should default to page metadata, but gracefully accept overrides.
- **Accessibility**: the fallback modal needs keyboard navigation, focus trapping, and focus restoration.
- **Internationalization**: labels in the button and modal must work in multiple languages.
- **Mobile UX**: the fallback modal should slide in from the bottom on mobile and support swipe-to-close.

`browserux-share-button` handles all of these concerns out of the box.

---

## The two-path approach

When the user clicks the button, the component evaluates the environment and takes one of two paths:

### Path 1 - Native Web Share API

If `navigator.share` is available and the share data passes `navigator.canShare()` validation, the component calls `navigator.share()` and dispatches `bux:share-success` on completion. If the user cancels, `bux:share-abort` is dispatched. On any other error, the component falls back to the modal.

### Path 2 - Fallback modal

If the Web Share API is not available, or sharing fails, the component renders a modal attached to `<body>`. The modal includes:

- A copy-to-clipboard button with the page icon, title, and URL
- Platform links for all enabled sharing targets (Email, X, Facebook, WhatsApp, LinkedIn, Telegram, Reddit, and SMS on mobile)
- Keyboard navigation with Tab trapping and Escape to close
- Backdrop click and swipe-down-to-close on mobile
- Focus restoration to the share button when the modal closes

---

## Metadata resolution

The component resolves its share data in a priority order, attributes take precedence over document metadata, which takes precedence over manifest data.

| Field | Priority order |
|---|---|
| `title` | `title` attribute → `document.title` → manifest `name` → `"Untitled"` |
| `text` | `text` attribute → `<meta name="description">` → manifest `description` → `""` |
| `url` | `url` attribute → `location.href` |

If the `title` or `text` attributes are not provided, the component automatically fetches and parses the Web App Manifest referenced by `<link rel="manifest">` in the document head.

---

## Positioning

`browserux-share-button` is intentionally focused:

- It does not manage analytics or tracking
- It does not render social widgets or embeds
- It does not depend on any CSS framework or design system
- It does not require a build step to use

It does one thing: give users a reliable, accessible way to share content from any page.

---

## What `browserux-share-button` does not do

- No social widget embedding (like/follow counters)
- No server-side rendering integration (see [Getting started](getting-started.md) for SSR notes)
- No automatic analytics tracking
- No image or file sharing (the Web Share API supports files via `navigator.share({ files })`, but this is not exposed as an attribute)
