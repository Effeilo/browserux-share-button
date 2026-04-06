# Documentation `browserux-share-button`

## The project

Sharing content on the web should be simple, but implementing it correctly means handling the Web Share API, graceful fallbacks, metadata resolution, platform links, clipboard copying, focus management, accessibility, and internationalization.

`browserux-share-button` handles all of this in a single Web Component. Drop `<browserux-share-button>` into any page and you get a fully functional share button that uses the native share dialog when available and falls back to a rich modal menu on desktop.

One component. Zero runtime dependencies. No configuration required to get started.

---

## Table of contents

### Guide

- [Introduction](guide/introduction.md) : what it is, why it exists, how the two-path approach works
- [Getting started](guide/getting-started.md) : installation via npm or CDN, basic usage
- [How it works](guide/how-it-works.md) : Web Share API detection, metadata resolution, fallback modal, events
- [Framework usage](guide/framework-usage.md) : React, Vue, Angular, and vanilla JS integration
- [Customization](guide/customization.md) : CSS custom properties for the button and modal

### Reference

- [Attributes](reference/attributes.md) : `url`, `title`, `text`, `lang`, `no-shadow`, platform disabling
- [Events](reference/events.md) : `bux:share-success`, `bux:share-abort`, `bux:share-error`, and more
- [Slots](reference/slots.md) : `icon` slot for custom button icon
- [Programmatic API](reference/api.md) : `share()`, `setShareData()`, `openFallback()`, `closeFallback()`
- [Platforms](reference/platforms.md) : built-in platforms and custom platform registry
- [Utilities](reference/utils.md) : `getShareIcon`, `getBestIconUrl`

### Additional reference

- [Compatibility](compatibility.md) : browser support, framework compatibility, build output formats
- [Contributing](contributing.md) : report a bug, suggest an improvement, submit a PR
