# Contribuer

Les contributions sont les bienvenues. Que vous souhaitiez signaler un bug, suggérer une amélioration, ajouter une plateforme ou corriger une faute de frappe, n'hésitez pas à participer.

---

## Signaler un problème

Ouvrez une issue sur le dépôt GitHub pour :

- Signaler un bug ou un comportement inattendu.
- Suggérer une amélioration ou une nouvelle fonctionnalité.
- Discuter d'une idée avant de soumettre une pull request.

Lors du signalement d'un bug, précisez :

- Votre navigateur et sa version
- Votre version de Node.js (`node -v`) si applicable
- Le framework ou l'environnement utilisé (React, Vue, HTML vanilla, etc.)
- Si vous utilisez le chemin API Web Share native ou la modale de fallback
- Le message d'erreur et la sortie console si applicable
- Une reproduction minimale (CodePen, StackBlitz ou un fichier HTML minimal)

---

## Soumettre une pull request

1. Forkez le dépôt.
2. Créez une branche dédiée :

```bash
git checkout -b ma-proposition
```

3. Effectuez vos modifications.
4. Exécutez la suite de tests :

```bash
npm test
```

5. Compilez le package pour vérifier la sortie :

```bash
npm run build
```

6. Committez avec un message clair :

```bash
git commit -m "Fix: description de la modification"
```

7. Poussez la branche et ouvrez une pull request sur GitHub.

---

## Exécuter en local

```bash
# Installer les dépendances
npm install

# Exécuter les tests unitaires
npm test

# Exécuter les tests en mode watch
npm run test:watch

# Compiler tous les formats de sortie (ESM, UMD, minifié, .d.ts)
npm run build
```

---

## Bonnes pratiques

- Restez fidèle au périmètre focalisé du composant : un bouton de partage avec support API native et modale de fallback.
- Ne modifiez que ce qui est nécessaire. Les changements ciblés sont plus faciles à relire.
- Ajoutez ou mettez à jour les tests pour tout comportement que vous modifiez. La suite de tests utilise Vitest avec happy-dom.
- Testez dans au moins Chrome et Safari, le comportement de l'API Web Share diffère significativement entre eux.
- Vérifiez que la navigation au clavier (Tab, Échap, restauration du focus) fonctionne toujours après tout changement de la modale.
- Assurez-vous que le mode `no-shadow` continue de fonctionner après tout changement de template ou de cycle de vie.
- Pour ajouter une nouvelle langue intégrée, ajoutez l'ensemble complet des labels à `I18N_LABELS` dans le fichier du composant.
- Consultez le [changelog](../../CHANGELOG.md) pour comprendre l'historique des décisions.

---

## Structure du projet

```
├── dist/                       sortie compilée (générée par rollup)
│   ├── browserux-share-button.esm.js
│   ├── browserux-share-button.umd.js
│   ├── browserux-share-button.min.js
│   └── browserux-share-button.d.ts
├── src/
│   ├── index.ts                point d'entrée du package (ré-exports)
│   ├── define.ts               helper defineBrowseruxComponents()
│   ├── components/
│   │   ├── browserux-share-button.ts    Web Component principal
│   │   └── browserux-share-button.test.ts  tests unitaires
│   ├── utils/
│   │   ├── icons.ts            getBestIconUrl()
│   │   └── share-icons.ts      map SHARE_ICONS, getShareIcon()
│   └── types/
│       ├── index.ts            ré-exports des types
│       ├── share.types.ts      SharePlatform, ShareIconKey, CustomPlatformConfig, ShareData
│       └── i18n.types.ts       LangKeys
├── docs/                       documentation en anglais
├── fr/docs/                    documentation en français
├── rollup.config.mjs
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

---

## Remerciements

`browserux-share-button` est construit avec :

- [Rollup](https://rollupjs.org/), bundler de modules
- [TypeScript](https://www.typescriptlang.org/), langage typé et compilateur
- [Vitest](https://vitest.dev/), framework de tests unitaires
- Le standard [Web Components](https://developer.mozilla.org/fr/docs/Web/API/Web_components), Custom Elements et Shadow DOM
- L'[API Web Share](https://developer.mozilla.org/fr/docs/Web/API/Web_Share_API), intégration du partage natif
