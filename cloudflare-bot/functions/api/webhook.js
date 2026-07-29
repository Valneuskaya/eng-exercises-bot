export async function onRequest(context) {
  if (context.request.method === "GET") {
    return new Response("OK");
  }

  const body = await context.request.json();
  const message = body.message;

  if (!message) {
    return new Response("OK");
  }

  const chatId = message.chat.id;
  const firstName = message.from?.first_name || "there";
  const text = message.text || "";
  const botToken = context.env.BOT_TOKEN;
  const webappUrl = context.env.WEBAPP_URL || "https://Valneuskaya.github.io/eng-exercises-bot/";

  if (text.startsWith("/")) {
    const command = text.split(" ")[0].split("@")[0];
    await handleCommand(botToken, webappUrl, chatId, command, firstName);
  } else {
    await sendMessage(botToken, chatId,
      "Tap <b>Exercises</b> below or use /exercises to start practising! \u{1F4DA}"
    );
  }

  return new Response("OK");
}

async function sendMessage(botToken, chatId, text, replyMarkup) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
  };
  if (replyMarkup) {
    payload.reply_markup = replyMarkup;
  }
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

async function handleCommand(botToken, webappUrl, chatId, command, firstName) {
  const exercisesButton = {
    inline_keyboard: [[
      { text: "\u{1F4DA} Open Exercises", web_app: { url: webappUrl } }
    ]]
  };

  switch (command) {
    case "/start":
      await sendMessage(botToken, chatId,
        `Hi ${firstName}! \u{1F44B}\n\n` +
        "Welcome to <b>English Exercises</b> \u2014 your interactive practice assistant.\n\n" +
        "Here you can work on vocabulary, phrasal verbs, grammar, business English and more \u2014 " +
        "all right inside Telegram.\n\n" +
        "Tap the button below to start! \u{1F447}",
        exercisesButton
      );
      break;

    case "/exercises":
      await sendMessage(botToken, chatId,
        "Tap the button below to open your exercises \u{1F447}",
        exercisesButton
      );
      break;

    case "/help":
      await sendMessage(botToken, chatId,
        "<b>How to use this bot:</b>\n\n" +
        "1. Tap <b>Exercises</b> (menu button) or use /exercises\n" +
        "2. Choose an exercise from the list\n" +
        "3. Complete all tasks and check your answers\n" +
        "4. You can reset and redo any exercise\n\n" +
        "Each exercise has a score \u2014 try to get 100%! \u{1F4AA}\n\n" +
        "If something doesn't work, let your teacher know."
      );
      break;

    case "/about":
      await sendMessage(botToken, chatId,
        "<b>English Exercises Bot</b>\n\n" +
        "Interactive exercises for B1+ English learners.\n" +
        "General and Business English, English for Special Purposes.\n\n" +
        "Created by your English teacher with \u2764\uFE0F"
      );
      break;

    default:
      await sendMessage(botToken, chatId,
        "I don't know that command. Try /help to see what I can do!"
      );
  }
}
