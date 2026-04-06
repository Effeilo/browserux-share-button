[EN](../README.md) | **FR**

<div>
  <img src="https://browserux.com/img/logos/logo-browserux-share-button-300.png" alt="logo BrowserUX Share Button"/>
</div>

# BrowserUX Share Button

**Une solution moderne pour permettre un partage de contenu fluide sur tous les appareils et plateformes.**

BrowserUX Share Button est un Web Component léger, accessible et personnalisable qui simplifie le partage d'URLs via l'API Web Share native, lorsqu'elle est disponible, ou via une modale de secours responsive. Il prend en charge plusieurs plateformes (Email, X, WhatsApp, etc.), récupère automatiquement les métadonnées de partage et offre une localisation complète, une personnalisation visuelle et une compatibilité avec tous les frameworks.

- [Site du projet](https://browserux.com/fr/share-button/)
- [Démo](https://browserux.com/fr/share-button/demo/)
- [Documentation](./docs/index.md)
- [Changelog](./CHANGELOG.md)

<br>

[![npm version](https://img.shields.io/npm/v/browserux-share-button.svg)](https://www.npmjs.com/package/browserux-share-button)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-brightgreen)](https://unpkg.com/browserux-share-button/dist/browserux-share-button.min.js)

## Fonctionnalités

- 📱 Utilise l'API Web Share native quand elle est disponible (mobile, PWA)
- 🗂 Bascule vers une modale complète avec des liens de partage sur desktop
- 🔗 Bouton copie-dans-le-presse-papiers avec aperçu de l'icône, du titre et de l'URL
- 🌐 8 plateformes intégrées : Email, X, Facebook, WhatsApp, SMS, LinkedIn, Telegram, Reddit
- 🔌 Registre de plateformes personnalisées via `ShareButton.registerPlatform()`
- 🧠 Résolution automatique des données depuis `document.title`, `<meta>` et le Web App Manifest
- 🌍 i18n intégré pour 12 langues, auto-détecté depuis `<html lang>`
- ♿ Accessible : navigation au clavier, piège de focus, restauration du focus
- 📡 7 événements personnalisés : `bux:share-success`, `bux:share-abort`, `bux:copy-success`, et plus
- 🖱 API programmatique : `share()`, `setShareData()`, `openFallback()`, `closeFallback()`
- 🎨 Entièrement personnalisable via propriétés CSS
- 🧩 Shadow DOM optionnel, désactivable avec `no-shadow`

## Installation

```bash
npm install browserux-share-button
```

Ou via CDN :

```html
<script type="module" src="https://unpkg.com/browserux-share-button/dist/browserux-share-button.esm.js"></script>
```

## Utilisation

```js
import 'browserux-share-button';
```

```html
<browserux-share-button></browserux-share-button>
```

Avec données de partage explicites et contrôle des plateformes :

```html
<browserux-share-button
  title="Mon article"
  text="Une courte description"
  url="https://example.com/article"
  lang="fr"
  facebook="false"
  sms="false"
></browserux-share-button>
```

## Paramètres

| Paramètre | Type | Description |
|---|---|---|
| `url` | Attribut | URL à partager (défaut : `location.href`) |
| `title` | Attribut | Titre de partage (défaut : `document.title`) |
| `text` | Attribut | Description de partage (défaut : `<meta description>`) |
| `lang` | Attribut | Code de langue pour les labels intégrés |
| `manifest-src` | Attribut | Chemin personnalisé vers le Web App Manifest |
| `no-shadow` | Attribut | Désactiver l'encapsulation Shadow DOM |
| `[plateforme]="false"` | Attribut | Désactiver une plateforme : `email`, `x`, `facebook`, `whatsapp`, `sms`, `linkedin`, `telegram`, `reddit` |
| `icon` | Slot | Icône personnalisée dans le bouton (défaut : 🔗) |
| `bux:share-success` | Événement | Partage natif réussi, `e.detail: { title, text, url }` |
| `bux:share-abort` | Événement | L'utilisateur a annulé la boîte de dialogue native |
| `bux:share-error` | Événement | Partage échoué, `e.detail: { error }` |
| `bux:fallback-open` | Événement | Modale de fallback ouverte |
| `bux:fallback-close` | Événement | Modale de fallback fermée |
| `bux:copy-success` | Événement | Lien copié, `e.detail: { url }` |
| `bux:copy-error` | Événement | Écriture presse-papiers échouée, `e.detail: { error }` |
| `share()` | Méthode | Déclencher le partage par programmation |
| `setShareData(data)` | Méthode | Mettre à jour les données de partage à l'exécution |
| `openFallback()` | Méthode | Ouvrir la modale de fallback par programmation |
| `closeFallback()` | Méthode | Fermer la modale de fallback par programmation |

## Documentation

Pour la documentation complète, voir [docs/index.md](docs/index.md).

### Guide

- [Introduction](docs/guide/introduction.md) : présentation, l'approche à deux chemins, résolution des métadonnées
- [Démarrage rapide](docs/guide/getting-started.md) : installation via npm ou CDN, usage basique
- [Fonctionnement](docs/guide/how-it-works.md) : cycle de vie, API Web Share, modale de fallback, accessibilité
- [Utilisation avec les frameworks](docs/guide/framework-usage.md) : React, Vue, Angular, vanilla JS
- [Personnalisation](docs/guide/customization.md) : propriétés CSS pour le bouton et la modale

### Référence

- [Attributs](docs/reference/attributes.md) : `url`, `title`, `text`, `lang`, `no-shadow`, désactivation des plateformes
- [Événements](docs/reference/events.md) : tous les événements `bux:*` avec payloads et cas d'usage
- [Slots](docs/reference/slots.md) : slot `icon` pour l'icône du bouton
- [API programmatique](docs/reference/api.md) : `share()`, `setShareData()`, `openFallback()`, `closeFallback()`
- [Plateformes](docs/reference/platforms.md) : plateformes intégrées et registre de plateformes personnalisées
- [Utilitaires](docs/reference/utils.md) : `getShareIcon`, `getBestIconUrl`

### Référence complémentaire

- [Compatibilité](docs/compatibility.md) : support navigateur, compatibilité frameworks, formats de build
- [Contribuer](docs/contributing.md) : signaler un bug, suggérer une amélioration, soumettre une PR

## Licence

MIT © 2026 [Effeilo](https://github.com/Effeilo)
