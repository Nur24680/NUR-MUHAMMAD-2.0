module.exports.config = {
  name: "night",
  version: "1.0.0",
  permission: 0,
  credits: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "শুভ রাত্রি জানায়",
  prefix: true,
  category: "fun",
  usages: "good night",
  cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
  return api.sendMessage(`🌙 শুভ রাত্রি! স্বপ্নে দেখা হবে 😴\n\n- BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`, event.threadID, event.messageID);
}
