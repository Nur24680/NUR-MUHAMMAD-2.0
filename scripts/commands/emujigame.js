const emojis = ["😃", "😎", "🥰", "😂", "🤔", "😭"];
module.exports.config = {
  name: "emojigame",
  version: "1.0.0",
  permission: 0,
  credits: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "Guess the emoji!",
  prefix: true,
  category: "game",
  usages: "/emojigame",
  cooldowns: 7,
};

module.exports.run = async function({ api, event }) {
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  api.sendMessage(`🤔 এই ইমোজি টা চিনুন: ${emoji}\n\n— BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`, event.threadID);
};
