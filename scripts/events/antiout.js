module.exports.config = {
  name: "antiout",
  eventType: ["log:unsubscribe"],
  version: "1.0.1",
  credits: "Shourov",
  description: "Automatically re-add members who leave the group"
};

module.exports.run = async ({ event, api, Threads, Users }) => {
  try {
    if (!event || !event.logMessageData || !event.threadID) return;

    const threadID = event.threadID;
    const userID = event.logMessageData.leftParticipantFbId;

    if (!userID) return;

    // যদি বট নিজে group থেকে বের হয়, কিছু না করে ফেরত যাক
    const botID = api.getCurrentUserID();
    if (userID === botID) return;

    const threadData = (await Threads.getData(threadID))?.data || {};
    if (threadData.antiout === false) return;

    // ইউজারের নাম বের করা
    const userName =
      global.data?.userName?.get(userID) ||
      (await Users.getNameUser(userID)) ||
      "একজন সদস্য";

    // সে নিজে বের হয়েছে কিনা না কি কেউ বের করে দিয়েছে
    const isSelfOut = event.author === userID;

    if (!isSelfOut) return;

    api.addUserToGroup(userID, threadID, (err) => {
      if (err) {
        return api.sendMessage(
          `❌ ${userName} কে আবার অ্যাড করা গেল না। হয়ত সে বটকে ব্লক করেছে বা তার প্রোফাইলে মেসেজ অপশন বন্ধ।`,
          threadID
        );
      }

      api.sendMessage(
        `😈 ${userName}, তুমি পালাতে পারবে না! আবার তোমায় আনলাম!`,
        threadID
      );
    });

  } catch (err) {
    console.error("❌ [ANTI-OUT ERROR]", err);
  }
};
