module.exports.config = {
  name: "antiout",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "Shourov",
  description: "Automatically re-add members who leave the group"
};

module.exports.run = async ({ event, api, Threads, Users }) => {
  try {
    const threadID = event.threadID;
    const userID = event.logMessageData.leftParticipantFbId;

    const threadData = (await Threads.getData(threadID)).data || {};

    // যদি antiout বন্ধ থাকে
    if (threadData.antiout === false) return;

    // যদি বট নিজে group থেকে বের হয়, কিছু না করে ফেরত যাক
    if (userID === api.getCurrentUserID()) return;

    // ইউজারের নাম বের করা
    const userName = global.data.userName.get(userID) || await Users.getNameUser(userID);

    // সে নিজে বের হয়েছে কিনা না কি কেউ বের করে দিয়েছে
    const isSelfOut = event.author === userID;

    if (isSelfOut) {
      api.addUserToGroup(userID, threadID, async (error) => {
        if (error) {
          return api.sendMessage(
            `❌ ${userName} কে আবার অ্যাড করা গেল না। হয়ত সে বটকে ব্লক করেছে, অথবা তার প্রোফাইলে মেসেজ অপশন বন্ধ আছে।`,
            threadID
          );
        }

        return api.sendMessage(
          `😈 ${userName}, তুমি পালাতে পারবে না! আবার তোমায় আনলাম!`,
          threadID
        );
      });
    }
  } catch (err) {
    console.error("[ANTI-OUT ERROR]", err);
  }
};
