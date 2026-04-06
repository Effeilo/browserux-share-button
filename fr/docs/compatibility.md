# Compatibilité

---

## Prérequis d'environnement

| Environnement | Version minimale | Raison |
|---|---|---|
| Node.js | 18+ | Requis pour les projets basés sur npm |
| Navigateur | Voir tableau ci-dessous | Custom Elements v1, Shadow DOM, Clipboard API |

---

## Support navigateur

`browserux-share-button` utilise les APIs Web Components standards (Custom Elements v1, Shadow DOM v1) et des APIs navigateur optionnelles (API Web Share, Clipboard API) avec des fallbacks intégrés.

| Fonctionnalité | Chrome | Firefox | Safari | Edge |
|---|---|---|---|---|
| Custom Elements v1 | 67+ | 63+ | 10.1+ | 79+ |
| Shadow DOM v1 | 53+ | 63+ | 10+ | 79+ |
| API Web Share | 89+ (desktop 120+) | Non supporté | 12.1+ | 93+ |
| Clipboard API | 66+ | 63+ | 13.1+ | 79+ |
| `prefers-color-scheme` | 76+ | 67+ | 12.1+ | 79+ |

### Notes sur l'API Web Share

- L'API Web Share est le plus largement supportée sur les **navigateurs mobiles** (iOS Safari, Android Chrome).
- Sur **desktop**, le support varie : Chrome 120+ la supporte sur Windows/macOS, mais Firefox ne la supporte pas du tout.
- Quand l'API n'est pas disponible, le composant bascule automatiquement vers la modale, sans aucune configuration.

### Notes sur la Clipboard API

- La Clipboard API (`navigator.clipboard.writeText`) nécessite un contexte sécurisé (HTTPS ou `localhost`).
- Sur les navigateurs sans support Clipboard API, le bouton de copie dans la modale de fallback dispatchera `bux:copy-error`.

---

## Compatibilité frameworks

| Framework | Statut | Notes |
|---|---|---|
| HTML vanilla | Supporté | `<script type="module">` direct ou CDN |
| React 17+ | Supporté | Importer dans les composants client uniquement |
| Next.js 13+ | Supporté | Utiliser `'use client'` ou import dynamique avec `ssr: false` |
| Vue 3 | Supporté | Ajouter à `isCustomElement` dans la config Vite pour éviter les avertissements |
| Nuxt 3 | Supporté | Utiliser `<ClientOnly>` ou garder avec `process.client` |
| Angular 14+ | Supporté | Ajouter `CUSTOM_ELEMENTS_SCHEMA` au module |
| Svelte | Supporté | Importer le package dans le script du composant |
| SvelteKit | Supporté | Importer uniquement dans le contexte client |

Voir [Utilisation avec les frameworks](guide/framework-usage.md) pour les détails d'implémentation.

---

## Formats de build disponibles

Le package embarque trois bundles pré-compilés :

| Fichier | Format | Cas d'usage |
|---|---|---|
| `browserux-share-button.esm.js` | ES Module | Projets avec bundler (Vite, Webpack, Rollup) |
| `browserux-share-button.umd.js` | UMD | Balises script legacy, environnements CommonJS |
| `browserux-share-button.min.js` | UMD minifié | Usage CDN, production sans bundler |
| `browserux-share-button.d.ts` | TypeScript | Projets avec vérification de types |

Le bundle ESM est l'export par défaut (champ `"module"` dans `package.json`).

---

## Dépendances

`browserux-share-button` n'a aucune dépendance à l'exécution. Le package est un Web Component autonome compilé depuis TypeScript avec Rollup.

Dépendances de compilation :

| Package | Rôle |
|---|---|
| [rollup](https://rollupjs.org/) | Bundler de modules |
| [typescript](https://www.typescriptlang.org/) | Compilateur TypeScript |
| [@rollup/plugin-typescript](https://github.com/rollup/plugins) | Plugin TypeScript pour Rollup |
| [@rollup/plugin-node-resolve](https://github.com/rollup/plugins) | Résolution des modules Node |
| [@rollup/plugin-terser](https://github.com/rollup/plugins) | Minification |
| [rollup-plugin-dts](https://github.com/Swatinem/rollup-plugin-dts) | Bundling des déclarations TypeScript |
| [vitest](https://vitest.dev/) | Framework de tests unitaires |
| [happy-dom](https://github.com/capricorn86/happy-dom) | Environnement DOM pour les tests |
