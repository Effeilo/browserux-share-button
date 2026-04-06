# Attributs

Toute la configuration se fait via des attributs HTML définis sur `<browserux-share-button>`. Aucun JavaScript n'est requis pour un usage standard.

```html
<browserux-share-button
  url="https://example.com/article"
  title="Mon article"
  text="Une courte description"
  lang="fr"
  manifest-src="/manifest.webmanifest"
  facebook="false"
  sms="false"
  no-shadow
></browserux-share-button>
```

---

## Référence rapide

| Attribut | Type | Défaut | Description |
|---|---|---|---|
| `url` | `string` | `location.href` | URL à partager |
| `title` | `string` | `document.title` | Titre de partage |
| `text` | `string` | `<meta description>` | Description de partage |
| `lang` | `string` | `<html lang>` ou `'en'` | Langue pour les labels |
| `manifest-src` | `string` | `<link rel="manifest">` | Chemin personnalisé vers le manifest |
| `no-shadow` | booléen | absent | Désactiver le Shadow DOM |
| `email` | `"false"` | activé | Désactiver la plateforme email |
| `x` | `"false"` | activé | Désactiver la plateforme X (Twitter) |
| `facebook` | `"false"` | activé | Désactiver la plateforme Facebook |
| `whatsapp` | `"false"` | activé | Désactiver la plateforme WhatsApp |
| `sms` | `"false"` | mobile uniquement | Désactiver la plateforme SMS |
| `linkedin` | `"false"` | activé | Désactiver la plateforme LinkedIn |
| `telegram` | `"false"` | activé | Désactiver la plateforme Telegram |
| `reddit` | `"false"` | activé | Désactiver la plateforme Reddit |

---

## `url`

**Type :** `string` - **Défaut :** `location.href`

L'URL à partager. Si non fournie, l'URL de la page actuelle est utilisée.

```html
<browserux-share-button url="https://example.com/article/123"></browserux-share-button>
```

Peut aussi être mise à jour à l'exécution via l'API programmatique :

```js
el.setShareData({ url: 'https://example.com/nouvelle-page' });
```

---

## `title`

**Type :** `string` - **Défaut :** `document.title` → `name` du manifest → `"Untitled"`

Le titre passé à `navigator.share()` et utilisé comme en-tête dans la section copie-dans-le-presse-papiers de la modale de fallback.

```html
<browserux-share-button title="Lisez mon article sur CSS Grid"></browserux-share-button>
```

Si non défini, le composant essaie `document.title`, puis le champ `name` du Web App Manifest. Si tout échoue, il utilise `"Untitled"` par défaut.

---

## `text`

**Type :** `string` - **Défaut :** `<meta name="description">` → `description` du manifest → `""`

La description passée à `navigator.share()`. Utilisée dans les URLs de partage SMS, WhatsApp, Telegram et X.

```html
<browserux-share-button text="Un guide approfondi sur la mise en page CSS Grid"></browserux-share-button>
```

Si non défini, le composant lit `<meta name="description">`, puis le champ `description` du manifest.

---

## `lang`

**Type :** `string` - **Défaut :** `document.documentElement.lang` ou `'en'`

Définit la langue utilisée pour tous les labels intégrés : le texte du bouton, l'en-tête de la modale, le message de confirmation de copie et les messages d'erreur.

```html
<browserux-share-button lang="fr"></browserux-share-button>
```

Codes de langue supportés :

| Code | Langue |
|---|---|
| `en` | Anglais (défaut) |
| `fr` | Français |
| `es` | Espagnol |
| `de` | Allemand |
| `ja` | Japonais |
| `ru` | Russe |
| `pt` | Portugais |
| `it` | Italien |
| `nl` | Néerlandais |
| `zh` | Chinois |
| `ko` | Coréen |
| `ar` | Arabe |

Si un code non supporté est fourni, le composant retombe sur l'anglais.

---

## `manifest-src`

**Type :** `string` - **Défaut :** résolu depuis `<link rel="manifest">`

Spécifie un chemin personnalisé vers le Web App Manifest. Utilisé quand le manifest n'est pas lié via une balise `<link rel="manifest">` standard, ou quand vous souhaitez un manifest différent de celui dans la balise head du document.

```html
<browserux-share-button manifest-src="/mon-manifest-custom.json"></browserux-share-button>
```

Le manifest est récupéré pendant `connectedCallback`. Si la récupération échoue, le composant retombe sur `document.title` et `<meta name="description">`.

---

## `no-shadow`

**Type :** booléen (présence/absence) - **Défaut :** absent (Shadow DOM utilisé)

Quand présent, désactive l'encapsulation Shadow DOM. Le template du composant est injecté dans le light DOM de l'élément.

```html
<browserux-share-button no-shadow></browserux-share-button>
```

La modale de fallback est toujours ajoutée à `<body>` quel que soit cet attribut.

> Cet attribut est lu une seule fois dans `connectedCallback`. Le modifier après la connexion n'a aucun effet.

---

## Désactivation des plateformes

Chaque plateforme intégrée peut être individuellement désactivée en définissant son attribut correspondant sur `"false"`.

```html
<browserux-share-button
  facebook="false"
  reddit="false"
  sms="false"
></browserux-share-button>
```

| Attribut | Plateforme | Notes |
|---|---|---|
| `email="false"` | Email | Désactivé dans tous les contextes |
| `x="false"` | X (Twitter) | Désactivé dans tous les contextes |
| `facebook="false"` | Facebook | Désactivé dans tous les contextes |
| `whatsapp="false"` | WhatsApp | Désactivé dans tous les contextes |
| `sms="false"` | SMS / Messages | Affiché uniquement sur mobile par défaut |
| `linkedin="false"` | LinkedIn | Désactivé dans tous les contextes |
| `telegram="false"` | Telegram | Désactivé dans tous les contextes |
| `reddit="false"` | Reddit | Désactivé dans tous les contextes |

Les plateformes personnalisées enregistrées via `ShareButton.registerPlatform()` peuvent aussi être désactivées avec la même convention `key="false"`. Voir [Plateformes](platforms.md).
