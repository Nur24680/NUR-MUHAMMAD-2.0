module.exports.config = {
  name: "antibotname",
  eventType: ["log:user-nickname"],
  version: "1.0.0",
  credits: "Shourov",
  description: "Protect bot nickname from being changed"
};

module.exports.run = async function({ api, event, Users, Threads }) {
  const { logMessageData, threadID, author } = event;
  const botID = api.getCurrentUserID();
  const { BOTNAME, ADMINBOT, PREFIX } = global.config;
  
  const threadData = await Threads.getData(threadID);
  const nickname = `『 ${PREFIX} 』• ${BOTNAME}`;

  // যদি কেউ বটের নাম পরিবর্তন করে এবং সে অ্যাডমিন না হয়
  if (
    logMessageData.participant_id === botID &&
    author !== botID &&
    !ADMINBOT.includes(author) &&
    logMessageData.nickname !== nickname
  ) {
    await api.changeNickname(nickname, threadID, botID);
    const userInfo = await Users.getData(author);
    return api.sendMessage(
      `[WARNING ⚠️] ${userInfo.name} — you are not allowed to change the bot nickname!`,
      threadID
    );
  }
};
