# Fonctionnement

`browserux-share-button` est un Custom Element natif qui gère son propre cycle de vie, son rendu et son état. Comprendre le fonctionnement de chaque partie vous permet d'intégrer le composant correctement et d'anticiper son comportement.

---

## Vue d'ensemble du cycle de vie

```
<browserux-share-button> connecté au DOM
│
├── connectedCallback (async)
│   ├── Configuration de la racine Shadow DOM ou light DOM
│   ├── Résolution de la langue
│   ├── Récupération du manifest (si title ou text non fournis en attributs)
│   ├── Résolution des données de partage (title, text, url)
│   ├── render()             → injecter le template du bouton, lier le gestionnaire de clic
│   └── applyInlineCSSVars() → mapper les variables CSS de style="" dans le Shadow DOM
│
│   [L'utilisateur clique sur le bouton]
│
├── navigator.share disponible ?
│   ├── OUI → navigator.share(data)
│   │   ├── Succès → dispatch bux:share-success
│   │   ├── AbortError → dispatch bux:share-abort
│   │   └── Autre erreur → dispatch bux:share-error → showFallback()
│   └── NON → showFallback()
│
└── showFallback()
    ├── renderExternalFallback() (s'exécute une fois, ajouté à <body>)
    ├── Classe .visible ajoutée → transition CSS ouvre la modale
    ├── dispatch bux:fallback-open
    └── Piège de focus + Échap + clic fond + glissement vers le bas activés
```

---

## Résolution de la langue

La langue active est résolue dans `connectedCallback` selon cet ordre de priorité :

1. L'attribut `lang` sur le composant lui-même
2. L'attribut `lang` sur `<html>`
3. Fallback vers `'en'`

Si le code de langue résolu ne correspond pas à une langue supportée, `'en'` est utilisé. Codes supportés : `en`, `fr`, `es`, `de`, `ja`, `ru`, `pt`, `it`, `nl`, `zh`, `ko`, `ar`.

---

## Résolution des métadonnées

Le composant résout trois champs avant le rendu : `title`, `text` et `url`. Chacun parcourt une chaîne de priorité :

```
title : attribut "title" → document.title → manifest.name → "Untitled"
text  : attribut "text"  → <meta name="description"> → manifest.description → ""
url   : attribut "url"   → location.href
```

Si `title` ou `text` ne sont pas fournis en attributs, le composant récupère automatiquement le Web App Manifest. L'URL du manifest est résolue depuis :

1. L'attribut `manifest-src` sur le composant
2. `<link rel="manifest" href="...">` dans la balise head du document

La récupération est enveloppée dans un `try/catch`, si elle échoue (fichier manquant, erreur réseau, JSON invalide), le composant retombe silencieusement sur `document.title` et `<meta name="description">`.

---

## Partage natif

Quand l'utilisateur clique sur le bouton :

1. Le payload de partage est assemblé : `{ title, text, url }`
2. `'share' in navigator` est vérifié
3. Si `navigator.canShare` est disponible, le payload est validé, les payloads invalides passent directement au fallback
4. `navigator.share(data)` est appelé
5. En cas de succès : `bux:share-success` est dispatché avec `detail: { title, text, url }`
6. Sur `AbortError` (l'utilisateur a annulé) : `bux:share-abort` est dispatché, pas de fallback
7. Sur d'autres erreurs : `bux:share-error` est dispatché avec `detail: { error }`, puis la modale s'ouvre

---

## Modale de fallback

La modale de fallback est rendue de façon paresseuse, elle n'est créée que la première fois qu'elle est nécessaire. Elle est ajoutée directement à `<body>` (pas dans le Shadow DOM) pour éviter les problèmes de contexte d'empilement.

### Structure

```
.bux-share-fallback (fond plein écran, position fixe)
└── #bux-share-fallback-menu
    └── .bux-share-fallback-inner (role="dialog")
        ├── #bux-share-fallback-title  (titre localisé)
        ├── #bux-copy-box
        │   └── #bux-copy-link (bouton : icône + titre + url → copie dans le presse-papiers)
        └── #bux-platforms-list (ul des liens vers les plateformes)
```

### Comportement mobile

Sur les petits écrans (`max-width: 768px`), la modale s'ancre en bas du viewport et remonte via une transition CSS transform. Le border-radius de `.bux-share-fallback-inner` est appliqué uniquement sur les coins supérieurs.

Support tactile :
- **Glissement vers le bas** de plus de 60px sur la modale la ferme
- **Tap sur le fond** la ferme

### Comportement desktop

Sur les écrans plus larges, la modale est centrée sur la page avec un fond semi-transparent. Cliquer sur le fond la ferme.

### Visibilité de la plateforme SMS

Le lien SMS n'est rendu que quand l'appareil est détecté comme tactile/mobile via `window.matchMedia('(pointer: coarse)').matches`. Sur desktop, SMS est masqué automatiquement même s'il n'est pas explicitement désactivé.

### Accessibilité clavier

À l'ouverture de la modale :
- Le focus se déplace vers le conteneur de la modale (`.bux-share-fallback-inner`)
- Tab et Shift+Tab sont piégés dans les éléments focusables de la modale
- Échap ferme la modale
- À la fermeture, le focus est restauré vers le bouton de partage qui l'a déclenchée

---

## Copie dans le presse-papiers

Le bouton de copie appelle `navigator.clipboard.writeText(url)`. En cas de succès, le label du bouton change temporairement vers le message localisé "Lien copié !" pendant 2 secondes, puis le contenu original est restauré. Événements dispatchés : `bux:copy-success` avec `detail: { url }`, ou `bux:copy-error` avec `detail: { error }`.

---

## Injection de variables CSS dans le Shadow DOM

Les propriétés CSS personnalisées définies via l'attribut `style` ne sont pas automatiquement héritées dans le Shadow DOM. Après `render()`, `applyInlineCSSVars()` lit toutes les propriétés `--*` depuis `this.style` et les ré-applique sur l'élément host via `style.setProperty()`. Cela fait fonctionner `style="--bux-share-btn-bg: red"` de manière identique que le Shadow DOM soit activé ou non.

---

## Shadow DOM et `no-shadow`

Quand `no-shadow` est présent, le template est injecté dans le light DOM de l'élément. Le même chemin de rendu est utilisé dans les deux modes. La différence est uniquement le nœud racine : `this.attachShadow({ mode: 'open' })` vs `this` (l'élément lui-même).

La modale de fallback est toujours ajoutée à `<body>` quel que soit le mode Shadow DOM.
