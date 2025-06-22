module.exports.config = {
  name: "start",
  version: "1.0.0",
  permission: 0,
  credits: "King_Shourov",
  description: "Check bot is alive or not",
  prefix: true,
  category: "utility",
  usages: "",
  cooldowns: 3,
};

module.exports.run = async ({ api, event }) => {
  return api.sendMessage("✅ Shourov Bot is Alive, Running Successfully!", event.threadID, event.messageID);
};
