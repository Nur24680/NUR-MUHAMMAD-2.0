module.exports.config = {
  name: "callMyName",
  version: "2.0.0",
  permission: 0,
  credits: "𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "নামের ডাক শুনে বায়ো ও ছবি সহ রিপ্লাই দেয়",
  eventType: ["message"]
};

module.exports.run = async function ({ event, api }) {
  const message = event.body?.toLowerCase();
  if (!message) return;

  const keywords = ["সৌরভ", "shourov", "SHOUROV", "Shourov", "king", "KING"];
  if (keywords.some(keyword => message.includes(keyword))) {
    const userId = "100070297030133"; // আপনার Facebook UID
    const axios = require("axios");
    const fs = require("fs-extra");
    const imgPath = __dirname + "/shourov_avatar.jpg";

    const replyText = `
👑 আমার Boss **𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯** এখন ব্যস্ত আছেন। দয়া করে পরে আবার ডাকুন।

📘 নামঃ 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯
🔗 ফেসবুকঃ https://www.facebook.com/www.xsxx.com365
    `.trim();

    try {
      const res = await axios.get(`https://graph.facebook.com/${userId}/picture?width=720&height=720`, {
        responseType: "arraybuffer"
      });
      fs.writeFileSync(imgPath, Buffer.from(res.data, "binary"));

      api.sendMessage({
        body: replyText,
        attachment: fs.createReadStream(imgPath)
      }, event.threadID, () => fs.unlinkSync(imgPath), event.messageID);
    } catch (err) {
      console.error("🛑 Image fetch error:", err);
      api.sendMessage(replyText, event.threadID, event.messageID);
    }
  }
};
