module.exports = {
  config: {
    name: "ready"
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

    // === Notify a group or user ===
    const notifyThreadID = "100070297030133"; // তোমার ফেসবুক আইডি / গ্রুপ আইডি বসাও এখানে
    const message = `✅ SHOUROV-BOT চালু হয়েছে!\n🕒 সময়: ${now}`;

    try {
      await api.sendMessage(message, notifyThreadID);
      console.log("📢 Notify message sent.");
    } catch (err) {
      console.error("❌ Notify পাঠাতে সমস্যা:", err);
    }

    // === চাইলে ভবিষ্যতে এখানে আরও automation add করা যাবে ===
  }
};
