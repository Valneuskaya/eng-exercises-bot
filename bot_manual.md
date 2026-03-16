# How to Add a New Exercise to the Bot

## Step 1: Create the HTML file

1. Open any existing exercise file as a template, e.g. `docs/exercises/personality-revision.html`
2. Save a copy with a new name in the same folder: `docs/exercises/your-new-exercise.html`
3. Edit the content — change the questions, options, and answers
4. Test it by opening the file in your browser (just double-click it)

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
cd ~/Documents/eng-exercises-bot
```

```bash
git add docs/exercises/your-new-exercise.html docs/index.html
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

## Troubleshooting

- **404 error** — Make sure the URL uses a capital V: `Valneuskaya.github.io` (not `valneuskaya`)
- **Old version still showing** — Bump the `?v=N` parameter (see "Updating" above), then close and reopen the Mini App
- **Exercise not in the list** — Check that you added it to the `exercises` array in `index.html` and pushed
