[EN](../CHANGELOG.md) | **FR**

<div>
  <img src="https://browserux.com/img/logos/logo-browserux-share-button-300.png" alt="logo BrowserUX Share Button"/>
</div>

# 📦 Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)  
et ce projet suit les recommandations de versionnage [SemVer](https://semver.org/lang/fr/).

---

<br>

## [1.1.0] – 28-03-2026

### ✨ Ajout

- 🌍 3 nouvelles langues intégrées : Chinois (`zh`), Coréen (`ko`), Arabe (`ar`) — 12 langues au total
- 📡 Système d'événements custom : le composant émet désormais des `CustomEvent` (avec propagation, traversant le Shadow DOM) :
  - `bux:share-success` — partage natif réussi, detail : `{ title, text, url }`
  - `bux:share-abort` — l'utilisateur a annulé la boîte de dialogue de partage natif
  - `bux:share-error` — erreur inattendue lors du partage natif, detail : `{ error }`
  - `bux:fallback-open` — modale fallback ouverte
  - `bux:fallback-close` — modale fallback fermée
  - `bux:copy-success` — lien copié dans le presse-papiers, detail : `{ url }`
  - `bux:copy-error` — échec de l'écriture dans le presse-papiers, detail : `{ error }`
- 🖱 **API programmatique** — nouvelles méthodes publiques :
  - `share()` — déclenche le flux de partage par code
  - `setShareData({ title?, text?, url? })` — met à jour les données de partage à la volée
  - `openFallback()` — ouvre la modale fallback par code
  - `closeFallback()` — ferme la modale fallback par code
- 🔌 **Registre de plateformes custom** — méthode statique `ShareButton.registerPlatform(key, config)` pour ajouter des plateformes tierces (ex. Mastodon, Bluesky) dans la modale, avec prise en charge de l'attribut de désactivation
- 🧪 **Suite de tests** — 33 tests unitaires avec [Vitest](https://vitest.dev/) + [happy-dom](https://github.com/capricorn86/happy-dom), couvrant la détection de langue, les données de partage, les événements custom, l'API publique, le registre de plateformes, la détection mobile et la restauration du focus

### 🛠 Corrigé

- 📱 La détection mobile utilise désormais `window.matchMedia('(pointer: coarse)')` à la place du User-Agent — plus fiable sur les navigateurs modernes
- ♿️ Le focus est désormais correctement restauré sur l'élément déclencheur à la fermeture de la modale (via Echap, clic sur le fond, swipe ou `closeFallback()`)
- 🔁 La logique de fermeture de la modale est centralisée dans une unique méthode `hideFallback()` — suppression du code de nettoyage dupliqué dans les gestionnaires d'événements

### 📦 Nouveaux types exportés

- `CustomPlatformConfig` — interface pour l'enregistrement de plateformes custom
- `ShareData` — interface pour le contenu à partager (`title`, `text`, `url`)

<br>

---

<br>

## [1.0.3] – 29-06-2025

### 🛠 Corrigé 

- 📱 Correction de l'affichage du fallback après annulation du partage natif (ex. sur mobile)
- 🚫 Meilleure gestion des erreurs : les exceptions `AbortError` ou contenant `cancel` ne déclenchent plus l'affichage du fallback

<br>

---

<br>

## [1.0.2] – 28-06-2025

### 🛠 Corrigé 

- 🧩 Introduction de la méthode interne `applyInlineCSSVars()` permettant de mapper les propriétés personnalisées définies dans l’attribut `style` vers le Shadow DOM du composant

<br>

---

<br>


## [1.0.1] – 27-06-2025

### 🛠 Corrigé 

- 🐛 Correction d’un bug empêchant la surcharge des variables CSS via l’attribut `style` à cause de l’encapsulation Shadow DOM
- ✅ Les styles inline comme `style="--bux-share-btn-bg: red"` sont désormais bien appliqués via une règle `:host { ... }` injectée dynamiquement

<br>

---

<br>

## [1.0.0] – 23-06-2025

### ✨ Ajout

- 💡 Composant Web `<browserux-share-button>` pour activer le partage natif ou le fallback personnalisé
- ✨ Prise en charge de l’API native navigator.share() si disponible
- ❓ Fallback automatique avec des liens vers différentes plateformes : Email, SMS, Facebook, WhatsApp, X, etc.
- 🌍 Support multilingue (détection automatique via lang + 9 langues intégrées)
- ♿️ Interface fallback accessible et navigable au clavier
- 🎨 Personnalisable via CSS et mode no-shadow
- 🔹 Attributs personnalisables pour le contenu à partager (title, text, url)
- 🏑 Fallback dynamique enrichi à partir du manifeste Web
- 🔧 Écrit en TypeScript, avec export en ESM, UMD et définitions de types
- 🗃 Compatible avec tous les frameworks modernes (React, Vue, Angular) ainsi qu’en HTML natif

<br>

---