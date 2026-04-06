# Événements

`browserux-share-button` dispatche des événements personnalisés pour chaque action significative. Tous les événements remontent (bubble) et sont composés (ils traversent les frontières Shadow DOM).

---

## Vue d'ensemble des événements

| Événement | Quand | Détail |
|---|---|---|
| `bux:share-success` | Partage natif terminé | `{ title, text, url }` |
| `bux:share-abort` | L'utilisateur a annulé la boîte de dialogue native | aucun |
| `bux:share-error` | Échec inattendu du partage natif | `{ error }` |
| `bux:fallback-open` | Modale de fallback ouverte | aucun |
| `bux:fallback-close` | Modale de fallback fermée | aucun |
| `bux:copy-success` | URL copiée dans le presse-papiers | `{ url }` |
| `bux:copy-error` | Écriture presse-papiers échouée | `{ error }` |

Tous les événements ont `bubbles: true` et `composed: true`. Vous pouvez écouter sur l'élément lui-même ou au niveau du `document`.

---

## `bux:share-success`

Déclenché quand `navigator.share()` se termine sans erreur.

```ts
interface ShareSuccessDetail {
  title: string;
  text: string;
  url: string;
}
```

```js
el.addEventListener('bux:share-success', (e) => {
  console.log('Partagé avec succès :', e.detail.url);
});
```

---

## `bux:share-abort`

Déclenché quand l'utilisateur ferme la boîte de dialogue de partage native sans terminer le partage. Correspond à `navigator.share()` rejetant avec une `AbortError`.

Pas de payload. La modale de fallback ne s'ouvre **pas** dans ce cas.

```js
el.addEventListener('bux:share-abort', () => {
  console.log('L\'utilisateur a annulé le partage');
});
```

---

## `bux:share-error`

Déclenché quand `navigator.share()` rejette avec une erreur inattendue (pas une `AbortError`). La modale de fallback s'ouvre automatiquement après cet événement.

```ts
interface ShareErrorDetail {
  error: unknown;
}
```

```js
el.addEventListener('bux:share-error', (e) => {
  console.error('Partage échoué :', e.detail.error);
});
```

---

## `bux:fallback-open`

Déclenché quand la modale de fallback devient visible. Utile pour les analytics ou pour mettre en pause les interactions en arrière-plan.

```js
el.addEventListener('bux:fallback-open', () => {
  console.log('Modale de fallback ouverte');
});
```

---

## `bux:fallback-close`

Déclenché quand la modale de fallback est fermée, via la touche Échap, le clic sur le fond, le glissement vers le bas, ou `closeFallback()`.

```js
el.addEventListener('bux:fallback-close', () => {
  console.log('Modale de fallback fermée');
});
```

---

## `bux:copy-success`

Déclenché quand l'URL est écrite avec succès dans le presse-papiers via le bouton de copie de la modale de fallback.

```ts
interface CopySuccessDetail {
  url: string;
}
```

```js
el.addEventListener('bux:copy-success', (e) => {
  console.log('Lien copié :', e.detail.url);
});
```

---

## `bux:copy-error`

Déclenché quand l'écriture dans le presse-papiers échoue (par ex. l'utilisateur a refusé la permission).

```ts
interface CopyErrorDetail {
  error: unknown;
}
```

```js
el.addEventListener('bux:copy-error', (e) => {
  console.error('Copie échouée :', e.detail.error);
});
```

---

## Écouter au niveau du document

Comme tous les événements remontent, vous pouvez écouter sur le document pour un gestionnaire global :

```js
document.addEventListener('bux:share-success', (e) => {
  analytics.track('share', { url: e.detail.url });
});

document.addEventListener('bux:copy-success', (e) => {
  analytics.track('copy_link', { url: e.detail.url });
});
```

---

## Cas d'usage

### Tracking analytics

```js
const el = document.querySelector('browserux-share-button');

el.addEventListener('bux:share-success', (e) => {
  analytics.track('native_share', e.detail);
});

el.addEventListener('bux:copy-success', (e) => {
  analytics.track('copy_link', { url: e.detail.url });
});

el.addEventListener('bux:share-abort', () => {
  analytics.track('share_annulé');
});
```

### Afficher une notification toast

```js
el.addEventListener('bux:copy-success', () => {
  afficherToast('Lien copié dans le presse-papiers !');
});
```

### Désactiver les interactions de page pendant que la modale est ouverte

```js
el.addEventListener('bux:fallback-open', () => {
  document.body.style.overflow = 'hidden';
});

el.addEventListener('bux:fallback-close', () => {
  document.body.style.overflow = '';
});
```
