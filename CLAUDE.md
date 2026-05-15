# Albert CSS — Claude Code Guide

Personal CSS framework based on Bootstrap v4. Vanilla JS, no framework dependencies.

The public-facing project overview is in [`README.md`](README.md) at the project root — update it when components, JS behaviour, or utilities change.

## Requirements

- Node v24 (see `.nvmrc`)
- Yarn v4 (managed by Corepack)

## Commands

```bash
yarn serve          # Dev server with live reload (BrowserSync, port 3020) → ./tmp/
yarn dev            # One-off development build → ./tmp/
yarn build          # Production build → ./dist/
yarn build:netlify  # Netlify build → ./netlify/ and ./netlify/albertcss/
yarn test           # Run the Vitest suite
yarn test:coverage  # Run tests with coverage output → ./coverage/
yarn lint           # Run ESLint on JS source files
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
│       ├── _reset.scss       # CSS reset
│       ├── _base.scss
│       ├── _accordion.scss
│       ├── _alerts.scss
│       ├── _badges.scss
│       ├── _button-group.scss
│       ├── _buttons.scss
│       ├── _cards.scss
│       ├── _dropdown.scss
│       ├── _forms.scss
│       ├── _icons.scss
│       ├── _images.scss
│       ├── _lists.scss
│       ├── _modal.scss
│       ├── _navigation.scss
│       ├── _popovers.scss
│       ├── _tables.scss
│       ├── _tabs.scss
│       ├── _tooltips.scss
│       ├── layouts/
│       │   ├── _header.scss
│       │   ├── _main.scss
│       │   ├── _sections.scss
│       │   └── _toolbar.scss
│       └── utilities/
│           ├── _aspect-ratio.scss
│           ├── _background.scss
│           ├── _borders.scss
│           ├── _display.scss
│           ├── _flex.scss
│           ├── _grid.scss
│           ├── _overflow.scss
│           ├── _position.scss
│           ├── _shadows.scss
│           ├── _spacing.scss
│           ├── _text.scss
│           └── _zindex.scss
├── js/
│   ├── scripts.js            # Entry point — imports all modules
│   ├── accordion.js          # Accordion/disclosure component
│   ├── alerts.js             # Alert close/remove behaviour
│   ├── dropdown.js           # Dropdown menu toggle
│   ├── menuToggle.js         # Responsive nav toggle, aria-expanded
│   ├── modal.js              # Modal open/close, focus trap
│   ├── popover.js            # Popover toggle, positioning, and viewport flip
│   ├── scrollHeader.js       # Hide/show header on scroll, --headerHeight CSS var
│   ├── tabs.js               # Tab panel switching
│   ├── throttle.js           # Scroll event throttle utility
│   └── tooltip.js            # Tooltip viewport-aware flip (sets data-tooltip-flip)
└── index.html
```

### Build system (Gulp 5)

Three environments, set with `--env`:

| Env                     | Output                                | Used by      |
| ----------------------- | ------------------------------------- | ------------ |
| `development` (default) | `./tmp/`                              | Local dev    |
| `production`            | `./dist/`                             | Releases     |
| `netlify`               | `./netlify/` + `./netlify/albertcss/` | Netlify host |

CSS pipeline: SCSS → Sass (expanded + compressed) → Autoprefixer → output  
JS pipeline: Browserify + Babelify (@babel/preset-env) → Uglify (min only) → source maps

### Responsive breakpoints (defined in `_mixins.scss`)

| Name | Width    |
| ---- | -------- |
| xs   | < 544px  |
| sm   | ≥ 544px  |
| md   | ≥ 768px  |
| lg   | ≥ 1012px |
| xl   | ≥ 1280px |

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

**New release — use the `/release` slash command** (handles tests, build, version bump, commit, tag, and push):

```bash
/release X.Y.Z
```

Or manually:

```bash
# Bump version in package.json first
git tag vX.Y.Z
git push origin vX.Y.Z
```

The workflow builds and deploys to the `gh-pages` branch at `/vX.Y.Z/`, served at:  
`https://albertcss.craigmcn.com/vX.Y.Z/css/albert.min.css`

