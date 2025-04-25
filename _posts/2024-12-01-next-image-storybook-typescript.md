---
layout: post
title: "Comprendre l’utilisation du module next-image avec Storybook & TypeScript"
date: 2024-12-01 10:00:00 +0100
excerpt: "Découvrez comment utiliser le composant next/image dans Storybook avec TypeScript, en configurant Storybook pour afficher correctement les images Next.js."
image: /assets/img/ingenieur-pontage-pipeline.webp
categories:
  - Fiche technique
tags:
  - next-image
  - storybook
  - typescript
author: "Lionel Zovi"
---

# Utilisation du composant `next/image` avec Storybook et TypeScript 📕🛠️📘

![Un ingénieur travaillant sur le pontage de pipeline en extérieur, pixel art](/assets/img/ingenieur-pontage-pipeline.webp)

## Problématique 🚨

Lorsque j’ai débuté un projet Next.js avec TypeScript et Storybook, j’ai très vite été confronté à un souci très embêtant :  
Storybook ne trouvait pas les images importées depuis le dossier `public/images`, car il ne passe pas par le build Next.js lors de son propre processus de build.  
Vous obtenez donc un composant dépourvu d’image dans votre story ou une erreur de compilation lors du lancement de Storybook.

Ce petit désagrément m’a finalement pris la journée entière pour trouver une solution !

## Bootstrapping 🚀

Au démarrage, votre configuration Storybook ressemble à ceci :

### `main.ts` (./storybook/main.ts)

```ts
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  typescript: {
    check: false,
    checkOptions: {},
    skipCompiler: false,
  },
};
export default config;
```

### `preview.ts` (./storybook/preview.ts)

```ts
import type { Preview } from "@storybook/react";
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

En l’état, Storybook ne saura pas où chercher vos images Next.js, ce qui génère les erreurs mentionnées ci-dessus.

> **… Comment fait-on alors ?** 🤔💭

## Override de `next/image` pour Storybook 🎯

### 1. Mettre à jour `main.ts`

Ajoutez la configuration `staticDirs` pour indiquer à Storybook où trouver les fichiers statiques :

```ts
import type { StorybookConfig } from "@storybook/nextjs";
import * as path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: path.resolve(__dirname, "../next.config.js"),
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
  // Spécifie le dossier d'images statiques
  staticDirs: [{ from: path.resolve(__dirname, '../public/images'), to: '/images' }],
  typescript: {
    check: false,
    checkOptions: {},
    skipCompiler: false,
  },
};

export default config;
```

### 2. Adapter `preview.ts`

On remplace temporairement `next/image` par la balise native `<img>` dans Storybook :

```ts
import React from 'react';
import type { Preview } from "@storybook/react";
import '../src/app/globals.css';
import * as nextImage from 'next/image';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
};

if (Object.getOwnPropertyDescriptor(nextImage, 'default')?.configurable) {
  Object.defineProperty(nextImage, 'default', {
    configurable: true,
    value: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
      React.createElement('img', props),
  });
}

export default preview;
```

Ce code **override** le composant `next/image` pour qu’il rende une balise `<img>` basique, compatible avec l’environnement de Storybook.

## Application dans vos stories 🧩📕🪄

Dans vos fichiers `*.stories.tsx`, utilisez désormais le chemin `/images` pour référencer vos images :

```ts
import { Meta, StoryObj } from '@storybook/react';
import Logo from '../components/Logo/Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Main: Story = {
  args: {
    src: '/images/Logo.webp', // <-- Chemin adapté
    alt: 'Logo Dietetic',
    width: 75,
    height: 75,
  },
};
