# Framework usage

`browserux-share-button` is a standard Custom Element. It works in any JavaScript framework without modification, as long as the component is registered before it is rendered.

---

## Vanilla HTML (no bundler)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My page</title>
  <script type="module" src="https://unpkg.com/browserux-share-button/dist/browserux-share-button.esm.js"></script>
</head>
<body>
  <browserux-share-button></browserux-share-button>
</body>
</html>
```

---

## Vanilla JS with a bundler

Import once in your entry file. Registration is automatic:

```js
// main.js
import 'browserux-share-button';
```

```html
<browserux-share-button></browserux-share-button>
```

---

## React / Next.js

```jsx
// App.jsx
import 'browserux-share-button';

export default function App() {
  return (
    <main>
      <browserux-share-button
        lang="en"
        title="My article"
        url="https://example.com/article"
      ></browserux-share-button>
    </main>
  );
}
```

For Next.js with SSR, use `'use client'`:

```jsx
'use client';
import 'browserux-share-button';

export default function ShareSection() {
  return <browserux-share-button></browserux-share-button>;
}
```

### Listening to events in React

```jsx
import { useEffect, useRef } from 'react';
import 'browserux-share-button';

export default function ShareSection() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const onSuccess = (e) => console.log('Shared:', e.detail);
    const onCopy = (e) => console.log('Copied:', e.detail.url);

    el.addEventListener('bux:share-success', onSuccess);
    el.addEventListener('bux:copy-success', onCopy);

    return () => {
      el.removeEventListener('bux:share-success', onSuccess);
      el.removeEventListener('bux:copy-success', onCopy);
    };
  }, []);

  return <browserux-share-button ref={ref}></browserux-share-button>;
}
```

### Using the programmatic API in React

```jsx
import { useRef } from 'react';
import 'browserux-share-button';

export default function ArticlePage({ article }) {
  const ref = useRef(null);

  const handleShare = () => {
    ref.current?.setShareData({
      title: article.title,
      url: `https://example.com/articles/${article.slug}`,
    });
    ref.current?.share();
  };

  return (
    <>
      <browserux-share-button ref={ref}></browserux-share-button>
      <button onClick={handleShare}>Share this article</button>
    </>
  );
}
```

---

## Vue 3

```vue
<script setup>
import 'browserux-share-button';

function onShareSuccess(e) {
  console.log('Shared:', e.detail);
}
</script>

<template>
  <browserux-theme-switcher
    lang="fr"
    @bux:share-success="onShareSuccess"
  ></browserux-theme-switcher>

  <browserux-share-button
    lang="fr"
    title="Mon article"
    @bux:share-success="onShareSuccess"
  ></browserux-share-button>
</template>
```

If Vue warns about an unknown element, add it to `compilerOptions` in `vite.config.js`:

```js
vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('browserux-'),
    },
  },
})
```

---

## Angular

Add `CUSTOM_ELEMENTS_SCHEMA` to your module:

```ts
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'browserux-share-button';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

```html
<!-- template -->
<browserux-share-button
  lang="en"
  (bux:share-success)="onShareSuccess($event)"
></browserux-share-button>
```

```ts
onShareSuccess(event: CustomEvent) {
  console.log('Shared:', event.detail);
}
```

---

## TypeScript declarations

Add a declaration to extend the built-in element maps:

```ts
// global.d.ts
declare global {
  interface HTMLElementTagNameMap {
    'browserux-share-button': HTMLElement;
  }
}
```

For JSX environments:

```ts
// declarations.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'browserux-share-button': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
```

---

## Using `defineBrowseruxComponents()`

The package also exports a `defineBrowseruxComponents()` helper that registers the component safely, preventing errors if it is already defined (useful in micro-frontend architectures or when multiple entry points exist):

```js
import { defineBrowseruxComponents } from 'browserux-share-button';

defineBrowseruxComponents(); // safe to call multiple times
```
