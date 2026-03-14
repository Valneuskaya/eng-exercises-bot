#!/bin/bash
# Setup script for Val_Eng_bot Telegram Mini App
# Run this ONCE after deploying to GitHub Pages

BOT_TOKEN="8622733847:AAFjj7Vb0GGJOgxOJzrFWHYE6Kd2NEDq8d8"

# IMPORTANT: Replace with your actual GitHub Pages URL after enabling it
# Format: https://<username>.github.io/<repo-name>/
WEBAPP_URL="https://Valneuskaya.github.io/eng-exercises-bot/"

echo "Setting up Val_Eng_bot..."

# Set bot description
curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setMyDescription" \
  -d "description=Interactive English exercises for B1+ students. General and Business English." \
  | python3 -c "import sys,json; r=json.load(sys.stdin); print('Description:', 'OK' if r['ok'] else r['description'])"

# Set bot short description
curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setMyShortDescription" \
  -d "short_description=English exercises - B1+ level" \
  | python3 -c "import sys,json; r=json.load(sys.stdin); print('Short desc:', 'OK' if r['ok'] else r['description'])"

# Set the Menu Button to open the Mini App
curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setChatMenuButton" \
  -H "Content-Type: application/json" \
  -d "{\"menu_button\": {\"type\": \"web_app\", \"text\": \"Exercises\", \"web_app\": {\"url\": \"${WEBAPP_URL}\"}}}" \
  | python3 -c "import sys,json; r=json.load(sys.stdin); print('Menu button:', 'OK' if r['ok'] else r['description'])"

echo ""
echo "Done! Students can now open the bot and tap 'Exercises' to start."
echo ""
echo "To add the Mini App to a channel/group, use BotFather:"
echo "  1. Open @BotFather"
echo "  2. /mybots -> Val_Eng_bot -> Bot Settings -> Menu Button"
echo "  3. Or share the link: https://t.me/Val_Eng_bot"
