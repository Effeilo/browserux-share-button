# Slots

`browserux-share-button` expose un slot nommé pour personnaliser l'icône affichée à l'intérieur du bouton de partage principal.

---

## `icon`

**Position :** Côté gauche du label du bouton  
**Défaut :** 🔗

L'icône affichée à l'intérieur du bouton de partage, à gauche du texte du label.

```
[ icône ] [ Partager ]
    🔗
```

---

## Exemples

### Par défaut (sans slot)

```html
<!-- Affiche : 🔗 Partager -->
<browserux-share-button lang="fr"></browserux-share-button>
```

### Emoji personnalisé

```html
<browserux-share-button>
  <span slot="icon">📤</span>
</browserux-share-button>
```

### Icône SVG

```html
<browserux-share-button>
  <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7..."/>
  </svg>
</browserux-share-button>
```

### Image

```html
<browserux-share-button>
  <img slot="icon" src="/icons/share.svg" alt="" width="20" height="20">
</browserux-share-button>
```

---

## Bouton icône uniquement

Pour afficher uniquement l'icône sans le label, masquez le label via CSS :

```css
/* Avec Shadow DOM (défaut) */
browserux-share-button::part(label) {
  display: none;
}

/* Avec no-shadow */
browserux-share-button #label-placeholder {
  display: none;
}
```

---

## Shadow DOM et slots

Les slots sont une fonctionnalité du Shadow DOM. Quand `no-shadow` est utilisé, le template du composant est rendu dans le light DOM et l'élément `<slot name="icon">` peut ne pas fonctionner comme attendu dans tous les navigateurs.

Si vous utilisez `no-shadow`, préférez définir l'icône via CSS ou en ciblant directement l'élément `#bux-share-btn` rendu.

---

## Accessibilité

Le contenu du slot est à l'intérieur du bouton de partage (`<button>`). Les lecteurs d'écran annoncent le nom accessible du bouton depuis son contenu textuel, qui inclut à la fois l'icône du slot et le span du label.

Pour les icônes SVG, utilisez `aria-hidden="true"` pour éviter que les lecteurs d'écran n'annoncent le balisage SVG brut :

```html
<browserux-share-button>
  <svg slot="icon" aria-hidden="true" width="20" height="20"><!-- ... --></svg>
</browserux-share-button>
```

Pour les icônes image, utilisez `alt=""` pour les marquer comme décoratives :

```html
<browserux-share-button>
  <img slot="icon" src="/icons/share.svg" alt="" width="20" height="20">
</browserux-share-button>
```
