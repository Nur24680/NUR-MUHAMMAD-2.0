module.exports.config = {
  name: "antiout",
  eventType: ["log:unsubscribe"],
  version: "1.0.1",
  credits: "Shourov",
  description: "Automatically re-add members who leave the group"
};

module.exports.run = async ({ event, api, Threads, Users }) => {
  try {
    // Event null হলে বা দরকারি ডেটা না থাকলে স্কিপ করো
    if (!event?.logMessageData?.leftParticipantFbId || !event.threadID) return;

    const threadID = event.threadID;
    const userID = event.logMessageData.leftParticipantFbId;

    // বট নিজে বের হলে কিছু করো না
    const botID = api.getCurrentUserID();
    if (userID === botID) return;

    // Anti-out সক্রিয় কিনা চেক করো
    const threadData = (await Threads.getData(threadID))?.data || {};
    if (threadData.antiout === false) return;

    // নাম বের করো
    const userName =
      global.data?.userName?.get(userID) ||
      (await Users.getNameUser(userID)) ||
      "একজন সদস্য";

    // নিজে বের হয়েছে কিনা
    const isSelfOut = event.author === userID;
    if (!isSelfOut) return;

    // আবার গ্রুপে অ্যাড করো
    api.addUserToGroup(userID, threadID, (err) => {
      if (err) {
        return api.sendMessage(
          `❌ ${userName} কে আবার অ্যাড করা গেল না। হয়ত সে বটকে ব্লক করেছে বা তার প্রোফাইলে মেসেজ অপশন বন্ধ।`,
          threadID
        );
      }

      return api.sendMessage(
        `😈 ${userName}, তুমি পালাতে পারবে না! আবার তোমায় আনলাম!`,
        threadID
      );
    });

  } catch (err) {
    console.error("❌ [ANTI-OUT ERROR]", err);
  }
};
