const login = require("facebook-chat-api");
const fs = require("fs");
const axios = require("axios");

// Cookie ফাইল লোড করুন
const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));

login({ appState }, (err, api) => {
  if (err) return console.error("Login error:", err);

  console.log("✅ Bot is now listening...");

  api.listenMqtt((err, message) => {
    if (err) return console.error("Listen error:", err);

    // Webhook এ মেসেজ পাঠান
    axios.post("https://fb-webhook-bot-mjxc.vercel.app/api/webhook", {
      senderID: message.senderID,
      threadID: message.threadID,
      body: message.body
    })
    .then(() => console.log("📩 Webhook sent"))
    .catch(err => console.error("❌ Webhook Error:", err));
  });
});
