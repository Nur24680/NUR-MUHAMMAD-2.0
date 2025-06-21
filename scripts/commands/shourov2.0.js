module.exports.config = {
  name: "shourov2.0",
  version: "1.0.0",
  permission: 0,
  credits: "Shourov",
  description: "সকল কমান্ডের তালিকা দেখায়",
  prefix: true,
  category: "system",
  usages: "[help]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  const msg = `
📚 Available Commands:
─────────────────────
📘 help - এই মেসেজ দেখাবে
⌚ time - বর্তমান সময়
👑 owner - বট নির্মাতার তথ্য
`;

  api.sendMessage(msg, event.threadID, event.messageID);
};
