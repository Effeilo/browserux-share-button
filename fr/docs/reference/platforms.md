# Plateformes

`browserux-share-button` inclut 8 plateformes de partage intégrées qui apparaissent dans la modale de fallback. Chacune peut être désactivée individuellement. Vous pouvez également enregistrer des plateformes personnalisées via l'API statique.

---

## Plateformes intégrées

| Plateforme | Attribut | Format d'URL de partage | Notes |
|---|---|---|---|
| Email | `email` | `mailto:?subject=...&body=...` | Utilise le titre comme sujet, texte + url comme corps |
| X (Twitter) | `x` | `https://x.com/intent/tweet?text=...` | Utilise texte + url |
| Facebook | `facebook` | `https://www.facebook.com/sharer/sharer.php?u=...` | URL uniquement |
| WhatsApp | `whatsapp` | `https://api.whatsapp.com/send?text=...` | Utilise texte + url |
| SMS | `sms` | `sms:?body=...` | Mobile uniquement, masqué sur desktop |
| LinkedIn | `linkedin` | `https://www.linkedin.com/sharing/share-offsite/?url=...` | URL uniquement |
| Telegram | `telegram` | `https://t.me/share/url?url=...&text=...` | Utilise url + texte |
| Reddit | `reddit` | `https://www.reddit.com/submit?url=...&title=...` | Utilise url + titre |

Tous les liens de plateformes s'ouvrent dans un nouvel onglet (`target="_blank"`).

---

## Désactiver les plateformes intégrées

Définissez n'importe quel attribut de plateforme sur `"false"` pour le supprimer de la modale de fallback :

```html
<browserux-share-button
  facebook="false"
  reddit="false"
></browserux-share-button>
```

Plusieurs plateformes peuvent être désactivées dans la même balise. L'ordre des plateformes restantes dans la modale suit l'ordre intégré : email → x → facebook → whatsapp → sms → linkedin → telegram → reddit.

---

## Visibilité du SMS

La plateforme SMS est spéciale : elle est masquée sur les appareils desktop (où `window.matchMedia('(pointer: coarse)')` retourne `false`) même si elle n'est pas explicitement désactivée. Sur les appareils tactiles (mobile, tablette), elle apparaît normalement.

Pour masquer SMS sur tous les appareils :

```html
<browserux-share-button sms="false"></browserux-share-button>
```

---

## Registre de plateformes personnalisées

Des plateformes de partage supplémentaires peuvent être enregistrées globalement via `ShareButton.registerPlatform()`. Les plateformes enregistrées apparaissent dans la modale de fallback de chaque instance de `<browserux-share-button>` sur la page.

### Enregistrer une plateforme

```js
import { ShareButton } from 'browserux-share-button';

ShareButton.registerPlatform('mastodon', {
  label: 'Mastodon',
  icon: 'https://example.com/icons/mastodon.png',
  getHref: (title, text, url) =>
    `https://mastodon.social/share?text=${encodeURIComponent(text + ' ' + url)}`,
});
```

### Interface `CustomPlatformConfig`

```ts
interface CustomPlatformConfig {
  /** Label affiché sous l'icône dans la modale de fallback */
  label: string;
  /** URL de l'icône de la plateforme, 48×48px recommandé */
  icon: string;
  /** Retourne l'URL de partage pour cette plateforme selon les données actuelles */
  getHref: (title: string, text: string, url: string) => string;
}
```

### Autres exemples

```js
ShareButton.registerPlatform('bluesky', {
  label: 'Bluesky',
  icon: 'https://example.com/icons/bluesky.png',
  getHref: (_title, text, url) =>
    `https://bsky.app/intent/compose?text=${encodeURIComponent(text + ' ' + url)}`,
});

ShareButton.registerPlatform('threads', {
  label: 'Threads',
  icon: 'https://example.com/icons/threads.png',
  getHref: (_title, text, url) =>
    `https://www.threads.net/intent/post?text=${encodeURIComponent(text + ' ' + url)}`,
});

ShareButton.registerPlatform('pinterest', {
  label: 'Pinterest',
  icon: 'https://example.com/icons/pinterest.png',
  getHref: (_title, _text, url) =>
    `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`,
});
```

### Désactiver une plateforme personnalisée par instance

Les plateformes personnalisées respectent la même convention `key="false"` que les plateformes intégrées. Utilisez la clé d'enregistrement comme nom d'attribut :

```html
<!-- Mastodon a été enregistré globalement, mais désactivé sur cette instance -->
<browserux-share-button mastodon="false"></browserux-share-button>
```

### Ordre d'enregistrement

Les plateformes personnalisées apparaissent dans la modale **après** toutes les plateformes intégrées, dans l'ordre où elles ont été enregistrées.

---

## Icônes des plateformes

Les icônes des plateformes intégrées sont hébergées sur le CDN browserux.com et chargées à l'exécution via leurs URLs. Elles sont affichées à 48×48px dans des éléments `<img>` circulaires dans la modale de fallback.

Pour les plateformes personnalisées, fournissez une URL d'icône accessible publiquement. Une icône carrée à 48×48px ou en résolution supérieure est recommandée.
