const axios = require("axios");

module.exports.config = {
  name: "funnyimage",
  version: "1.0.0",
  permission: 0,
  credits: "King_Shourov",
  description: "একটি মজার ছবি পাঠায়",
  prefix: true,
  category: "media",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  const url = "https://some-random-api.ml/meme";
  try {
    const res = await axios.get(url);
    const image = res.data.image;
    api.sendMessage({ body: `😹 মজার ছবি!\n\n— BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`, attachment: await global.utils.getStreamFromURL(image) }, event.threadID, event.messageID);
  } catch (e) {
    api.sendMessage("❌ ছবি আনতে সমস্যা হয়েছে!", event.threadID, event.messageID);
  }
};
