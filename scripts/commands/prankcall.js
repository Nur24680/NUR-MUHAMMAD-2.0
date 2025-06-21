module.exports.config = {
  name: "prankcall",
  version: "1.0.0",
  permission: 0,
  credits: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "Prank call message",
  prefix: true,
  category: "fun",
  usages: "/prankcall",
  cooldowns: 10,
};

module.exports.run = async function({ api, event }) {
  const msg = "📞 আপনার নম্বরে একটি ভুয়া কল এসেছে...\nনাম: GP সিম অফিস\nঅফার: 50GB @ ৫ টাকা 😅\n\n— BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯";
  api.sendMessage(msg, event.threadID);
};
