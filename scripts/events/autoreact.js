module.exports.config = {
  name: "autoreact",
  version: "1.0.0",
  permission: 0,
  credits: "𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "সব মেসেজে অটো রিয়্যাকশন দেয়",
  eventType: ["message"]
};

const emojiList = ["❤️", "😂", "😆", "👍", "🔥", "😎", "😍", "💀", "🤖", "🤩"];

module.exports.run = async function ({ api, event }) {
  const { messageID } = event;
  if (!messageID) return;

  // র‍্যান্ডম একটা ইমোজি নেবে
  const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];

  try {
    api.setMessageReaction(randomEmoji, messageID, () => {
  if (!event) return;
}, true);
  } catch (err) {
    console.error("❌ AutoReact Error:", err);
  }
};
