module.exports.config = {
  name: "shourov151",
  version: "1.0.0",
  permission: 0,
  credits: "Shourov",
  description: "বর্তমান সময় বলে",
  prefix: true,
  category: "utility",
  usages: "[time]",
  cooldowns: 3,
};

module.exports.run = async ({ api, event }) => {
  const date = new Date();
  const timeString = date.toLocaleString("en-BD", {
    timeZone: "Asia/Dhaka",
    hour12: true,
  });
  api.sendMessage(`⏰ এখন সময়: ${timeString}`, event.threadID, event.messageID);
};
