module.exports.config = {
  name: "respectadmin",
  version: "1.0.0",
  permission: 0,
  credits: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "Say thanks to admin",
  prefix: false,
  category: "fun",
  usages: "",
  cooldowns: 3,
};

module.exports.handleEvent = function({ api, event }) {
  const { senderID, body, threadID } = event;
  const text = body?.toLowerCase();
  if (text?.includes("thank you admin") || text?.includes("thanks admin")) {
    api.sendMessage(`❤️ গ্রুপের অ্যাডমিনদের প্রতি শ্রদ্ধা রইল!\n— BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`, threadID);
  }
};
