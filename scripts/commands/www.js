module.exports.config = {
  name: "www.js",
  version: "1.0.0",
  permission: 0,
  credits: "Shourov",
  description: "বট মালিকের তথ্য",
  prefix: true,
  category: "info",
  usages: "[owner]",
  cooldowns: 2,
};

module.exports.run = async ({ api, event }) => {
  const msg = `
👑 Bot Owner Info:
──────────────────
🔸 Name: Mohammad Shourov
🔹 GitHub: github.com/MOHAMMAD-SHOUROV
📞 Contact: facebook.com/100070297030133
  `;
  api.sendMessage(msg, event.threadID, event.messageID);
};
