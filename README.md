# al-folio (Lionel Zovi’s Personal Portfolio)

<div align="center">

[![Live demo](https://escanor1986.github.io/al-folio/)](https://escanor1986.github.io/al-folio/)

**A simple, clean, responsive [Jekyll](https://jekyllrb.com/) theme for academics, customized for Lionel Zovi.**

---

[![Deploy to GitHub Pages](https://github.com/Escanor1986/al-folio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Escanor1986/al-folio/actions/workflows/deploy.yml)  
[![GitHub stars](https://img.shields.io/github/stars/Escanor1986/al-folio.svg)](https://github.com/Escanor1986/al-folio/stargazers)  
[![GitHub forks](https://img.shields.io/github/forks/Escanor1986/al-folio.svg)](https://github.com/Escanor1986/al-folio/network)  
[![License: MIT](https://img.shields.io/github/license/alshedivat/al-folio.svg)](LICENSE)

</div>

---

## Table of Contents

- [al-folio (Lionel Zovi’s Personal Portfolio)](#al-folio-lionel-zovis-personal-portfolio)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
  - [Installation \& Deployment](#installation--deployment)
    - [Prerequisites](#prerequisites)
    - [Local preview](#local-preview)
    - [GitHub Pages](#github-pages)
  - [Customization](#customization)
  - [Features](#features)
  - [Lighthouse PageSpeed Insights](#lighthouse-pagespeed-insights)
    - [Desktop](#desktop)
    - [Mobile](#mobile)
  - [Troubleshooting](#troubleshooting)
    - [Removed obsolete converters](#removed-obsolete-converters)
    - [Prettier \& Liquid plugin](#prettier--liquid-plugin)
    - [Unknown tag `toc`](#unknown-tag-toc)
  - [FAQ](#faq)
  - [Contributing](#contributing)
  - [License](#license)

---

## Introduction

This repository is a customized fork of **al-folio**, adapted for **Lionel Zovi**’s personal academic portfolio:

- ✅ Personal **About** page with photo, contact info, CV download  
- ✅ Interactive **CV** generated from YAML or JSON  
- ✅ **Publications** from BibTeX  
- ✅ **Projects**, **News**, **Blog** sections  
- 🎨 Light & Dark mode, theme color presets  
- ⚙️ CI checks: Prettier, broken-link checks, optional Axe accessibility

---

## Getting Started

1. **Fork** or clone this repo:  
   ```bash
   git clone https://github.com/Escanor1986/al-folio.git
   cd al-folio
   ```

2. **Create** a `gh-pages` branch for GitHub Pages deployment (the theme’s default CI action publishes from `gh-pages`):

   ```bash
   git checkout -b gh-pages
   git push --set-upstream origin gh-pages
   ```

3. **Switch** back to `main` for editing:

   ```bash
   git checkout main
   ```

---

## Installation & Deployment

### Prerequisites

- Ruby ≥ 3.2, Bundler  
- Node.js & npm  

### Local preview

```bash
bundle install
npm install
bundle exec jekyll serve
```

Browse [http://localhost:4000](http://localhost:4000).

### GitHub Pages

This repo uses the official `deploy.yml` Action, which:

- Builds the site on `main` changes  
- Publishes the generated `_site/` to the **gh-pages** branch  

Make sure your Pages settings point at the `gh-pages` branch.

---

## Customization

All configuration lives in `_config.yml`.  
Key files/directories:

- `_data/cv.yml` or `assets/json/resume.json` — your CV  
- `_data/repositories.yml` — GitHub repos/users  
- `_bibliography/papers.bib` — publications  
- `_pages/` — About, Teaching, Repositories, CV, People, etc.  
- `_layouts/`, `_includes/`, `_sass/` — theme code  

See [CUSTOMIZE.md](CUSTOMIZE.md) for detailed tips.

---

## Features

- 🌗 **Light & Dark mode** auto-detect + toggle  
- 📄 **CV**: JSONResume fallback to YAML (`_data/cv.yml`)  
- 🧑‍💼 **People** profiles page  
- 📚 **Publications** from BibTeX with buttons (PDF, code, slides…)  
- 📂 **Collections**: News, Projects (and add your own)  
- ✍️ **Distill-style posts**, MathJax, Mermaid, Chart.js, TikZ  
- 📸 **Photos**, 🎥 **Video**, 🔊 **Audio** embeds  
- 📈 **GitHub stats** & trophies on `/repositories/`  
- 🌈 **Theming** via `_sass/_themes.scss`  
- 🐛 **CI checks**: Prettier, lychee (broken links), Axe (manual)  

---

## Lighthouse PageSpeed Insights

### Desktop

[![Google Lighthouse PageSpeed Insights](lighthouse_results/desktop/pagespeed.svg)](https://htmlpreview.github.io/?https://github.com/Escanor1986/al-folio/blob/gh-pages/lighthouse_results/desktop/escanor1986_github_io_al_folio_.html)

Run the test yourself:  
[Google Lighthouse PageSpeed Insights (Desktop)](https://pagespeed.web.dev/report?url=https%3A%2F%2Fescanor1986.github.io%2Fal-folio%2F&form_factor=desktop)

### Mobile

[![Google Lighthouse PageSpeed Insights](lighthouse_results/mobile/pagespeed.svg)](https://htmlpreview.github.io/?https://github.com/Escanor1986/al-folio/blob/gh-pages/lighthouse_results/mobile/escanor1986_github_io_al_folio_.html)

Run the test yourself:  
[Google Lighthouse PageSpeed Insights (Mobile)](https://pagespeed.web.dev/report?url=https%3A%2F%2Fescanor1986.github.io%2Fal-folio%2F&form_factor=mobile)

---

## Troubleshooting

### Removed obsolete converters

We’ve dropped:

- `jekyll-imagemagick`  
- `jekyll-jupyter-notebook`

Make sure your **Gemfile** no longer lists them.  
If you see errors about **“jupyter: No such file”**, remove the plugin and run:

```bash
bundle install
```

### Prettier & Liquid plugin

If `npx prettier --write` errors on
`@shopify/prettier-plugin-liquid`, ensure you’ve run:

```bash
npm install --save-dev prettier @shopify/prettier-plugin-liquid
```

### Unknown tag `toc`

If you remove `jekyll-toc`, delete all `{% toc %}` occurrences or add

```yaml
plugins:
  - jekyll-toc
```

to your `_config.yml`.

---

## FAQ

See [FAQ.md](FAQ.md) for common questions on deployment, custom domains, Plugins, etc.

---

## Contributing

Bug reports and PRs welcome! 🛠️  
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

This project is MIT-licensed. See [LICENSE](LICENSE).

Original **al-folio** theme by alshedivat under MIT.  
This fork maintained by Lionel Zovi.  
