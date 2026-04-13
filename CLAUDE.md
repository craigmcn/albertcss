# Albert CSS — Claude Code Guide

Personal CSS framework based on Bootstrap v4. Vanilla JS, no framework dependencies.

## Requirements

- Node v24 (see `.nvmrc`)
- Yarn v3

## Commands

```bash
yarn serve          # Dev server with live reload (BrowserSync, port 3020) → ./tmp/
yarn dev            # One-off development build → ./tmp/
yarn build          # Production build → ./dist/
yarn build:netlify  # Netlify build → ./netlify/ and ./netlify/albertcss/
yarn test           # Run the Vitest suite
yarn test:coverage  # Run tests with coverage output → ./coverage/
```

## Architecture

### Source layout

```
src/
├── css/
│   ├── albert.scss           # Single entry point — imports all partials
│   └── scss/
│       ├── _variables.scss   # SCSS variables
│       ├── _mixins.scss      # Responsive breakpoint mixins
│       ├── _root.scss        # CSS custom properties (light + dark mode)
│       ├── _fonts.scss
│       ├── _normalize.scss   # normalize.css v8.0.1
│       ├── _base.scss
│       ├── _alerts.scss
│       ├── _buttons.scss
│       ├── _cards.scss
│       ├── _forms.scss
│       ├── _icons.scss
│       ├── _images.scss
│       ├── _lists.scss
│       ├── _navigation.scss
│       ├── layouts/
│       │   ├── _header.scss
│       │   ├── _main.scss
│       │   ├── _sections.scss
│       │   └── _toolbar.scss
│       └── utilities/
│           ├── _flex.scss
│           ├── _spacing.scss
│           └── _text.scss
├── js/
│   ├── scripts.js            # Entry point — imports all modules
│   ├── alerts.js             # Alert close/remove behaviour
│   ├── menuToggle.js         # Responsive nav toggle, aria-expanded
│   ├── scrollHeader.js       # Hide/show header on scroll, --headerHeight CSS var
│   └── throttle.js           # Scroll event throttle utility
└── index.html
```

### Build system (Gulp 5)

Three environments, set with `--env`:

| Env | Output | Used by |
|---|---|---|
| `development` (default) | `./tmp/` | Local dev |
| `production` | `./dist/` | Releases |
| `netlify` | `./netlify/` + `./netlify/albertcss/` | Netlify host |

CSS pipeline: SCSS → Sass (expanded + compressed) → Autoprefixer → output  
JS pipeline: Browserify + Babelify (@babel/preset-env) → Uglify (min only) → source maps

### Responsive breakpoints (defined in `_mixins.scss`)

| Name | Width |
|---|---|
| xs | < 544px |
| sm | ≥ 544px |
| md | ≥ 768px |
| lg | ≥ 1012px |
| xl | ≥ 1280px |

## Code conventions

### SCSS

- All partials are imported through `albert.scss` — add new ones there
- Use CSS custom properties (from `_root.scss`) for colours and theme-sensitive values; use SCSS variables for build-time constants
- Dark mode: `prefers-color-scheme: dark` media query + `html[data-mode="dark"]` / `body.theme--dark` manual override
- BEM-style class naming (`.block`, `.block__element`, `.block--modifier`)
- 2-space indentation

### JavaScript

- ES6 modules (`import`/`export`); bundled by Browserify
- No frameworks — vanilla JS only
- Single quotes, semicolons (enforced by Prettier)
- 2-space indentation
- Accessibility: always manage `aria-*` attributes alongside visual state changes

### Testing

When modifying any JS module under `src/js/` (excluding `scripts.js`), add or update the corresponding test file in `src/js/__tests__/` to cover the changed behaviour. Run `yarn test` to confirm all tests pass.

### ESLint

Config in `eslint.config.js` using ESLint flat config with `neostandard` and overrides:
- Single quotes, 2-space indent (semicolons handled by Prettier)
- `console` statements: warn

Run `yarn lint` before committing JS changes.

## Releasing a version

Releases are automated via GitHub Actions (`.github/workflows/release.yml`).

**New release (tag with `v` prefix):**

```bash
# Bump version in package.json first
git tag v0.14.0
git push origin v0.14.0
```

The workflow builds and deploys to the `gh-pages` branch at `/v0.14.0/`, served at:  
`https://albertcss.craigmcn.com/v0.14.0/css/albert.min.css`

The latest published release is always available at:  
`https://www.craigmcn.com/albertcss/`

**Backfill an older tag:**

Run the workflow manually from the Actions tab:  
Actions → Release to GitHub Pages → Run workflow → enter the exact tag name as it exists in Git  
Old tags have no `v` prefix (e.g. `0.13.0`); new tags do (e.g. `v0.14.0`).  
The `v` prefix is added to the *destination path* if not present, but the tag input must match Git exactly or checkout will fail.

## Key dependencies

| Package | Purpose |
|---|---|
| `gulp` v5 | Build orchestration |
| `sass` (Dart) | SCSS compilation |
| `gulp-autoprefixer` | Vendor prefixes |
| `browserify` + `babelify` | JS bundling + transpilation |
| `browser-sync` | Dev server with live reload |
| `formbouncerjs` | Client-side form validation |
| `minimist` | CLI arg parsing (`--env` flag) |
