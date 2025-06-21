module.exports.config = {
  name: "respect",
  version: "1.0.0",
  permission: 0,
  credits: "King_Shourov",
  description: "বট ও অ্যাডমিনকে সম্মান জানানো হবে",
  prefix: true,
  category: "special",
  usages: "",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
  api.sendMessage(
    `🌟 আপনি যদি বটকে সম্মান করেন, তবে আপনি একজন ভদ্র ব্যবহারকারী।\n\nধন্যবাদ ব্যবহার করার জন্য ❤️\n\n— BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`,
    event.threadID
  );
};
