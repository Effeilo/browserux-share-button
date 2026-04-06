# Personnalisation

`browserux-share-button` expose des propriétés CSS personnalisées pour le bouton de partage principal et la modale de fallback. Toutes les propriétés peuvent être définies via l'attribut `style` ou une règle CSS ciblant le composant.

---

## Propriétés CSS du bouton de partage

Le bouton de partage principal est contrôlé par ces propriétés personnalisées :

| Propriété | Défaut | Description |
|---|---|---|
| `--bux-share-btn-bg` | `#eaeaea` | Couleur de fond du bouton |
| `--bux-share-btn-color` | `#121212` | Couleur du texte et de l'icône |
| `--bux-share-btn-font-size` | `2rem` | Taille de police du label |
| `--bux-share-btn-height` | `4.2rem` | Hauteur du bouton |
| `--bux-share-btn-padding-inline` | `1.5rem` | Padding horizontal |
| `--bux-share-btn-border-radius` | `0.5rem` | Rayon de bordure |
| `--bux-share-btn-gap` | `0.5rem` | Espacement entre icône et label |
| `--bux-share-btn-hover-bg` | `#121212` | Couleur de fond au survol |
| `--bux-share-btn-hover-color` | `#eaeaea` | Couleur du texte au survol |

### Via l'attribut `style`

```html
<browserux-share-button
  style="
    --bux-share-btn-bg: #0066cc;
    --bux-share-btn-color: #ffffff;
    --bux-share-btn-hover-bg: #004499;
    --bux-share-btn-hover-color: #ffffff;
    --bux-share-btn-border-radius: 2rem;
  "
></browserux-share-button>
```

### Via une règle CSS

```css
browserux-share-button {
  --bux-share-btn-bg: #0066cc;
  --bux-share-btn-color: #ffffff;
  --bux-share-btn-height: 3rem;
  --bux-share-btn-border-radius: 2rem;
}
```

> Les propriétés CSS personnalisées définies via l'attribut `style` sont automatiquement transférées dans le Shadow DOM par la méthode `applyInlineCSSVars()` du composant. Les deux approches fonctionnent de manière identique que le Shadow DOM soit activé ou non.

---

## Propriétés CSS de la modale de fallback

La modale de fallback injecte sa propre balise `<style>` dans `<head>` une seule fois, lors de la première ouverture. Ces propriétés personnalisées contrôlent son apparence :

| Propriété | Défaut | Description |
|---|---|---|
| `--bux-share-fallback-bg` | `#251f17` | Couleur de fond du panneau modal |
| `--bux-share-fallback-color` | `#ede0d4` | Couleur du texte de la modale |
| `--bux-share-fallback-border-radius` | `2rem` | Rayon de bordure du panneau modal |
| `--bux-share-fallback-title-font-size` | `2.2rem` | Taille de police du titre |
| `--bux-share-fallback-copy-box-bg` | `#302921` | Fond de la boîte de copie de lien |

Définissez ces propriétés sur `:root` pour surcharger les valeurs par défaut :

```css
:root {
  --bux-share-fallback-bg: #1a1a2e;
  --bux-share-fallback-color: #e0e0ff;
  --bux-share-fallback-border-radius: 1rem;
  --bux-share-fallback-copy-box-bg: #16213e;
}
```

---

## Personnaliser l'icône du bouton

Le bouton affiche un emoji 🔗 par défaut. Remplacez-le en utilisant le slot `icon` :

```html
<!-- Emoji personnalisé -->
<browserux-share-button>
  <span slot="icon">📤</span>
</browserux-share-button>

<!-- Icône SVG -->
<browserux-share-button>
  <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <!-- votre chemin SVG -->
  </svg>
</browserux-share-button>

<!-- Image -->
<browserux-share-button>
  <img slot="icon" src="/icons/share.svg" alt="" width="20" height="20">
</browserux-share-button>
```

Voir [Slots](../reference/slots.md) pour tous les détails.

---

## Masquer le label du bouton

Le label du bouton est une chaîne "Partager" localisée rendue dans un `<span>`. Pour afficher uniquement l'icône, masquez le label via CSS :

```css
browserux-share-button::part(label) {
  display: none;
}
```

Ou avec `no-shadow`, ciblez-le directement :

```css
browserux-share-button #label-placeholder {
  display: none;
}
```

---

## Adapter à votre thème

Comme les propriétés de la modale sont sur `:root`, vous pouvez les surcharger par thème avec `[data-theme]` (compatible avec `browserux-theme-switcher`) :

```css
[data-theme="light"] {
  --bux-share-fallback-bg: #ffffff;
  --bux-share-fallback-color: #111111;
  --bux-share-fallback-copy-box-bg: #f0f0f0;
}

[data-theme="dark"] {
  --bux-share-fallback-bg: #1a1a1a;
  --bux-share-fallback-color: #f0f0f0;
  --bux-share-fallback-copy-box-bg: #2a2a2a;
}
```
