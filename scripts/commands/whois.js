module.exports.config = {
  name: "whois",
  version: "1.0.0",
  permission: 0,
  credits: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "Mention করলে তার ইউজার তথ্য দেখাবে",
  prefix: true,
  category: "info",
  usages: "@mention",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  const { mentions, threadID, messageID } = event;
  const mentionID = Object.keys(mentions)[0];

  if (!mentionID) return api.sendMessage("⚠️ একজনকে mention করো!", threadID, messageID);

  const userInfo = await api.getUserInfo(mentionID);
  const name = userInfo[mentionID].name;
  const gender = userInfo[mentionID].gender === 1 ? "👩 Female" : "👨 Male";
  const profileUrl = `https://facebook.com/${mentionID}`;

  const msg = `
🔎 User Info:
👤 নাম: ${name}
🆔 UID: ${mentionID}
📎 লিংক: ${profileUrl}
⚧️ জেন্ডার: ${gender}
  `;

  return api.sendMessage(msg, threadID, messageID);
};
