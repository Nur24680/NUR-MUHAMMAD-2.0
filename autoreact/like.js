module.exports.config = {
  name: "autoreact",
  version: "1.0.0",
  credits: "Shourov",
  description: "প্রতিটি মেসেজে অটো ❤️ বা 👍 রিঅ্যাকশন দেয়",
  hasPermission: 0,
  commandCategory: "fun",
  usages: "autoreact",
  cooldowns: 0
};

const REACT_LIST = ["❤️", "👍", "😆", "😮", "😢", "😡"];

module.exports.handleEvent = async function({ api, event }) {
  if (!event.body || event.senderID == api.getCurrentUserID()) return;

  const randomReact = REACT_LIST[Math.floor(Math.random() * REACT_LIST.length)];
  api.setMessageReaction(randomReact, event.messageID, (err) => {}, true);
};

module.exports.run = () => {};
