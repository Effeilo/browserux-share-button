# Utilisation avec les frameworks

`browserux-share-button` est un Custom Element standard. Il fonctionne dans n'importe quel framework JavaScript sans modification, à condition que le composant soit enregistré avant son rendu.

---

## HTML vanilla (sans bundler)

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <title>Ma page</title>
  <script type="module" src="https://unpkg.com/browserux-share-button/dist/browserux-share-button.esm.js"></script>
</head>
<body>
  <browserux-share-button lang="fr"></browserux-share-button>
</body>
</html>
```

---

## JS vanilla avec un bundler

Importez une fois dans votre fichier d'entrée. L'enregistrement est automatique :

```js
// main.js
import 'browserux-share-button';
```

```html
<browserux-share-button lang="fr"></browserux-share-button>
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
        lang="fr"
        title="Mon article"
        url="https://example.com/article"
      ></browserux-share-button>
    </main>
  );
}
```

Pour Next.js avec SSR, utilisez `'use client'` :

```jsx
'use client';
import 'browserux-share-button';

export default function ShareSection() {
  return <browserux-share-button lang="fr"></browserux-share-button>;
}
```

### Écouter des événements dans React

```jsx
import { useEffect, useRef } from 'react';
import 'browserux-share-button';

export default function ShareSection() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const onSuccess = (e) => console.log('Partagé :', e.detail);
    const onCopy = (e) => console.log('Copié :', e.detail.url);

    el.addEventListener('bux:share-success', onSuccess);
    el.addEventListener('bux:copy-success', onCopy);

    return () => {
      el.removeEventListener('bux:share-success', onSuccess);
      el.removeEventListener('bux:copy-success', onCopy);
    };
  }, []);

  return <browserux-share-button ref={ref} lang="fr"></browserux-share-button>;
}
```

### Utiliser l'API programmatique dans React

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
      <browserux-share-button ref={ref} lang="fr"></browserux-share-button>
      <button onClick={handleShare}>Partager cet article</button>
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
  console.log('Partagé :', e.detail);
}
</script>

<template>
  <browserux-share-button
    lang="fr"
    title="Mon article"
    @bux:share-success="onShareSuccess"
  ></browserux-share-button>
</template>
```

Si Vue avertit d'un élément inconnu, ajoutez-le aux `compilerOptions` dans `vite.config.js` :

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

Ajoutez `CUSTOM_ELEMENTS_SCHEMA` à votre module :

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
  lang="fr"
  (bux:share-success)="onShareSuccess($event)"
></browserux-share-button>
```

```ts
onShareSuccess(event: CustomEvent) {
  console.log('Partagé :', event.detail);
}
```

---

## Déclarations TypeScript

Ajoutez une déclaration pour étendre les maps d'éléments natifs :

```ts
// global.d.ts
declare global {
  interface HTMLElementTagNameMap {
    'browserux-share-button': HTMLElement;
  }
}
```

---

## Utiliser `defineBrowseruxComponents()`

Le package exporte également un helper `defineBrowseruxComponents()` qui enregistre le composant en toute sécurité, évitant les erreurs si il est déjà défini (utile dans les architectures micro-frontend ou quand plusieurs points d'entrée existent) :

```js
import { defineBrowseruxComponents } from 'browserux-share-button';

defineBrowseruxComponents(); // peut être appelé plusieurs fois sans risque
```
