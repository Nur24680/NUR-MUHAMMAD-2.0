module.exports.config = {
  name: "tagall",
  version: "1.0.0",
  permission: 1,
  credits: "Shourov",
  description: "Mention all group members",
  prefix: true,
  category: "group",
  usages: "/tagall",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event }) {
  const threadInfo = await api.getThreadInfo(event.threadID);
  const mentions = threadInfo.participantIDs.map(id => ({
    tag: "🔔",
    id
  }));
  
  api.sendMessage({
    body: "🔔 Tagging all members!",
    mentions
  }, event.threadID);
};
