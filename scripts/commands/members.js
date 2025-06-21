module.exports.config = {
  name: "members",
  version: "1.0.0",
  permission: 0,
  credits: "Shourov",
  description: "Show total group members",
  prefix: true,
  category: "group",
  usages: "/members",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const threadInfo = await api.getThreadInfo(event.threadID);
  api.sendMessage(`👥 Total group members: ${threadInfo.participantIDs.length}`, event.threadID);
};
