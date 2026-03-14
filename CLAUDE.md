# English Exercises Bot

## What this is
Telegram Mini App bot (@Val_Eng_bot) for interactive English exercises. The user is an English teacher creating exercises for B1+ students (general and business English).

## URLs
- **Repo:** https://github.com/Valneuskaya/eng-exercises-bot
- **Live URL:** https://Valneuskaya.github.io/eng-exercises-bot/ (capital V is required — lowercase will 404)
- **GitHub Pages:** serves from `main` branch, `/docs` folder

## Project structure
```
docs/
  index.html              — landing page with exercise registry array
  exercises/
    revision-mar13.html   — Revision: Feb-Dec (idioms, phrasal verbs, prefixes, gap-fill) — 44 questions
    personality-revision.html — Personality & Character (phrases MC + adjectives gap-fill) — 18 questions
setup-bot.sh              — bot configuration script (contains token, do not commit publicly)
api/webhook.py            — bot backend (not yet deployed to Vercel)
vercel.json               — Vercel config (not yet active)
```

## Exercise creation workflow (IMPORTANT)
1. **Draft first** — show exercise content (questions, options, answers) in the conversation for review
2. **Wait for approval** — do not create the HTML until the user approves or requests edits
3. **Create HTML** — self-contained file in `docs/exercises/` with inline CSS/JS
4. **Register** — add entry to the `exercises` array in `docs/index.html`
5. **Push** — git add, commit, push to `main` — goes live via GitHub Pages automatically

## Exercise HTML conventions
- Self-contained single HTML files (all CSS/JS inline)
- Include `telegram-web-app.js` and initialize with `tg.ready()`, `tg.expand()`
- Use Telegram theme CSS variables: `var(--tg-theme-bg-color, #fallback)`, etc.
- Back button: `tg.BackButton.show()` with `window.location.href = '../'`
- Send results on completion with `tg.sendData(JSON.stringify({...}))`
- Exercise types used so far: multiple choice (2 options), tap-to-match, prefix dropdowns (3 options), gap-fill text input
- For gap-fill: show the first letter as part of the placeholder (e.g. `s_________`) — do NOT show the answer in parentheses after the gap
- Mobile-friendly: use `@media (max-width: 600px)` breakpoints, stack options vertically on mobile

## Cache busting
When updating an existing exercise HTML file, bump the `?v=N` query parameter on the file link in `docs/index.html` to force browsers/Telegram to load the new version. Current values:
- `personality-revision.html?v=2`

## Deployment notes
- GitHub Pages deploys automatically on push to `main` (takes 1-2 minutes)
- Bot backend (Vercel) is not yet deployed — the bot works as a Mini App launcher without it
- The repo is currently public
