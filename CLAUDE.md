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
│       │   ├── _container.scss    # Bootstrap-compatible responsive containers; replaces .main/.main--fixed
│       │   ├── _header.scss
│       │   ├── _main.scss         # Deprecated — kept for backward compat; use .container instead
│       │   ├── _sections.scss     # Includes .sections--divided (border-top separator)
│       │   ├── _sidebar-layout.scss  # Two-column CSS Grid: sidebar + main; stacks at sm
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
│   ├── darkMode.js           # Dark mode toggle (html[data-mode], data-color spans)
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

The latest published release is available at both:

- **`https://albertcss.craigmcn.com/css/albert.min.css`** (canonical — gh-pages root, set by release workflow)
- `https://www.craigmcn.com/albertcss/css/albert.min.css` (legacy Netlify URL — still works)

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

## Project status (2026-06-08)

### Completed

- **Modernize and expand** (PR #278, merged 2026-04-16): badges, modal, accordion, tabs, dropdown, tooltips, popovers, spacing/display/text/overflow/position/shadow/border/z-index/aspect-ratio/background/grid utilities, button group
- **Post-review fixes** (PR #279, merged 2026-04-16): brand SVG sizing, FA icon overflow, viewport-aware flip for tooltips + popovers
- **Dep bumps**: ESLint 9 → 10, Prettier 3.8.3, Vitest 4.1.5 (PRs #280–#283); @babel/preset-env, globals, jsdom, eslint, ip-address, @babel/plugin-transform-modules-systemjs (PRs #284–#290)
- **Repo hygiene**: `.github/CODEOWNERS` (`* @craigmcn`), branch protection ruleset (1 approval, Admin bypass, `test` status check, block force push + deletion) — both already in place, confirmed 2026-05-01
- **Yarn 3.3.1 → 4 + Husky** (PR #291, merged 2026-05-20): Yarn 4.14.1 via Corepack, Husky pre-commit hook, full Prettier reformat
- **SRI + versions index** (PR #295, merged 2026-05-20): SRI hashes computed at release time, `versions.json` upserted on `gh-pages`, `versions.html` page with copy buttons
- **gh-pages canonical site + HTML snippets** (PR #303, merged 2026-05-28): style guide restructured with sidebar nav and `<details class="sg-snippet">` copy drawers per component; `versions.html` at repo root with URL-update warning; `versions.html` linked from side nav; `stripSnippets()` Transform in gulpfile strips drawers for Netlify build; release workflow deploys `dist/` to gh-pages root so `albertcss.craigmcn.com/css/albert.min.css` works after next release; new layout partials (`_container.scss`, `_sidebar-layout.scss`, `_sections--divided`)
- **Dark mode toggle + nav fixes** (PR #304, merged 2026-05-28): add `darkMode.js` module (`initDarkMode()`), rename title/h1 "Style Guide" → "Albert CSS", replace placeholder nav links with "Style Guide" (`./`) and "Versions" (absolute gh-pages URL); 7 new unit tests
- **Font replacement** (PR #312, merged 2026-06-06, v0.17.0 released): Raleway → Outfit; single-story "a", geometric sans-serif; h1–h4 weight 500, h5–h6 weight 600; `$heading-stack` in `_fonts.scss`

### In progress / next steps

- Add multi-button dark mode sync test (flagged in PR #304 review, non-blocking)
- Deprecate `.main` / `.main--fixed` in `_main.scss` — already noted in source; remove in a future version once consumers have migrated to `.container`

### Deferred (out of scope)

- Toasts/Snackbars, Progress bars, Spinners, Breadcrumbs, Pagination, Stepper/Wizard, Avatars, Chips/Tags

### Font

- ✅ Replaced Raleway with Outfit (2026-06-06, branch `feat/font-comparison`) — single-story "a", geometric sans-serif, Google Fonts; h1–h4 at weight 500, h5–h6 at weight 600; stack: `Outfit, Futura, Avenir, 'Century Gothic', Candara, sans-serif`

### Future improvements (TODO)

- **SRI hashes for releases**: ✅ done — computed at release time, stored in `versions.json` on `gh-pages`
- **GitHub Pages canonical site**: ✅ done (PR #303) — `albertcss.craigmcn.com/` serves full style guide with HTML snippets; `versions.html` linked from nav; Netlify serves snippet-less style guide
- **Example page with HTML snippets**: ✅ done (PR #303) — `<details class="sg-snippet">` drawers inline in `src/index.html`; stripped for Netlify via `stripSnippets()` in `gulpfile.js`
- **Netlify CSS not minified**: `www.craigmcn.com/albertcss/css/albert.min.css` was unminified for v0.14.0 and v0.15.0 (v0.13.0 and earlier are minified). Still unresolved — investigate the Gulp CSS pipeline; likely a regression in the `gulp-sass` or `gulp-if` minification path.

### Key decisions

- Viewport-aware flip for tooltips and popovers implemented in JS (`tooltip.js`, `popover.js`) using `data-tooltip-flip` / `data-popover-flip` attributes; CSS handles the visual swap
- Spacing utilities use CSS logical properties (e.g. `padding-inline-start`) with Bootstrap-compatible class names; legacy classes kept for backward compatibility
- `text-bg-*` classes set both background and foreground colour via `--semanticContrast` CSS var for dark-mode safety
- `albertcss.craigmcn.com` is the canonical home; `www.craigmcn.com/albertcss/` is backward-compat only (snippet-less style guide + latest CSS/JS)
- "Version history" link in style guide side nav uses an absolute gh-pages URL so it works from gh-pages, Netlify, and local dev
- `_sections--divided` (border-top separator) replaces `_sections--alternating` inside constrained sidebar layouts — the full-bleed `::before` trick on `--alternating` breaks in constrained columns
- `stripSnippets()` uses three sequential regex replacements: (1) `<details class="sg-snippet">` elements, (2) the `/* ---- Code snippets ---- */` CSS block, (3) the `// Copy buttons` JS event handler block — all three must be present or the Netlify output contains dead code
- `initDarkMode()` reads `html.dataset.mode` (not the button's `data-mode`) as the source of truth for current state — button attribute is derived/display-only, not authoritative
- Nav "Versions" link uses the absolute `https://albertcss.craigmcn.com/versions.html` URL (same as sidebar nav) so it resolves correctly from both Netlify (`/albertcss/`) and gh-pages (`/`) contexts; "Style Guide" uses `./` (relative) for the same reason
- System-preference sync on load (OS dark mode → initial button state) is a known gap; `prefers-color-scheme` already styles via CSS but `html.dataset.mode` and button state are not initialized to match — deferred, non-blocking
- Heading font is Outfit (not Raleway); `$heading-stack` in `_fonts.scss` replaces `$raleway-stack`; h1–h4 at weight 500, h5–h6 at weight 600 (heavier to compensate for smaller size); `.subheading` inside h5/h6 drops back to weight 500
- Outfit fallback stack chosen for geometric character: Futura (macOS), Avenir (macOS alternate), Century Gothic (Windows), Candara (Windows humanist fallback) — do not trust web-search research on whether a font has a single-story "a"; verify visually in the browser (Montserrat and Plus Jakarta Sans were both incorrectly reported as single-story by research tools)

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
