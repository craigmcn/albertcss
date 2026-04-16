# Albert CSS

[![Netlify Status](https://api.netlify.com/api/v1/badges/4e17f08b-ce92-4cc3-b05e-1d3848477e12/deploy-status)](https://app.netlify.com/sites/nifty-turing-6bafb1/deploys)

A personal CSS framework built loosely on Bootstrap v4. Covers common layout, component, and utility needs with a small vanilla JavaScript layer for interactive behaviour. Dark mode is supported out of the box via `prefers-color-scheme`, with a manual override option.

**[Live demo and documentation](https://www.craigmcn.com/albertcss/)**

## What's included

**Components** — accordions, alerts, badges, button groups, buttons, cards, dropdowns, forms, modals, navigation, images, icons, lists, tables, tabs, tooltips, popovers

**Layouts** — header (fixed/scrolling), main content area, sections, toolbar

**Utilities** — aspect ratio, background colours (`bg-*`, `text-bg-*`), borders (per-side, colour, width, radius), display (`d-*`), flex (`flex-*`, `align-items-*`, `justify-content-*`, `gap-*`), grid (12-column CSS grid, `grid-cols-*`, `col-*`), overflow, position (static through fixed, sticky top/bottom), shadows (`shadow-none` → `shadow-xl`), spacing (Bootstrap-compatible `mt-*`/`ps-*` etc., 0–8 scale), text (colour, size, weight, transform), z-index (numeric + semantic scale)

**JavaScript** — accordion/disclosure, alert dismissal, dropdown toggle, modal (focus-trapped), popover, responsive menu toggle, scroll-aware header, tab panel switching, form validation via [Formbouncer](https://github.com/cferdinandi/bouncer)

## Usage

Include the compiled CSS and JS in your project:

```html
<link rel="stylesheet" href="https://www.craigmcn.com/albertcss/css/albert.min.css">
<script src="https://www.craigmcn.com/albertcss/js/albert.min.js" defer></script>
```

The site root always serves the latest published release.

If you want to pin to a specific version instead, use the versioned GitHub Pages URLs:

```html
<link rel="stylesheet" href="https://albertcss.craigmcn.com/vX.Y.Z/css/albert.min.css">
<script src="https://albertcss.craigmcn.com/vX.Y.Z/js/albert.min.js" defer></script>
```

Replace `vX.Y.Z` with the version you want to pin to. Versioned releases are hosted on GitHub Pages and older versions remain available indefinitely.

## Development

**Requirements:** Node v24 (see `.nvmrc`), Yarn v3

```bash
yarn install       # Install dependencies
yarn serve         # Dev server with live reload at http://localhost:3020
yarn build         # Production build → ./dist/
yarn test          # Run the Vitest suite
yarn lint          # Run ESLint on JS source files
```

See [CLAUDE.md](CLAUDE.md) for full architecture and build system details.

## Releasing

Push a `v*` tag to trigger an automated GitHub Actions build and deploy to GitHub Pages:

```bash
git tag v0.16.0
git push origin v0.16.0
```

## License

[GPL-3.0-or-later](LICENSE)
