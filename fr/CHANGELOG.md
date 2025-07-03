[EN](../CHANGELOG.md) | **FR**

<div>
  <img src="https://browserux.com/assets/img/logo/logo-browserux-share-button-250.png" alt="logo BrowserUX Share Button"/>
</div>

# 📦 Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)  
et ce projet suit les recommandations de versionnage [SemVer](https://semver.org/lang/fr/).

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