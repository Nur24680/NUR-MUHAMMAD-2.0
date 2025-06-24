module.exports = {
  config: {
    name: "ready",
    isInit: true // ✅ যাতে শুধু বট চালুর সময় একবারই চলে
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

    // ✅ এইখানে notifyThreadID তে নিজের আইডি না দিয়ে একটা টেস্ট গ্রুপ আইডি দাও
    const notifyThreadID = "1234567890123456"; // 🔁 এখানে Group Chat ID বসাও
    const message = `✅ SHOUROV-BOT চালু হয়েছে!\n🕒 সময়: ${now}`;

    try {
      if (notifyThreadID) {
        await api.sendMessage(message, notifyThreadID);
        console.log("📢 Notify message sent.");
      } else {
        console.log("⚠️ No notifyThreadID set.");
      }
    } catch (err) {
      console.error("❌ Notify পাঠাতে সমস্যা:", err);
    }
  }
};
