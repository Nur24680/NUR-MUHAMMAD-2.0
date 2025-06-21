module.exports.config = {
  name: "developer",
  version: "1.0.0",
  permission: 0,
  credits: "King_Shourov",
  description: "বট ডেভেলপারের তথ্য",
  prefix: true,
  category: "info",
  usages: "",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
  api.sendMessage(
    `👨‍💻 বটটি তৈরি করেছেন:\n𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯\n📧 Contact: t.me/king_shourov\n🌐 GitHub: github.com/MOHAMMAD-SHOUROV\n\n— BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`,
    event.threadID
  );
};
