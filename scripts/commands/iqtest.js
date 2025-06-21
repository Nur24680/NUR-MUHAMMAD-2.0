module.exports.config = {
  name: "iqtest",
  version: "1.0.0",
  permission: 0,
  credits: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "Test your IQ",
  prefix: true,
  category: "game",
  usages: "/iqtest",
  cooldowns: 10,
};

module.exports.run = async function({ api, event }) {
  const iq = Math.floor(Math.random() * 80) + 80;
  const msg = `🧠 আপনার আইকিউ রেজাল্ট: ${iq}/160\n\n😎 আপনি ${iq > 120 ? 'Genius' : iq > 100 ? 'Smart' : 'Need practice!'}\n\n— BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`;
  api.sendMessage(msg, event.threadID);
};
