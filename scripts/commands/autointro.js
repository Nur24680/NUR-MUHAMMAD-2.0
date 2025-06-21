module.exports.config = {
  name: "autointro",
  version: "1.0.0",
  permission: 0,
  credits: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "নতুন কেউ লিখলে auto intro দেয়",
  eventType: ["message"]
};

const greetedUsers = new Set();

module.exports.run = async ({ api, event }) => {
  const { senderID, threadID } = event;
  if (greetedUsers.has(senderID)) return;
  greetedUsers.add(senderID);

  const name = (await api.getUserInfo(senderID))[senderID].name;

  const msg = `👋 হ্যালো ${name} ভাই/বোন! আমি 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯 এর bot।
আপনার মেসেজের জন্য ধন্যবাদ! 🤖`;

  return api.sendMessage(msg, threadID);
};
