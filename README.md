# Albert CSS

[![Netlify Status](https://api.netlify.com/api/v1/badges/4e17f08b-ce92-4cc3-b05e-1d3848477e12/deploy-status)](https://app.netlify.com/sites/nifty-turing-6bafb1/deploys)

A personal CSS framework built loosely on Bootstrap v4. Covers common layout, component, and utility needs with a small vanilla JavaScript layer for interactive behaviour. Dark mode is supported out of the box via `prefers-color-scheme`, with a manual override option.

**[Live demo and documentation](https://www.craigmcn.com/albertcss/)**

## What's included

**Components** — alerts, buttons, cards, forms, navigation, images, icons, lists

**Layouts** — header (fixed/scrolling), main content area, sections, toolbar

**Utilities** — flexbox grid (12-unit, responsive), spacing (margin/padding), text (colour, size, weight, transform)

**JavaScript** — alert dismissal, responsive menu toggle, scroll-aware header, form validation via [Formbouncer](https://github.com/cferdinandi/bouncer)

## Usage

Include the compiled CSS and JS in your project:

```html
<link rel="stylesheet" href="https://craigmcn.github.io/albertcss/v0.13.0/css/albert.min.css">
<script src="https://craigmcn.github.io/albertcss/v0.13.0/js/albert.min.js" defer></script>
```

Replace `v0.13.0` with whichever version you want to pin to. Versioned releases are hosted on GitHub Pages and older versions remain available indefinitely.

## Development

**Requirements:** Node v18 (see `.nvmrc`), Yarn v3

```bash
yarn install       # Install dependencies
yarn serve         # Dev server with live reload at http://localhost:3020
yarn build         # Production build → ./dist/
yarn lint <file-or-glob>  # Lint JavaScript
```

See [CLAUDE.md](CLAUDE.md) for full architecture and build system details.

## Releasing

Push a `v*` tag to trigger an automated GitHub Actions build and deploy to GitHub Pages:

```bash
git tag v0.14.0
git push origin v0.14.0
```

## License

[GPL-3.0-or-later](LICENSE)
