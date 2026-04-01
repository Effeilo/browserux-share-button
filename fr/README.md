[EN](../README.md) | **FR**

<div>
  <img src="https://browserux.com/img/logos/logo-browserux-share-button-300.png" alt="logo BrowserUX Share Button"/>
</div>

# BrowserUX Share Button

Un Web Component moderne et adaptable pour faciliter le partage de contenu sur tous les supports. Il privilégie l'API Web Share native, tout en assurant une expérience de repli soignée et universelle. Léger, multilingue, sans dépendance.

[![npm version](https://img.shields.io/npm/v/browserux-share-button.svg)](https://www.npmjs.com/package/browserux-share-button)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-brightgreen)](https://unpkg.com/browserux-share-button/dist/browserux-share-button.min.js)

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Fonctionnement](#fonctionnement)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Paramètres](#parametres-du-browserux-share-button)
- [Événements custom](#événements-custom)
- [API programmatique](#api-programmatique)
- [Registre de plateformes custom](#registre-de-plateformes-custom)
- [Build & Développement](#build--développement)
- [Licence](#licence)

## Fonctionnalités

### 🚀 Comportement de partage intelligent

- 🔗 **Prise en charge de l'API Web Share native**  
  Utilise la méthode `navigator.share()` lorsqu'elle est disponible, idéale pour les contextes mobiles et PWA.

- 🧭 **Fallback automatique**  
  Replie gracieusement vers une interface modale moderne et tactile lorsque le partage natif n'est pas pris en charge.

- 🎯 **Détection automatique des métadonnées**  
  Lit automatiquement les métadonnées de partage `title`, `text` et `url` via les attributs HTML, le document, ou le manifeste web.

- 📧 **Partage multi-plateformes**
  Prend en charge Email, SMS, X (Twitter), Facebook, WhatsApp, LinkedIn, Telegram et Reddit.

- 🔌 **Registre de plateformes custom**
  Enregistrez des plateformes tierces (ex. Mastodon, Bluesky) via `ShareButton.registerPlatform()`.

- 🚫 **Désactivation par plateforme**
  Désactivez une ou plusieurs plateformes via des attributs comme `facebook="false"` ou `sms="false"`.

### 🌍 Accessibilité & Internationalisation

- 🌐 **Support multilingue (`lang`)**
  Interface et labels ARIA localisés en 12 langues intégrées, détectés automatiquement ou définis via l'attribut `lang`.

- 🦮 **Accessibilité clavier et ARIA**  
  Modale accessible avec rôles ARIA, piège au focus, et navigation clavier (Escape, Tab, Shift+Tab).

- 📢 **Retours visuels et auditifs**  
  Messages personnalisés pour les succès/erreurs de copie, erreurs de partage ou problèmes d'initialisation.

### 🎨 Personnalisation visuelle

- 🖌 **Variables CSS pour le style**  
  Personnalisez le bouton et la modale via des propriétés CSS (`--bux-share-btn-*`, `--bux-share-fallback-*`, etc.).

- 🪄 **Contenu personnalisable via slot**  
  Ajoutez votre propre icône ou libellé dans le bouton principal avec `<slot name="icon">`.

- 📱 **Animation adaptée au mobile**  
  Fallback mobile avec effet de glissement vers le haut et possibilité de fermeture par balayage.

### 🔧 Expérience développeur

- 🧼 **Shadow DOM optionnel (`no-shadow`)**
  Rendu en Shadow DOM par défaut ; option de le désactiver pour un style global plus flexible.

- 🧩 **Compatible avec tous les frameworks**
  Fonctionne avec tous les frameworks frontend (React, Vue, Angular) ou en HTML pur.

- 📦 **Léger et optimisé pour le tree-shaking**
  Zéro dépendance. Importe uniquement ce dont vous avez besoin, avec types TypeScript inclus.

- 🧪 **Modulaire et typé**
  Écrit en TypeScript avec enums `SharePlatform` typés et utilitaires exportables (`getShareIcon`, `getBestIconUrl`).

- 📡 **Système d'événements custom**
  Émet des `CustomEvent` (avec propagation, traversant le Shadow DOM) pour chaque interaction — `bux:share-success`, `bux:fallback-open`, `bux:copy-success`, etc.

- 🖱 **API programmatique**
  Contrôlez le composant depuis JavaScript : `share()`, `setShareData()`, `openFallback()`, `closeFallback()`.

  ## Fonctionnement

Le Web Component `<browserux-share-button>` offre une expérience de partage fluide en s'appuyant sur l'[API Web Share](https://developer.mozilla.org/fr/docs/Web/API/Navigator/share) lorsqu'elle est disponible, et en proposant un fallback complet et accessible sinon.

### 1. Détection automatique des capacités de partage

Lorsqu'un utilisateur clique sur le bouton :

- Si `navigator.share()` est pris en charge (généralement sur mobile ou PWA), la feuille de partage native s'ouvre.
- Sinon, une modale fallback personnalisée s'affiche avec des liens de partage et une option de copie dans le presse-papiers.

### 2. Résolution des métadonnées

Le composant détermine automatiquement quoi partager :

- **Titre** : via l'attribut `title`, la balise `<title>`, ou le manifeste
- **Texte** : via l'attribut `text`, la meta description, ou le manifeste
- **URL** : via l'attribut `url` ou `location.href`

Ce comportement garantit une intégration sans configuration pour les cas simples : il suffit d'insérer le composant HTML.

### 3. Modale de fallback personnalisable

Lorsque le fallback est activé, la modale :

- Affiche uniquement les plateformes activées (email, X, WhatsApp, etc.)
- Présente un encart avec l'icône de l'application, le titre et le lien
- Permet de copier le lien avec un retour visuel (`"Lien copié !"`)
- Supporte la navigation clavier et tactile (touche Escape, balayage vers le bas)

### 4. Langue & accessibilité

- Le composant détecte automatiquement la langue via l'attribut `lang` ou `<html lang>`
- Tous les messages ARIA et labels sont traduits (12 langues intégrées)
- La modale et le bouton sont entièrement accessibles (ARIA, navigation clavier, piège au focus)

## Installation

```bash
npm install browserux-share-button
```

Ou via CDN:

```html
<script type="module" src="https://unpkg.com/browserux-share-button/dist/browserux-share-button.min.js"></script>
```

> Utilisez la version `.esm.js` lorsque vous intégrez via un bundler (React, Vue, Angular, etc.), et la version `.min.js` lorsque vous l'utilisez directement dans du HTML via une balise `<script>`.

## Utilisation

### Projet moderne avec bundler (Vite, Webpack, etc.)

1. Importez le composant globalement dans votre script principal :

```js
import 'browserux-share-button';
```

2. Puis utilisez-le dans votre HTML :

```html
<browserux-share-button 
    url="https://example.com" 
    text="Check this out!"
></browserux-share-button>
```

### React / Next.js

1. Import dynamique dans un `useEffect` :

```js
import { useEffect } from 'react';

useEffect(() => {
  import('browserux-share-button');
}, []);
```

2. Utilisation dans le JSX comme une balise HTML classique :

```jsx
<browserux-share-button></browserux-share-button>
```

> Pour la prise en charge des types JSX, vous pouvez créer manuellement un fichier `browserux-share-button.d.ts`.

### Vue 3

1. Importez-le globalement dans `main.js` ou `main.ts` :

```js
import 'browserux-share-button';
```

2. Utilisez-le comme un composant HTML natif :

```html
<browserux-share-button></browserux-share-button>
```

### Angular

1. Ajoutez l'import dans `main.ts` :

```ts
import 'browserux-share-button';
```

2. Dans `AppModule`, activez les éléments personnalisés :

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

### HTML uniquement (sans bundler)

1. Chargez le script directement depuis un CDN :

```html
<script type="module" src="https://unpkg.com/browserux-share-button/dist/browserux-share-button.min.js"></script>
```

2. Utilisez la balise où vous le souhaitez :

```html
<browserux-share-button></browserux-share-button>
```

## Paramètres de `<browserux-share-button>`

`<browserux-share-button>` prend en charge diverses options de personnalisation et fonctionnalités d’intégration :

| Paramètre                   | Type               | Nom                | Description                                                     |
| --------------------------- | ------------------ | ------------------ | --------------------------------------------------------------- |
| URL                         | Attribut           | `url`              | L’URL à partager (par défaut : `location.href` actuel)          |
| Titre                       | Attribut           | `title`            | Titre utilisé dans les méthodes de partage natives et de repli  |
| Texte                       | Attribut           | `text`             | Extrait de texte accompagnant le lien partagé                   |
| Langue                      | Attribut           | `lang`             | Force la langue du composant (`en`, `fr`, etc.)                 |
| Sans Shadow DOM             | Attribut           | `no-shadow`        | Rend le composant sans Shadow DOM                               |
| Désactivation de plateforme | Attribut           | `facebook="false"` | Désactive une plateforme spécifique dans l’interface de repli   |
| Source du manifeste         | Attribut           | `manifest-src`     | Chemin personnalisé vers un manifeste web pour repli métadonnée |
| Libellés personnalisés      | Attribut de donnée | `data-label-*`     | Remplace les libellés par défaut (`data-label-copy`, etc.)      |
| Icône du bouton de partage  | Slot               | `icon`             | Personnalise l’icône du bouton de partage                       |

### URL personnalisée (`url`)

Par défaut, le composant `<browserux-share-button>` partage l’URL de la page actuelle (`location.href`). Cependant, vous pouvez outrepasser ce comportement en définissant une URL différente via l’attribut `url`.

#### Attribut : `url`

- Type : `string` (URL valide)
- Valeur par défaut : `location.href`
- Effet : spécifie l’URL à transmettre à l’API Web Share native ou aux liens de partage fallback.

#### Exemple

```html
<browserux-share-button 
    url="https://example.com/page-to-share"
></browserux-share-button>
```

Dans cet exemple, cliquer sur le bouton de partage partagera `https://example.com/page-to-share`, quel que soit l’URL de la page actuelle.

Utilisations courantes :

- Partager une URL canonique ou raccourcie spécifique
- Promouvoir une page d’atterrissage depuis plusieurs contextes
- Tester différents liens sans changer l’emplacement de la page

#### Astuce

Assurez-vous que l’URL soit publiquement accessible et commence par `https://` pour une compatibilité maximale avec les services de partage natifs et sociaux.

### Titre personnalisé (`title`)

Le titre est utilisé par certaines plateformes de partage comme **objet** (ex : email) ou **titre** (ex : Twitter/X ou LinkedIn). Par défaut, le composant tente d’extraire le titre du document actuel ou du manifeste de l’application web.

#### Attribut : `title`

- Type : `string`
- Valeur par défaut : issue de la balise `<title>` ou du manifeste web
- Effet : fournit un titre lisible pour les partages

#### Exemple

```html
<browserux-share-button 
    title="Check out this amazing article!"
></browserux-share-button>
```

Dans ce cas, les plateformes comme l’email utiliseront ce titre comme objet, et X/Twitter l’incluront dans le texte du tweet.

#### Comportement de repli

Si aucun `title` n’est fourni :

1. Le composant vérifie la balise `<title>` de la page
2. Si non disponible, tente de lire le champ `name` dans le manifeste de l’application
3. En échec, le titre est omis

#### Quand le surcharger

Fournissez un `title` personnalisé si :

- Le titre de la page est trop générique
- Vous souhaitez promouvoir un message ou un produit précis
- Vous partagez une page depuis une app shell ou une vue embarquée

> Astuce : combinez `title`, `text`, et `url` pour une présentation optimale sur toutes les plateformes.

### Texte personnalisé (`text`)

L’attribut `text` permet d’ajouter un message ou résumé accompagnant l’URL partagée. Ce contenu est fréquemment utilisé dans les apps de messagerie, les réseaux sociaux et les corps d’email.

#### Attribut : `text`

- Type : `string`
- Valeur par défaut : extraite du manifeste web (`description`) ou vide
- Effet : ajoute un contexte au contenu partagé

#### Exemple

```html
<browserux-share-button 
    text="Here's a quick read I think you'll enjoy."
></browserux-share-button>
```

#### Cas d’usage

- Suggérer une raison de cliquer ou de lire
- Ajouter un message promotionnel avec l’URL
- Décrire plus clairement le contenu lié

#### Comportement de repli

Si aucun `text` n’est défini :

1. Le composant tente de lire le champ `description` dans le manifeste web
2. Sinon, le texte est laissé vide

> Astuce : Gardez-le concis et pertinent pour maximiser l’engagement.

### Langue personnalisée (`lang`)

L’attribut `lang` détermine la langue utilisée pour les libellés internes, descriptions ARIA et contenu de repli.

#### Attribut : `lang`

- Type : `string` (ex : `"en"`, `"fr"`, `"es"`, `"de"`)
- Par défaut : dérivé du composant, de `<html lang>`, ou `en`
- Effet : ajuste les contenus internationalisés dans le composant

#### Exemple

```html
<browserux-share-button lang="fr"></browserux-share-button>
```

Dans cet exemple, tous les libellés comme "Copier le lien" ou les messages d’erreur s’afficheront en français.

#### Ordre de détection

1. Attribut `lang` explicite sur le composant
2. Fallback vers `<html lang>`
3. Fallback vers `"en"`

#### Langues prises en charge

- Anglais (`en`)
- Français (`fr`)
- Espagnol (`es`)
- Allemand (`de`)
- Japonais (`ja`)
- Russe (`ru`)
- Portugais (`pt`)
- Italien (`it`)
- Néerlandais (`nl`)
- Chinois (`zh`)
- Coréen (`ko`)
- Arabe (`ar`)

> Astuce : vous pouvez aussi remplacer n’importe quel libellé avec `data-label-*` pour une personnalisation totale.

### Activation/Désactivation du Shadow DOM (`no-shadow`)

Par défaut, le composant utilise le Shadow DOM pour encapsuler son style et sa structure. Vous pouvez désactiver ce comportement avec l’attribut `no-shadow`.

#### Attribut : `no-shadow`

- Type : `boolean` (présent ou non)
- Effet : rend le contenu du composant dans le Light DOM

#### Exemple

```html
<browserux-share-button no-shadow></browserux-share-button>
```

#### Quand l’utiliser

- Vous souhaitez appliquer du style via du CSS global
- Vous utilisez un framework ayant des limites avec le Shadow DOM
- Vous préférez une inspection/débogage plus simple

> ⚠️ Désactiver le Shadow DOM rend le composant plus vulnérable aux conflits de style globaux.

### Désactivation de plateformes de partage (`facebook="false"`, etc.)

Le composant inclut une interface de repli qui montre les options de partage multiplateformes. Vous pouvez cacher certaines plateformes via un attribut booléen.

#### Format

- Nom de l’attribut : correspond au nom de la plateforme
- Valeur de l’attribut : `"false"` (chaîne de caractères)

#### Plateformes supportées

- `email`
- `sms`
- `x`
- `facebook`
- `whatsapp`
- `linkedin`
- `telegram`
- `reddit`

#### Exemple

```html
<browserux-share-button facebook="false" sms="false"></browserux-share-button>
```

### Source personnalisée du manifeste (`manifest-src`)

Si vous ne fournissez pas explicitement les attributs `title` ou `text`, `<browserux-share-button>` tentera de charger les métadonnées depuis le manifeste de votre application web.

#### Attribut : `manifest-src`

- Type : `string` (chemin ou URL valide)
- Par défaut : utilise `<link rel="manifest">` de la page courante
- Effet : remplace l’URL du manifeste à charger

#### Exemple

```html
<browserux-share-button 
  manifest-src="/custom-manifest.webmanifest"
></browserux-share-button>
```

#### Quand l’utiliser

- Votre manifeste n’est pas déclaré dans le `<head>`
- Vous souhaitez charger des métadonnées depuis un fichier différent
- Le chemin par défaut du manifeste est erroné ou inaccessible

#### Comportement de repli

1. Recherche `<link rel="manifest">` dans le `<head>`
2. Si trouvé, tente de le charger et le parser
3. Sinon, continue avec des valeurs par défaut ou vides

> Astuce : le manifeste doit être servi avec le bon MIME (`application/manifest+json`) et accessible via CORS.

### Libellés personnalisés (ARIA & UI)

Vous pouvez surcharger les libellés internes du composant (accessibilité ARIA ou UI fallback) via les attributs `data-label-*`. Cela est utile pour la localisation, le ton de marque ou des messages personnalisés.

#### Format

- Nom de l’attribut : `data-label-*`
- Valeur : chaîne personnalisée (visible dans l’UI ou aux lecteurs d’écran)

#### Attributs disponibles

| Attribut                 | Fonction                                         |
| ------------------------ | ------------------------------------------------ |
| `data-label-copy`        | Texte du bouton "Copier le lien"                 |
| `data-label-copied`      | Message après copie réussie                      |
| `data-label-error-copy`  | Erreur si la copie dans le presse-papier échoue  |
| `data-label-error-init`  | Avertissement si le manifeste/init échoue        |
| `data-label-error-share` | Message si `navigator.share()` génère une erreur |

#### Exemple

```html
<browserux-share-button
  data-label-copy="Copier le lien"
  data-label-copied="Lien copié !"
  data-label-error-copy="Erreur lors de la copie"
  data-label-error-init="Erreur lors de l'initialisation"
  data-label-error-share="Échec du partage natif"
></browserux-share-button>
```

#### Quand l’utiliser

- Pour fournir des libellés localisés sans utiliser le système `lang`
- Pour adapter le ton de la marque
- Pour remplacer les textes fallback par des emojis ou pictos (ex : ✅ Copié !)

> Astuce : ces attributs priment sur `lang` et sont utiles pour les apps hybrides ou multilingues.

## Événements custom

Le composant émet des `CustomEvent` qui se propagent et traversent les frontières Shadow DOM (`composed: true`), observables depuis n'importe quel élément parent.

| Événement | Quand | `event.detail` |
|---|---|---|
| `bux:share-success` | Partage natif réussi | `{ title, text, url }` |
| `bux:share-abort` | L'utilisateur a annulé la boîte de partage | — |
| `bux:share-error` | Erreur inattendue lors du partage natif | `{ error }` |
| `bux:fallback-open` | Modale fallback ouverte | — |
| `bux:fallback-close` | Modale fallback fermée | — |
| `bux:copy-success` | Lien copié dans le presse-papiers | `{ url }` |
| `bux:copy-error` | Échec de l'écriture dans le presse-papiers | `{ error }` |

### Exemple

```js
const btn = document.querySelector('browserux-share-button');

btn.addEventListener('bux:share-success', (e) => {
  console.log('Partagé :', e.detail.url);
});

btn.addEventListener('bux:copy-success', (e) => {
  analytics.track('lien_copie', { url: e.detail.url });
});

btn.addEventListener('bux:fallback-close', () => {
  console.log('Modale fermée');
});
```

---

## API programmatique

Au-delà des attributs HTML, `<browserux-share-button>` expose des méthodes publiques appelables directement depuis JavaScript.

### `share()`

Déclenche le flux de partage par code, comme si l'utilisateur avait cliqué sur le bouton.

```js
const btn = document.querySelector('browserux-share-button');
btn.share();
```

### `setShareData(data)`

Met à jour les données de partage à la volée sans re-rendu. Accepte un objet partiel — seuls les champs fournis sont modifiés.

```js
btn.setShareData({
  title: 'Nouveau titre',
  url: 'https://example.com/nouvelle-page',
});
```

### `openFallback()`

Ouvre la modale fallback par code, quelle que soit la disponibilité de l'API Web Share.

```js
btn.openFallback();
```

### `closeFallback()`

Ferme la modale fallback par code et restaure le focus sur le bouton de partage.

```js
btn.closeFallback();
```

---

## Registre de plateformes custom

Vous pouvez étendre la modale fallback avec vos propres cibles de partage via la méthode statique `ShareButton.registerPlatform()`. Les plateformes enregistrées apparaissent dans la modale de toutes les instances `<browserux-share-button>` et respectent la même convention de désactivation `key="false"`.

### `ShareButton.registerPlatform(key, config)`

| Paramètre | Type | Description |
|---|---|---|
| `key` | `string` | Identifiant unique, utilisé aussi comme nom d'attribut pour désactiver la plateforme |
| `config.label` | `string` | Nom affiché sous l'icône |
| `config.icon` | `string` | URL de l'icône (48×48 recommandé) |
| `config.getHref` | `(title, text, url) => string` | Fonction qui retourne l'URL de partage |

### Exemple

```js
import { ShareButton } from 'browserux-share-button';

ShareButton.registerPlatform('mastodon', {
  label: 'Mastodon',
  icon: 'https://example.com/mastodon-icon.png',
  getHref: (title, text, url) =>
    `https://mastodon.social/share?text=${encodeURIComponent(text + ' ' + url)}`,
});
```

Pour désactiver une plateforme custom sur une instance spécifique :

```html
<browserux-share-button mastodon="false"></browserux-share-button>
```

> `registerPlatform()` doit être appelé avant que le composant soit connecté au DOM pour que la plateforme apparaisse dès le premier rendu.

---

## Build & Développement

```bash
npm install
npm run build
```

Le projet utilise TypeScript et Rollup pour générer les fichiers suivants :
- `dist/browserux-share-button.esm.js`
- `dist/browserux-share-button.umd.js`
- `dist/browserux-share-button.d.ts`
- `dist/browserux-share-button.min.js`

> Ces fichiers sont prêts à être utilisés dans des environnements modulaires ainsi que dans des contextes de chargement de scripts traditionnels.

### Tests

```bash
npm run test           # lancer les tests une fois
npm run test:watch     # mode watch
npm run test:coverage  # avec rapport de couverture
```

Les tests utilisent [Vitest](https://vitest.dev/) avec [happy-dom](https://github.com/capricorn86/happy-dom) comme environnement DOM.

### Architecture de la classe

```ts
class ShareButton extends HTMLElement
│
├── 🔐 Propriétés privées
│   ├── shareTitle: string
│   ├── shareText: string
│   ├── shareUrl: string
│   ├── root: ShadowRoot | HTMLElement
│   ├── labels: typeof I18N_LABELS[string]
│   ├── externalFallbackEl?: HTMLDivElement
│   ├── focusTrapRemover?: () => void
│   └── lastFocus?: HTMLElement
│
├── 🗂 Registre statique
│   ├── private static customPlatforms: Map<string, CustomPlatformConfig>
│   └── static registerPlatform(key: string, config: CustomPlatformConfig): void
│
├── 🛠️ Configuration & Utilitaires
│   ├── private isDisabled(platform: string): boolean
│   ├── private getShareConfig(platform: SharePlatform): { href, label, icon } | null
│   └── private dispatch<T>(name: string, detail?: T): void
│
├── 🌐 Localisation & Initialisation
│   └── private onKeyDown = (e: KeyboardEvent): void
│
├── 🖼️ Rendu du bouton principal
│   └── private render(): void
│
├── 📱 Rendu de secours (modale)
│   ├── private renderExternalFallback(): void
│   ├── private renderPlatformLinks(container: HTMLElement): void
│   ├── private renderCopyButton(container: HTMLElement, initialCopyHtml: string): void
│   ├── private bindFallbackEvents(container: HTMLElement): void
│   ├── private showFallback(): void
│   └── private hideFallback(): void
│
├── 🔄 Cycle de vie
│   └── async connectedCallback(): Promise<void>
│
└── 🖱 API publique
    ├── async share(): Promise<void>
    ├── setShareData(data: Partial<ShareData>): void
    ├── openFallback(): void
    └── closeFallback(): void
```

## Licence

Licence MIT, libre d’utilisation, de modification et de distribution.