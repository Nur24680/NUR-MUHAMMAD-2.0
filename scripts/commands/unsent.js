module.exports.config = {
  name: "antiunsend",
  eventType: ["message", "message_unsend"],
  version: "1.0.0",
  credits: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "Unsend করলে আবার সেই মেসেজ রিভেল করে",
};

const messageStore = new Map();

module.exports.run = async function({ api, event }) {
  const { threadID, messageID, type, senderID } = event;

  if (type === "message") {
    // মেসেজ সংরক্ষণ
    messageStore.set(messageID, {
      body: event.body || "[media/file]",
      senderID: senderID,
    });
  }

  if (type === "message_unsend") {
    const msgData = messageStore.get(messageID);
    if (!msgData) return;

    const userName = await api.getUserInfo(senderID).then(info => info[senderID].name);
    const restoredMsg = `🚨 ${userName} একটি মেসেজ ডিলিট করেছে:\n\n🗨️ ${msgData.body}\n\n— BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`;

    api.sendMessage(restoredMsg, threadID);
    messageStore.delete(messageID);
  }
};
