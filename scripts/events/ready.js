module.exports = {
  config: {
    name: "ready",
    isInit: true // বট চালুর সময় একবারই চলে
  },

  run: async ({ api }) => {
    const now = new Date().toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      hour12: true,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    console.log(`🤖 SHOUROV-BOT is ready at ${now}`);

    // 🟡 নিচের আইডি টা টেস্ট করার জন্যে একটি গ্রুপ আইডি হওয়া উচিত
    const notifyThreadID = "1234567890123456"; // 🛠️ এখানে তোমার Facebook Group Chat ID বসাও

    const message = `✅ SHOUROV-BOT চালু হয়েছে!\n🕒 সময়: ${now}`;

    if (!notifyThreadID || typeof notifyThreadID !== "string") {
      return console.log("⚠️ notifyThreadID সেট করা হয়নি বা ভুল টাইপ!");
    }

    try {
      await api.sendMessage(message, notifyThreadID);
      console.log("📢 Notify message sent.");
    } catch (err) {
      console.error("❌ Notify পাঠাতে সমস্যা:", err.message || err);
    }
  }
};
