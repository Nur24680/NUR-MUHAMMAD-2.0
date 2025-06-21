module.exports.config = {
  name: "morning",
  version: "1.0.0",
  permission: 0,
  credits: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "সুপ্রভাত জানায়",
  prefix: true,
  category: "fun",
  usages: "morning",
  cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
  return api.sendMessage(`🌞 সুপ্রভাত! নতুন দিনের শুরু হোক হাসি আর ভালোবাসায় 💛\n\n- BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`, event.threadID, event.messageID);
}
