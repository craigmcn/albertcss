Release a new version of Albert CSS.

$ARGUMENTS should be the new version number without the `v` prefix (e.g. `0.16.0`). If not provided, ask the user for it before proceeding.

Steps:

1. Confirm you are on the `main` branch. If not, warn the user and stop — releases must come from main.
2. Run `yarn test` — abort if any tests fail. Show the failure output.
3. Run `yarn build` — abort if the build fails. Show the failure output.
4. Update the `version` field in `package.json` to `$ARGUMENTS`.
5. Commit the version bump with title `chore: bump version to $ARGUMENTS` and a brief description. Follow the commit conventions in CLAUDE.md (imperative title ≤50 chars, 3–4 line description, co-authored-by line).
6. Push the commit: `git push origin main`.
7. Create and push the tag: `git tag v$ARGUMENTS && git push origin v$ARGUMENTS`.
8. Output the tag name and remind the user that the GitHub Actions release workflow will build and deploy it automatically to `https://albertcss.craigmcn.com/v$ARGUMENTS/`.
