module.exports.config = {
  name: "pings",
  description: "Check if the bot is online",
  usage: "ping"
};

module.exports.run = async ({ api, event, args }) => {
  api.sendMessage("🏓 Pong!", event.threadID, event.messageID);
};
