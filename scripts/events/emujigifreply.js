const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "emojigifreply",
  version: "1.0.0",
  permission: 0,
  credits: "𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "emoji অনুযায়ী GIF সহ auto reply",
  eventType: ["message"]
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!body) return;

  const emojiMap = {
    sad: {
      emojis: ["😢", "😭", "🥺", "😞", "💔"],
      gif: "sad.gif",
      captions: [
        "মন খারাপ করো না... আমি আছি তোমার পাশে 🥺",
        "সব ঠিক হয়ে যাবে ভাই... 😢",
        "আজ মন খারাপ? একটু হেসে নাও 💔"
      ]
    },
    funny: {
      emojis: ["😂", "🤣", "😹", "🤪", "😆"],
      gif: "funny.gif",
      captions: [
        "তুমি আসলেই গ্রুপের কমেডিয়ান! 😂",
        "এত হাসি পেলে দাঁত পড়ে যাবে 🤣",
        "তোর এই হাসি ভাইরাল হইবে রে ভাই! 😹"
      ]
    },
    love: {
      emojis: ["😍", "😘", "❤️", "💖", "🥰"],
      gif: "love.gif",
      captions: [
        "ভালোবাসা ছড়াচ্ছে! ❤️",
        "Love is in the air 😍",
        "কে রে ভাই/বোন, কারে ভালোবাসো এত?? 😘"
      ]
    },
    angry: {
      emojis: ["😡", "🤬", "😠"],
      gif: "angry.gif",
      captions: [
        "রাগ কমাও ভাই... ঠান্ডা হও 😠",
        "তুমি গরম আছো আজকে 🤬",
        "কিরে কাদের উপর এত রাগ 😤"
      ]
    }
  };

  for (const group of Object.values(emojiMap)) {
    for (const emoji of group.emojis) {
      if (body.includes(emoji)) {
        const caption = group.captions[Math.floor(Math.random() * group.captions.length)];
        const gifPath = path.join(__dirname, "media", group.gif);

        if (fs.existsSync(gifPath)) {
          return api.sendMessage(
            {
              body: `${caption}\n\n🤖 — BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`,
              attachment: fs.createReadStream(gifPath)
            },
            threadID,
            messageID
          );
        } else {
          return api.sendMessage(`${caption}\n\n🤖 — BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`, threadID, messageID);
        }
      }
    }
  }
};
