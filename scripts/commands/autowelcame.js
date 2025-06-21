const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

module.exports.config = {
  name: "autowelcome",
  version: "2.1.0",
  permission: 0,
  credits: "𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
  description: "নতুন সদস্য এলে স্বাগতম জানায় + প্রোফাইল পিকসহ ওয়েলকাম GIF",
  eventType: ["log:subscribe"]
};

module.exports.run = async function ({ api, event }) {
  const threadID = event.threadID;
  const addedUsers = event.logMessageData.addedParticipants;

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const groupName = threadInfo.threadName || "আমাদের গ্রুপ";

    for (const user of addedUsers) {
      const userID = user.userFbId;
      const userName = user.fullName;

      const welcomeText = 
`🌟 ━━━━━━━━━━━━━━ 🌟
🎉 হ্যালো ${userName}!

❤️ "${groupName}" পরিবারে আপনাকে জানাই আন্তরিক স্বাগতম!

🤝 আশা করি আপনি আমাদের সাথে চমৎকার সময় কাটাবেন।
💬 কিছু জানতে চাইলে নির্দ্বিধায় বলবেন।

🤖 BOT OWNER: 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯
🌟 ━━━━━━━━━━━━━━ 🌟`;

      // 🖼️ প্রোফাইল ছবি নামিয়ে নেওয়া
      const profilePicUrl = `https://graph.facebook.com/${userID}/picture?height=720&width=720&access_token=350685531728|62f8ce9f74b12f84c123cc23437a4a32`;
      const imgPath = path.join(__dirname, "cache", `${userID}_pfp.jpg`);

      const res = await axios.get(profilePicUrl, { responseType: "arraybuffer" });
      fs.ensureDirSync(path.join(__dirname, "cache"));
      fs.writeFileSync(imgPath, Buffer.from(res.data, "binary"));

      // 🖼️ Welcome GIF
      const gifPath = path.join(__dirname, "welcome.gif");

      // 🔁 Attach both image & gif
      const attachments = [
        fs.createReadStream(imgPath),
        fs.createReadStream(gifPath)
      ];

      // 📤 Send message with both attachments
      api.sendMessage({
        body: welcomeText,
        attachment: attachments
      }, threadID, () => {
        // ✅ Delete cache after sending
        fs.unlinkSync(imgPath);
      });
    }
  } catch (err) {
    console.error("❌ Welcome Error:", err);
  }
};
