module.exports.config = {
  name: "birthday",
  version: "1.0.0",
  permission: 0,
  credits: "King_Shourov",
  description: "শুভ জন্মদিনের শুভেচ্ছা দেয়",
  prefix: true,
  category: "wish",
  usages: "[name]",
  cooldowns: 3,
};

module.exports.run = async ({ api, event, args }) => {
  const name = args.join(" ") || "প্রিয় বন্ধু";
  const msg = `🎂 শুভ জন্মদিন ${name}!\n\nতোমার জীবনে আসুক সুখ, শান্তি ও সাফল্য।\n\n— BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`;
  return api.sendMessage(msg, event.threadID, event.messageID);
};
