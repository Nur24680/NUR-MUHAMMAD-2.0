module.exports.config = {
  name: "admininfo",
  version: "1.0.0",
  permission: 0,
  credits: "Shourov",
  description: "Shows list of group admins",
  prefix: true,
  category: "group",
  usages: "/admin",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const threadInfo = await api.getThreadInfo(event.threadID);
  const adminIDs = threadInfo.adminIDs.map(a => a.id);
  const nameMap = threadInfo.userInfo.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});
  const adminNames = adminIDs.map(id => nameMap[id] || "Unknown");

  const message = `👑 Group Admins:\n\n${adminNames.map((n, i) => `${i + 1}. ${n}`).join('\n')}`;
  api.sendMessage(message, event.threadID);
};
