module.exports.config = {
  name: "logs",
  eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name"],
  version: "1.0.0",
  credits: "Shourov",
  description: "Record bot activity notifications",
  envConfig: {
    enable: true
  }
};

const moment = require("moment-timezone");

module.exports.run = async function({ api, event, Threads }) {
  if (!global.configModule[this.config.name]?.enable) return;

  const logger = require("../../shourov/catalogs/shourovlog.js"); // Path adjust koren
  const threadID = event.threadID;
  const authorID = event.author;
  let task = "";

  switch (event.logMessageType) {
    case "log:thread-name": {
      const oldName = (await Threads.getData(threadID)).name || "Unknown";
      const newName = event.logMessageData.name || "Unknown";
      task = `📝 Group name changed:\nFrom ➤ '${oldName}'\nTo ➤ '${newName}'`;
      await Threads.setData(threadID, { name: newName });
      break;
    }

    case "log:subscribe": {
      if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        task = "✅ Bot added to a new group!";
      }
      break;
    }

    case "log:unsubscribe": {
      if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) {
        task = "⚠️ Bot was removed from the group!";
      }
      break;
    }

    default:
      break;
  }

  if (task.length == 0) return;

  const time = moment.tz("Asia/Dhaka").format("HH:mm:ss | DD-MM-YYYY");
  const report = 
`📌 𝗕𝗢𝗧 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 📌
━━━━━━━━━━━━━━
📍 Thread ID: ${threadID}
👤 Author ID : ${authorID}
🕰️ Time      : ${time}
📘 Action    : ${task}
━━━━━━━━━━━━━━`;

  return api.sendMessage(report, global.config.ADMINBOT[0], (err) => {
    if (err) return logger("❌ Error sending log", err);
  });
};
