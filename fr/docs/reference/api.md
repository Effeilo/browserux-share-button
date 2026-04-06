# API programmatique

`browserux-share-button` expose des méthodes d'instance publiques pour déclencher le flux de partage et contrôler la modale de fallback depuis JavaScript. Elles s'ajoutent à la configuration basée sur les attributs.

---

## Méthodes d'instance

### `share()`

**Retourne :** `Promise<void>`

Déclenche le flux de partage par programmation, exactement comme si l'utilisateur avait cliqué sur le bouton. Utilise l'API Web Share native quand elle est disponible, bascule vers la modale sinon.

```js
const el = document.querySelector('browserux-share-button');
await el.share();
```

Tous les événements (`bux:share-success`, `bux:share-abort`, `bux:share-error`, `bux:fallback-open`) sont dispatchés normalement.

---

### `setShareData(data)`

**Paramètres :** `data: Partial<{ title: string; text: string; url: string }>`  
**Retourne :** `void`

Met à jour les données de partage utilisées par le composant à l'exécution. Seuls les champs fournis sont écrasés. Le prochain appel à `share()` ou un clic utilisateur utilisera les valeurs mises à jour.

```js
const el = document.querySelector('browserux-share-button');

el.setShareData({
  title: 'Nouveau titre d\'article',
  url: 'https://example.com/nouvel-article',
});
```

```js
// Mise à jour partielle, seule l'url change
el.setShareData({ url: 'https://example.com/page-2' });
```

**Cas d'usage :** Applications single-page où la page actuelle change sans rechargement complet.

```js
router.afterEach((to) => {
  const el = document.querySelector('browserux-share-button');
  el?.setShareData({
    title: to.meta.title,
    url: window.location.href,
  });
});
```

---

### `openFallback()`

**Retourne :** `void`

Ouvre la modale de partage de fallback par programmation. Utile pour la déclencher depuis un autre élément d'interface, comme un raccourci clavier ou un autre bouton.

```js
document.querySelector('browserux-share-button').openFallback();
```

L'événement `bux:fallback-open` est dispatché. La gestion du focus (piège + restauration) fonctionne de la même façon que quand la modale est déclenchée par un clic.

---

### `closeFallback()`

**Retourne :** `void`

Ferme la modale de partage de fallback par programmation. Peut être appelée sans risque même si la modale n'est pas actuellement ouverte.

```js
document.querySelector('browserux-share-button').closeFallback();
```

L'événement `bux:fallback-close` est dispatché et le focus est restauré vers le bouton de partage.

---

## Méthodes statiques

### `ShareButton.registerPlatform(key, config)`

**Paramètres :**
- `key: string`, identifiant unique de la plateforme (utilisé comme nom d'attribut pour la désactiver)
- `config: CustomPlatformConfig`, label, URL d'icône et constructeur d'URL de partage

**Retourne :** `void`

Enregistre une plateforme de partage personnalisée qui apparaîtra dans la modale de fallback de **chaque** instance de `<browserux-share-button>` sur la page. L'enregistrement est partagé entre toutes les instances via une `Map` statique.

```ts
interface CustomPlatformConfig {
  label: string;
  icon: string;   // URL vers une image 48×48
  getHref: (title: string, text: string, url: string) => string;
}
```

```js
import { ShareButton } from 'browserux-share-button';

ShareButton.registerPlatform('mastodon', {
  label: 'Mastodon',
  icon: 'https://example.com/icons/mastodon.png',
  getHref: (title, text, url) =>
    `https://mastodon.social/share?text=${encodeURIComponent(text + ' ' + url)}`,
});
```

```js
ShareButton.registerPlatform('bluesky', {
  label: 'Bluesky',
  icon: 'https://example.com/icons/bluesky.png',
  getHref: (title, text, url) =>
    `https://bsky.app/intent/compose?text=${encodeURIComponent(text + ' ' + url)}`,
});
```

### Désactiver une plateforme personnalisée

Les plateformes personnalisées respectent la même convention de désactivation par attribut que les plateformes intégrées. Utilisez la `key` de la plateforme comme nom d'attribut :

```html
<browserux-share-button mastodon="false"></browserux-share-button>
```

### Timing de l'enregistrement

Appelez `registerPlatform()` avant que tout élément `<browserux-share-button>` ne se connecte au DOM, idéalement dans le fichier d'entrée de votre application. La modale est rendue de façon paresseuse au premier usage, donc les plateformes enregistrées avant le premier clic apparaîtront correctement.

---

## Types TypeScript

Les types suivants sont exportés depuis le package :

```ts
import type { ShareData, CustomPlatformConfig, SharePlatform, LangKeys } from 'browserux-share-button';
```

| Type | Description |
|---|---|
| `ShareData` | `{ title: string; text: string; url: string }` |
| `CustomPlatformConfig` | Objet de config pour `registerPlatform()` |
| `SharePlatform` | Union des clés de plateformes intégrées |
| `LangKeys` | Union des codes de langue supportés |
