# Documentation `browserux-share-button`

## Le projet

Partager du contenu sur le web devrait être simple, mais l'implémenter correctement implique de gérer l'API Web Share, les fallbacks gracieux, la résolution des métadonnées, les liens vers les plateformes, la copie dans le presse-papiers, la gestion du focus, l'accessibilité et l'internationalisation.

`browserux-share-button` gère tout cela dans un seul Web Component. Ajoutez `<browserux-share-button>` dans n'importe quelle page et vous obtenez un bouton de partage entièrement fonctionnel qui utilise la boîte de dialogue native quand elle est disponible et bascule vers une modale complète sur desktop.

Un seul composant. Zéro dépendance à l'exécution. Aucune configuration requise pour démarrer.

---

## Table des matières

### Guide

- [Introduction](guide/introduction.md) : présentation, pourquoi ce composant, l'approche à deux chemins
- [Démarrage rapide](guide/getting-started.md) : installation via npm ou CDN, usage basique
- [Fonctionnement](guide/how-it-works.md) : détection de l'API, résolution des métadonnées, modale de fallback, événements
- [Utilisation avec les frameworks](guide/framework-usage.md) : React, Vue, Angular et intégration vanilla JS
- [Personnalisation](guide/customization.md) : propriétés CSS personnalisées pour le bouton et la modale

### Référence

- [Attributs](reference/attributes.md) : `url`, `title`, `text`, `lang`, `no-shadow`, désactivation des plateformes
- [Événements](reference/events.md) : `bux:share-success`, `bux:share-abort`, `bux:share-error`, et plus
- [Slots](reference/slots.md) : slot `icon` pour l'icône du bouton
- [API programmatique](reference/api.md) : `share()`, `setShareData()`, `openFallback()`, `closeFallback()`
- [Plateformes](reference/platforms.md) : plateformes intégrées et registre de plateformes personnalisées
- [Utilitaires](reference/utils.md) : `getShareIcon`, `getBestIconUrl`

### Référence complémentaire

- [Compatibilité](compatibility.md) : support navigateur, compatibilité frameworks, formats de build
- [Contribuer](contributing.md) : signaler un bug, suggérer une amélioration, soumettre une PR
