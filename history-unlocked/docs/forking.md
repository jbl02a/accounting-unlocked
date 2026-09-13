# Moving this into its own repository

This app was prototyped inside the Accounting Unlocked repository because the
GitHub integration in use could not create repositories (`create_repository`
returns `403 Resource not accessible by integration`). Nothing about the code
depends on living there: `history-unlocked/` is self-contained, with its own
`package.json`, `vite.config.js`, `vercel.json`, `.gitignore`, icons and docs, and
nothing outside the directory is imported.

## Doing it

1. Create an empty repository on GitHub — `history-unlocked`, private is fine. No
   README and no .gitignore; this directory supplies both.
2. Run, from inside `history-unlocked/`:

   ```bash
   ./scripts/fork-to-own-repo.sh git@github.com:<you>/history-unlocked.git
   ```

   It copies the directory to `~/history-unlocked` (or a path you pass as the
   second argument), starts a fresh git history, commits, and pushes to `main`.
3. Import the new repository in Vercel: framework preset **Vite**, build command
   `npm run build`, output directory `dist`. `vercel.json` already carries the
   no-cache headers on `sw.js` that make PWA updates get detected in production.
4. Once the new repo is live, delete `history-unlocked/` from the accounting repo
   so there is only one copy to maintain.

## If you would rather an agent did it

Create the empty repository first — that is the only step blocked. After that, a
session with the new repo in scope can push to it directly.

## What does not carry over

Nothing. The two apps share no runtime code — the pieces that came from Accounting
Unlocked (`shuffle.js`, `examSession.js`, `Hint.jsx`, `UpdatePrompt.jsx`,
`ProgressContext`, the print stylesheet) were copied, not imported, precisely so
this split would be a file move rather than a refactor. They have already diverged:
this app's exam resume checks both question banks, and its print stylesheet has
phone-width rules the accounting one does not.
