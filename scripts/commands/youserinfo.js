module.exports.config = {
  name: "userinfo",
  version: "1.0.0",
  permission: 0,
  credits: "Shourov",
  description: "Get information about a user",
  prefix: true,
  category: "info",
  usages: "/userinfo",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const uid = event.type === "message_reply" ? event.messageReply.senderID : event.senderID;
  const userInfo = await api.getUserInfo(uid);
  const user = userInfo[uid];

  const message = `👤 User Info:
- Name: ${user.name}
- UID: ${uid}
- Gender: ${user.gender === 1 ? 'Female' : 'Male'}
- Profile URL: https://facebook.com/${uid}`;

  api.sendMessage(message, event.threadID, event.messageID);
};
