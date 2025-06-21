module.exports.config = {
  name: "loveu",
  version: "1.0.0",
  permission: 0,
  credits: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "ভালোবাসার রিপ্লাই",
  prefix: true,
  category: "fun",
  usages: "/loveu",
  cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
  return api.sendMessage(`😻 আমিও তোমাকে ভালোবাসি! তুমি অসাধারণ 🥰\n\n- BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`, event.threadID, event.messageID);
}
