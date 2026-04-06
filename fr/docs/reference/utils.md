# Utilitaires

`browserux-share-button` exporte deux fonctions utilitaires utilisées en interne par le composant et disponibles pour un usage externe.

---

## `getShareIcon()`

**Fichier :** `src/utils/share-icons.ts`

Retourne l'URL de l'icône pour une plateforme de partage intégrée ou une clé spéciale donnée.

### Signature

```ts
function getShareIcon(platform: ShareIconKey): string
```

### Type

```ts
type ShareIconKey =
  | 'email'
  | 'x'
  | 'facebook'
  | 'whatsapp'
  | 'sms'
  | 'linkedin'
  | 'telegram'
  | 'reddit'
  | 'copy'
  | 'website';
```

### Retourne

Une chaîne URL pointant vers l'icône de la plateforme sur le CDN browserux.com. Retourne une chaîne vide si la clé n'est pas trouvée.

### Exemple

```js
import { getShareIcon } from 'browserux-share-button';

const iconeFacebook = getShareIcon('facebook');
// → 'https://browserux.com/commons/logos/facebook.png'

const iconeInconnue = getShareIcon('inconnue');
// → ''
```

### Icônes disponibles

| Clé | Description |
|---|---|
| `email` | Icône Email / courrier |
| `x` | Icône X (Twitter) |
| `facebook` | Icône Facebook |
| `whatsapp` | Icône WhatsApp |
| `sms` | Icône SMS / Messages |
| `linkedin` | Icône LinkedIn |
| `telegram` | Icône Telegram |
| `reddit` | Icône Reddit |
| `copy` | Icône copie-dans-le-presse-papiers |
| `website` | Icône générique site web / app (utilisée comme fallback dans la boîte de copie) |

---

## `getBestIconUrl()`

**Fichier :** `src/utils/icons.ts`

Résout la meilleure icône d'application disponible depuis les éléments `<link>` du document. Utilisée en interne pour afficher l'icône de l'application dans la boîte copie-dans-le-presse-papiers de la modale de fallback.

### Signature

```ts
function getBestIconUrl(fallbackUrl: string): string
```

### Paramètres

| Paramètre | Type | Description |
|---|---|---|
| `fallbackUrl` | `string` | URL retournée si aucune icône `<link>` n'est trouvée |

### Retourne

La meilleure URL d'icône disponible dans la balise head du document, résolue dans cet ordre de priorité :

1. Icône SVG (`<link rel="icon" type="image/svg+xml">`)
2. Apple touch icon (`<link rel="apple-touch-icon">`)
3. Autre favicon (`<link rel="icon">` avec n'importe quel href)
4. Le `fallbackUrl` fourni

### Exemple

```js
import { getBestIconUrl } from 'browserux-share-button';

// Retournera le favicon SVG si disponible, sinon apple-touch-icon, etc.
const urlIcone = getBestIconUrl('https://browserux.com/commons/logos/website.png');
```

### Cas d'usage

Cette fonction est utilisée en interne lors du rendu de la section copie-dans-le-presse-papiers de la modale de fallback. Elle choisit l'icône de la meilleure qualité disponible dans le document plutôt qu'un placeholder générique.

Si votre page n'a pas d'éléments `<link rel="icon">`, le `fallbackUrl` est retourné. Vous pouvez appeler cette fonction vous-même si vous souhaitez afficher l'icône détectée ailleurs dans votre interface.
