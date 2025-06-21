module.exports.config = {
  name: "autoseen",
  version: "1.0.0",
  credits: "Shourov",
  description: "সব মেসেজ অটো Seen করে",
  hasPermission: 0,
  commandCategory: "utility",
  usages: "autoseen",
  cooldowns: 0
};

module.exports.handleEvent = async function({ event, api }) {
  if (!event.isGroup && event.senderID != api.getCurrentUserID()) {
    api.markAsSeen(event.threadID);
  }
};

module.exports.run = function() {};
