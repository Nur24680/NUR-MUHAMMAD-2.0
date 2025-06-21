module.exports.config = {
  name: "roast",
  version: "1.0.0",
  permission: 0,
  credits: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "জাস্ট মজা করে roast করে",
  prefix: true,
  category: "fun",
  usages: "@mention",
  cooldowns: 10,
};

const roasts = [
  "🤡 ভাইরে ভাই, এইটার মতো আরেকটা বোকা খুঁজলে NASA তেও পাওয়া যাবে না!",
  "💀 ওরে দেখলেই antivirus detect করে ভাই!",
  "🐸 তোকে দেখলেই লগে পড়ে, 'মিম বানাই মিম!'",
  "📢 এইটা joke না, joke এর inspiration!",
  "🎯 তুই থাকলে group এর IQ কমে যায় ভাই!"
];

module.exports.run = async ({ api, event }) => {
  const { mentions, threadID, messageID } = event;
  const mentionID = Object.keys(mentions)[0];

  if (!mentionID) return api.sendMessage("⚠️ একজনকে mention করো roast করতে!", threadID, messageID);

  const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
  return api.sendMessage(`🔊 ${mentions[mentionID].replace("@", "")}, ${randomRoast}`, threadID, messageID);
};
