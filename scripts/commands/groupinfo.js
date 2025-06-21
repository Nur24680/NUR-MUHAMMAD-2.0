module.exports.config = {
  name: "groupinfo",
  version: "1.0.0",
  permission: 0,
  credits: "Shourov",
  description: "গ্রুপের বিস্তারিত তথ্য দেখায়",
  prefix: true,
  category: "group",
  usages: "[groupinfo]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  try {
    const threadInfo = await api.getThreadInfo(event.threadID);
    const adminIDs = threadInfo.adminIDs.map(e => e.id);
    const genderCount = { male: 0, female: 0, unknown: 0 };

    const membersInfo = await Promise.all(threadInfo.participantIDs.map(id =>
      api.getUserInfo(id).then(info => info[id])
    ));

    membersInfo.forEach(user => {
      if (user.gender === 1) genderCount.female++;
      else if (user.gender === 2) genderCount.male++;
      else genderCount.unknown++;
    });

    const msg = `
👥 গ্রুপ তথ্য:
────────────────────
📌 নাম: ${threadInfo.threadName}
🆔 ID: ${event.threadID}
👤 মোট সদস্য: ${threadInfo.participantIDs.length}
👮 অ্যাডমিন সংখ্যা: ${adminIDs.length}
🙋‍♂️ ছেলে: ${genderCount.male}
🙋‍♀️ মেয়ে: ${genderCount.female}
🤖 অজানা: ${genderCount.unknown}
📷 কভার ছবি: ${threadInfo.imageSrc ? threadInfo.imageSrc : "নেই"}
`;

    api.sendMessage(msg, event.threadID, event.messageID);
  } catch (err) {
    console.error("❌ groupinfo error:", err);
    api.sendMessage("⚠️ গ্রুপ তথ্য আনতে সমস্যা হয়েছে।", event.threadID, event.messageID);
  }
};
