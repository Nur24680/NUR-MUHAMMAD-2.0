module.exports.config = {
  name: "join",
  eventType: ['log:subscribe'],
  version: "1.0.1",
  credits: "Shourov Modified by GPT",
  description: "Custom welcome for Shourov and members"
};

const fs = require("fs-extra");
const axios = require("axios");
const { createReadStream } = require("fs-extra");
const path = require("path");

module.exports.run = async function ({ api, event }) {
  const { threadID } = event;
  const botID = api.getCurrentUserID();
  const added = event.logMessageData.addedParticipants;

  // SHOUROV UID
  const shourovUID = "100070297030133";

  // If bot itself is added (Shourov bot join message)
  if (added.some(u => u.userFbId == botID)) {
    const gifUrl = 'https://i.postimg.cc/kXFmkXL3/1748717070130.jpg';
    const gifPath = path.join(__dirname, 'shourov_join.gif');

    const res = await axios.get(gifUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(gifPath, res.data);

    return api.sendMessage({
      body: `🥳 𝗣𝗜𝗖𝗖𝗛𝗜 𝗦𝗛𝗢𝗨𝗥𝗢𝗩 𝗝𝗢𝗜𝗡𝗘𝗗 𝗧𝗛𝗘 𝗖𝗛𝗔𝗧 🤖

🔰 Bot Activated Successfully!
📅 Date: ${(new Date()).toLocaleDateString()}
⌚ Time: ${(new Date()).toLocaleTimeString()}

💡 Type '${global.config.PREFIX}help' to get started.`,
      attachment: createReadStream(gifPath)
    }, threadID);
  }

  // Regular member welcome
  for (let user of added) {
    if (user.userFbId != botID) {
      const name = user.fullName || "New Member";
      const msg = `👋 Welcome ${name} to the group! ✨ Enjoy your time here.`;
      return api.sendMessage(msg, threadID);
    }
  }
};
