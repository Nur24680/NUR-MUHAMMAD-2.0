module.exports.config = {
  name: "gifreplay",
  version: "1.0.0",
  permission: 0,
  credits: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "Reply with a gif",
  prefix: false,
  category: "fun",
  usages: "",
  cooldowns: 10,
};

module.exports.handleEvent = function({ api, event }) {
  const { threadID, body } = event;
  if (body?.toLowerCase().includes("wow")) {
    const gif = "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif";
    api.sendMessage({ body: "😲 তুমি খুবই আশ্চর্য করছো!\n\n— BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯", attachment: gif }, threadID);
  }
};
