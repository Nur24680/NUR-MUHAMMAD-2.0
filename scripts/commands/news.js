const axios = require("axios");

module.exports.config = {
  name: "news",
  version: "1.0.0",
  permission: 0,
  credits: "King_Shourov",
  description: "আজকের খবর",
  prefix: true,
  category: "information",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  try {
    const res = await axios.get("https://inshortsapi.vercel.app/news?category=technology");
    const news = res.data.data[0];
    const message = `📰 আজকের খবর:\n\n${news.title}\n\n${news.content}\n\n— BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`;
    api.sendMessage(message, event.threadID, event.messageID);
  } catch (err) {
    api.sendMessage("❌ নিউজ আনতে সমস্যা হয়েছে!", event.threadID, event.messageID);
  }
};
