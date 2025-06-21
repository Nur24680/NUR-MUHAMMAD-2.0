module.exports.config = {
  name: "warning",
  version: "1.0.0",
  permission: 0,
  credits: "King_Shourov",
  description: "গ্রুপে ওয়ার্ন বার্তা পাঠাবে",
  prefix: true,
  category: "moderation",
  usages: "[@mention]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { mentions } = event;
  const names = Object.values(mentions).map(u => u);
  if (names.length === 0) {
    return api.sendMessage(`⚠️ দয়া করে কাউকে মেনশন করুন যাকে ওয়ার্ন করতে চান।`, event.threadID);
  }

  const tag = Object.keys(mentions)[0];
  api.sendMessage({
    body: `⚠️ ${names[0]} আপনি গ্রুপ রুল ভাঙছেন! দয়া করে সতর্ক থাকুন!\n\n— BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`,
    mentions: [{ id: tag, tag: names[0] }]
  }, event.threadID);
};
