# How to Switch the Bot from Vercel to Cloudflare Pages

This guide will move everything (exercises + bot backend) to Cloudflare Pages.

## What you have now

- **GitHub Pages** serves the exercise HTML files
- **Vercel** handles the bot webhook (`/start`, `/help`, etc.)

After switching, **Cloudflare Pages** will handle both.

## Before you start

Make sure you have:
- Your **bot token** from BotFather (you can check with `/mybot` → API Token)
- **Wrangler CLI** installed (if not, run `npm i -g wrangler`)
- You're **logged in** to Cloudflare (if not, run `wrangler login`)

## Step 1: Deploy to Cloudflare Pages

The project is already set up in the `cloudflare-bot/` folder. Open Terminal and run:

```bash
cd ~/Documents/eng-exercises-bot/cloudflare-bot
```

```bash
wrangler pages deploy public
```

Wait for it to finish. You'll see a URL like `https://xxxx.eng-exercises-bot.pages.dev`.

The production URL is: `https://eng-exercises-bot.pages.dev`

## Step 2: Add your bot token

```bash
wrangler pages secret put BOT_TOKEN --project-name eng-exercises-bot
```

It will ask for the value — paste your bot token from BotFather.

Then redeploy so it picks up the token:

```bash
wrangler pages deploy public
```

## Step 3: Test the endpoint

Open this in your browser: `https://eng-exercises-bot.pages.dev/api/webhook`

You should see the word `OK`. If you see an error, something went wrong — check Step 2.

## Step 4: Switch the Telegram webhook

This is the step that actually switches the bot over. Run this in Terminal, replacing `YOUR_TOKEN` with your bot token (no brackets):

```bash
curl "https://api.telegram.org/botYOUR_TOKEN/setWebhook?url=https://eng-exercises-bot.pages.dev/api/webhook"
```

You should see: `{"ok":true,"result":true,"description":"Webhook was set"}`

## Step 5: Test the bot

1. Open @Val_Eng_bot in Telegram
2. Send `/start` — you should get the welcome message
3. Try `/help`, `/about`, `/exercises` — all should respond
4. Tap "Open Exercises" — the exercises should open

## Step 6: Update the Mini App URL (optional)

Right now the exercises open from GitHub Pages. If you want them to load from Cloudflare instead:

1. Go to BotFather → `/mybots` → your bot → Bot Settings → Menu Button
2. Change the URL to `https://eng-exercises-bot.pages.dev/`

The `WEBAPP_URL` in the bot code will also need updating — open `functions/api/webhook.js` and change the fallback URL, then redeploy.

## If you want to switch back to Vercel

Just point the webhook back to Vercel:

```bash
curl "https://api.telegram.org/botYOUR_TOKEN/setWebhook?url=https://eng-exercises-bot.vercel.app/api/webhook"
```

## Adding new exercises on Cloudflare

Same as before, but the files go into `cloudflare-bot/public/` instead of `docs/`:

1. Add the HTML file to `cloudflare-bot/public/exercises/`
2. Register it in `cloudflare-bot/public/index.html`
3. Deploy: `cd ~/Documents/eng-exercises-bot/cloudflare-bot && wrangler pages deploy public`

## Troubleshooting

- **Bot doesn't respond** — Check that `BOT_TOKEN` is set (Step 2). Redeploy after adding it.
- **"Must specify a project name" error** — Add `--project-name eng-exercises-bot` to the command.
- **Exercises not loading** — Make sure you deployed after adding new files to `public/`.
- **Old version still showing** — Bump the `?v=N` parameter in `public/index.html`, then redeploy.
