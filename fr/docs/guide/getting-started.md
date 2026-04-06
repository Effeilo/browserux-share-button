# Démarrage rapide

`browserux-share-button` fonctionne dans n'importe quelle page HTML ou projet JavaScript. Choisissez la méthode d'installation adaptée à votre configuration.

---

## Prérequis

| Environnement | Version minimale |
|---|---|
| Node.js | 18+ (pour les projets basés sur npm) |
| Navigateur | Tout navigateur supportant les Custom Elements |

Pour les détails de compatibilité navigateur, voir [Compatibilité](../compatibility.md).

---

## Installation

### Via npm

```bash
npm install browserux-share-button
```

### Via CDN

Aucune étape de build requise. Ajoutez la balise script directement dans votre HTML :

```html
<script type="module" src="https://unpkg.com/browserux-share-button/dist/browserux-share-button.esm.js"></script>
```

---

## Usage basique

Une fois le script chargé, placez le composant n'importe où dans votre HTML :

```html
<browserux-share-button></browserux-share-button>
```

C'est tout. Le composant lit `document.title` et `location.href` automatiquement et affiche le bouton de partage avec un label localisé basé sur l'attribut `lang` de la page.

---

## Usage dans un projet avec bundler

Importez le package une fois dans votre fichier d'entrée. Le composant s'enregistre globalement à l'import :

```js
import 'browserux-share-button';
```

Puis utilisez-le dans n'importe quel template HTML :

```html
<browserux-share-button></browserux-share-button>
```

---

## Fournir des données de partage

Surchargez n'importe quelle partie des métadonnées par défaut via des attributs HTML :

```html
<browserux-share-button
  title="Titre de mon article"
  text="Une courte description de l'article"
  url="https://example.com/article"
></browserux-share-button>
```

Tout attribut non fourni est résolu automatiquement depuis la page. Voir [Attributs](../reference/attributes.md) pour l'ordre de résolution complet.

---

## Désactiver des plateformes

Par défaut, toutes les plateformes intégrées apparaissent dans la modale de fallback. Désactivez-en en définissant son attribut sur `"false"` :

```html
<browserux-share-button
  facebook="false"
  sms="false"
></browserux-share-button>
```

Noms des attributs de plateformes supportés : `email`, `x`, `facebook`, `whatsapp`, `sms`, `linkedin`, `telegram`, `reddit`.

---

## Vérifier le résultat

Sur un navigateur desktop qui ne supporte pas l'API Web Share, cliquez sur le bouton. La modale de fallback doit apparaître avec :

- Un bouton copie-dans-le-presse-papiers en haut montrant l'icône de la page, le titre et l'URL
- Des liens vers les plateformes en dessous pour toutes les cibles de partage activées

Sur un navigateur mobile (iOS Safari, Android Chrome), cliquez sur le bouton. La feuille de partage native doit apparaître.

---

## Notes SSR et hydratation

Comme `browserux-share-button` lit `location.href`, `document.title` et `navigator.share` dans le navigateur, il ne doit pas être rendu côté serveur. Dans les frameworks avec SSR (Next.js, Nuxt, SvelteKit), importez ou enregistrez le composant uniquement côté client.

Pour Next.js, utilisez `'use client'` ou l'import dynamique avec `ssr: false` :

```jsx
'use client';
import 'browserux-share-button';
```

Pour Nuxt 3, utilisez `<ClientOnly>` ou gardez avec `process.client`.