The latest published release is always available at:  
`https://www.craigmcn.com/albertcss/`

**Backfill an older tag:**

Run the workflow manually from the Actions tab:  
Actions → Release to GitHub Pages → Run workflow → enter the exact tag name as it exists in Git  
Old tags have no `v` prefix (e.g. `0.13.0`); new tags do (e.g. `v0.15.0`).  
The `v` prefix is added to the _destination path_ if not present, but the tag input must match Git exactly or checkout will fail.

## Slash commands

Custom Claude Code slash commands live in `.claude/commands/` (project-scoped):

| Command              | What it does                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `/release [version]` | Runs tests + build, bumps `package.json`, commits, tags with `v` prefix, and pushes to trigger the GitHub Actions release |

Global slash commands (in `~/.claude/commands/`) available in any project:

| Command                | What it does                                                     |
| ---------------------- | ---------------------------------------------------------------- |
| `/commit-push [title]` | Stage, commit (following conventions), and push                  |
| `/create-pr [title]`   | Create a PR against `main`, then automatically run a code review |
| `/review-pr [pr]`      | Review the current branch's PR or a specified PR number          |

## Project status (2026-05-14)

### Completed

- **Modernise and expand** (PR #278, merged 2026-04-16): badges, modal, accordion, tabs, dropdown, tooltips, popovers, spacing/display/text/overflow/position/shadow/border/z-index/aspect-ratio/background/grid utilities, button group
- **Post-review fixes** (PR #279, merged 2026-04-16): brand SVG sizing, FA icon overflow, viewport-aware flip for tooltips + popovers
- **Dep bumps**: ESLint 9 → 10, Prettier 3.8.3, Vitest 4.1.5 (PRs #280–#283); @babel/preset-env, globals, jsdom, eslint, ip-address, @babel/plugin-transform-modules-systemjs (PRs #284–#290)
- **Repo hygiene**: `.github/CODEOWNERS` (`* @craigmcn`), branch protection ruleset (1 approval, Admin bypass, `test` status check, block force push + deletion) — both already in place, confirmed 2026-05-01

### Outstanding

- Yarn 3.3.1 → 4 upgrade + Husky pre-commit hook (`yarn prettier --check . && yarn lint`)

### Deferred (out of scope)

- Toasts/Snackbars, Progress bars, Spinners, Breadcrumbs, Pagination, Stepper/Wizard, Avatars, Chips/Tags

### Future improvements (TODO)

- **SRI hashes for releases**: ✅ done — computed at release time, stored in `versions.json` on `gh-pages`
- **GitHub Pages version index**: ✅ done — `index.html` at `albertcss.craigmcn.com/` lists all versions with SRI copy buttons
- **Example page with HTML snippets**: a living demo page that shows each component with the actual markup, so consumers can copy code directly
- **Netlify CSS not minified**: `www.craigmcn.com/albertcss/css/albert.min.css` is unminified for v0.14.0 and v0.15.0 (v0.13.0 and earlier are minified). Investigate the Gulp CSS pipeline — likely a regression in the `gulp-sass` or `gulp-if` minification path introduced in the modernise-and-expand work.

### Key decisions

- Viewport-aware flip for tooltips and popovers implemented in JS (`tooltip.js`, `popover.js`) using `data-tooltip-flip` / `data-popover-flip` attributes; CSS handles the visual swap
- Spacing utilities use CSS logical properties (e.g. `padding-inline-start`) with Bootstrap-compatible class names; legacy classes kept for backward compatibility
- `text-bg-*` classes set both background and foreground colour via `--semanticContrast` CSS var for dark-mode safety

## Key dependencies

| Package                   | Purpose                        |
| ------------------------- | ------------------------------ |
| `gulp` v5                 | Build orchestration            |
| `sass` (Dart)             | SCSS compilation               |
| `gulp-autoprefixer`       | Vendor prefixes                |
| `browserify` + `babelify` | JS bundling + transpilation    |
| `browser-sync`            | Dev server with live reload    |
| `vitest`                  | Unit test runner               |
| `formbouncerjs`           | Client-side form validation    |
| `minimist`                | CLI arg parsing (`--env` flag) |
