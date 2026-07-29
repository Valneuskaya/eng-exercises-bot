# How to Add a New Exercise to the Bot

## Step 1: Create the HTML file

1. Open an existing exercise file as a template. **Use `docs/exercises/books-reading.html`** — it is the most up to date and has the fixes described in "Known template traps" below. Older files may not.
2. Save a copy with a new name in the same folder: `docs/exercises/your-new-exercise.html`
3. Edit the content — change the questions, options, and answers
4. Test it by opening the file in your browser (just double-click it)

⚠️ Testing in the browser is not enough — see "Known template traps" below for what to check on your phone.

## Step 2: Register the exercise in the list

1. Open `docs/index.html` in a text editor
2. Find the `const exercises = [...]` array (around line 110)
3. Add a new entry at the end, before the closing `];`:

```javascript
    {
      id: "your-exercise-id",
      title: "Exercise Title",
      desc: "Short description of what's inside",
      level: "B1+",
      type: "General",
      questions: 18,
      file: "exercises/your-new-exercise.html"
    }
```

4. Make sure there's a comma `,` after the previous exercise's closing `}`
5. Update `questions` to match the actual number of questions

## Step 3: Push to GitHub

Open Terminal and run these commands one by one:

```bash
cd /Users/valneuskaya/Documents/claude/eng-exercises-bot
```

Copy everything to the backup folder so the two stay in sync (see "Keeping the two folders in sync" below):

```bash
cp docs/exercises/*.html cloudflare-bot/public/exercises/ && cp docs/index.html cloudflare-bot/public/index.html
```

```bash
git add docs cloudflare-bot
```

```bash
git commit -m "Add new exercise: Your Exercise Title"
```

```bash
git push
```

Wait 1–2 minutes for GitHub Pages to deploy.

## Step 4: Check in the bot

1. Open @Val_Eng_bot in Telegram
2. Tap the menu button (bottom left) to open the Mini App
3. Your new exercise should appear in the list
4. Tap it to make sure it works

## Updating an existing exercise

If you edit an exercise HTML file that's already live:

1. Make your changes to the HTML file
2. Open `docs/index.html` and find the `file:` line for that exercise
3. Add or bump the version number: `"exercises/file.html?v=2"` → `"exercises/file.html?v=3"`
4. Push to GitHub (same commands as Step 3, but `git add` the changed files)

The `?v=N` forces Telegram to load the fresh version instead of the cached one.

## Keeping the two folders in sync

There are two copies of everything:

- `docs/` — what students actually use right now (GitHub Pages)
- `cloudflare-bot/public/` — a backup deployment, not currently switched on

Only `docs/` is live, so forgetting the backup breaks nothing today. But if the backup drifts far enough behind, switching to it later would quietly serve students old, broken versions of exercises. The `cp` command in Step 3 keeps them identical — run it every time.

To check they match:

```bash
cd /Users/valneuskaya/Documents/claude/eng-exercises-bot && diff -r -x '.DS_Store' docs cloudflare-bot/public
```

No output means they are identical, which is what you want. (The `-x '.DS_Store'` part ignores a hidden file macOS creates in folders — it is not part of the site.)

## Known template traps

Two bugs that older exercise files contain. Both were fixed in `books-reading.html` and `shrinking-s1-e1.html` in July 2026, but any exercise copied from an *older* file will inherit them — and both show up as "the See Results button never appears", which points away from the real cause.

**1. Tap-to-pair sections can trap the student.** The pair-up section only counted as finished at a perfect 8 out of 8. A wrong pair just flashed red and cleared, so a student who could not find a match was stuck forever and could never reach the results screen. It also meant everyone who finished scored full marks, so that section told you nothing.

The fix: wrong pairs now count against the score, and a **Show answers** button reveals the rest and completes the section.

**2. The See Results button was easy to miss on a phone.** It used to be inserted at the top of whichever section you were on. On a phone, after checking a long section, it sat above the visible screen and looked missing. It also disappeared when switching between sections.

The fix: it is now a bar fixed to the bottom of the screen that cannot be scrolled past.

**What to check when you make a new exercise:** open it on your phone in Telegram, deliberately get some answers wrong, and confirm you can still reach the results screen. Every section must be finishable without a perfect score.

## Troubleshooting

- **404 error** — Make sure the URL uses a capital V: `Valneuskaya.github.io` (not `valneuskaya`)
- **Old version still showing** — Bump the `?v=N` parameter (see "Updating" above), then close and reopen the Mini App
- **Exercise not in the list** — Check that you added it to the `exercises` array in `index.html` and pushed
- **"See Results" never appears** — A section has not registered as finished. Usually the tap-to-pair section, which needs every pair matched. See "Known template traps" above
