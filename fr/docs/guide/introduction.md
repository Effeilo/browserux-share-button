# Introduction

## Qu'est-ce que `browserux-share-button` ?

`browserux-share-button` est un Web Component qui fournit un bouton de partage intelligent et accessible. Il utilise l'API Web Share native quand le navigateur la supporte, et bascule vers une modale complète avec des liens vers les plateformes quand ce n'est pas le cas.

Il est construit comme un Custom Element natif, fonctionne dans tout navigateur supportant les Web Components, et s'intègre sans modification dans React, Vue, Angular ou des pages HTML simples. Les données de partage sont résolues automatiquement depuis les métadonnées de la page, sans aucune configuration dans la plupart des cas.

---

## Pourquoi ce composant ?

Implémenter un bouton de partage de zéro implique de résoudre plusieurs problèmes distincts :

- **Détection de l'API** : l'API Web Share n'est pas universellement supportée, Chrome desktop, Firefox et Safari ont tous des niveaux de support différents.
- **Interface de fallback** : quand le partage natif n'est pas disponible, les utilisateurs ont besoin d'une alternative avec des liens vers les plateformes et la copie dans le presse-papiers.
- **Résolution des métadonnées** : le titre, le texte et l'URL à partager doivent utiliser par défaut les métadonnées de la page, tout en acceptant des surcharges.
- **Accessibilité** : la modale de fallback nécessite une navigation au clavier, un piège de focus et une restauration du focus.
- **Internationalisation** : les labels du bouton et de la modale doivent fonctionner en plusieurs langues.
- **UX mobile** : la modale de fallback doit remonter du bas sur mobile et supporter le glissement vers le bas pour fermer.

`browserux-share-button` gère toutes ces problématiques nativement.

---

## L'approche à deux chemins

Quand l'utilisateur clique sur le bouton, le composant évalue l'environnement et prend l'un de deux chemins :

### Chemin 1 - API Web Share native

Si `navigator.share` est disponible et que les données de partage passent la validation `navigator.canShare()`, le composant appelle `navigator.share()` et dispatche `bux:share-success` à la fin. Si l'utilisateur annule, `bux:share-abort` est dispatché. Sur toute autre erreur, le composant bascule vers la modale.

### Chemin 2 - Modale de fallback

Si l'API Web Share n'est pas disponible ou si le partage échoue, le composant affiche une modale attachée à `<body>`. La modale comprend :

- Un bouton copie-dans-le-presse-papiers avec l'icône de la page, le titre et l'URL
- Des liens vers les plateformes pour toutes les cibles de partage activées (Email, X, Facebook, WhatsApp, LinkedIn, Telegram, Reddit, et SMS sur mobile)
- Navigation au clavier avec piège Tab et Échap pour fermer
- Clic sur le fond et glissement vers le bas pour fermer sur mobile
- Restauration du focus vers le bouton de partage à la fermeture de la modale

---

## Résolution des métadonnées

Le composant résout ses données de partage dans un ordre de priorité, les attributs ont la priorité sur les métadonnées du document, qui ont la priorité sur les données du manifest.

| Champ | Ordre de priorité |
|---|---|
| `title` | attribut `title` → `document.title` → `name` du manifest → `"Untitled"` |
| `text` | attribut `text` → `<meta name="description">` → `description` du manifest → `""` |
| `url` | attribut `url` → `location.href` |

Si les attributs `title` ou `text` ne sont pas fournis, le composant récupère et parse automatiquement le Web App Manifest référencé par `<link rel="manifest">` dans la balise head du document.

---

## Positionnement

`browserux-share-button` est délibérément focalisé :

- Il ne gère pas les analytics ni le tracking
- Il ne rend pas de widgets sociaux ou d'embeds
- Il ne dépend d'aucun framework CSS ni système de design
- Il ne nécessite pas d'étape de build pour être utilisé

Il fait une seule chose : donner aux utilisateurs un moyen fiable et accessible de partager du contenu depuis n'importe quelle page.

---

## Ce que `browserux-share-button` ne fait pas

- Pas d'intégration de widgets sociaux (compteurs like/follow)
- Pas d'intégration server-side rendering (voir [Démarrage rapide](getting-started.md) pour les notes SSR)
- Pas de tracking analytics automatique
- Pas de partage d'images ou de fichiers (l'API Web Share supporte les fichiers via `navigator.share({ files })`, mais cela n'est pas exposé comme attribut)
