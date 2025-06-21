const truths = ["আপনার ক্রাশ কে?", "সবার সামনে গালি দিয়েছেন কখন?", "আপনার সবচেয়ে বড় ভয় কী?"];
const dares = ["গ্রুপে কাউকে মেনশন করে প্রপোজ করুন", "নিজেকে গাধা বলুন", "এখনই একটা ফানি মিম দিন"];

module.exports.config = {
  name: "truthdare",
  version: "1.0.0",
  permission: 0,
  credits: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "Truth or Dare game",
  prefix: true,
  category: "game",
  usages: "/truthdare",
  cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
  const pick = Math.random() < 0.5 ? "Truth" : "Dare";
  const content = pick === "Truth" ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)];
  api.sendMessage(`🎯 ${pick}:\n${content}\n\n— BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`, event.threadID);
};
