const login = require("../facebook-chat-api");
const express = require("express");
const fetch = require("node-fetch"); // fetch ব্যবহার করার জন্য

const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`📡 Bot API running on port ${PORT}`);
});

login({ appState: require("../config/appstate.json") }, (err, api) => {
  if (err) return console.error("❌ Login failed:", err);

  console.log("✅ Bot logged in");
  global.api = api;

  api.listenMqtt(async (err, event) => {
    if (err) return console.error("❌ Listen Error:", err);

    // Debug log: event details দেখতে
    console.log("📥 Event Received:", JSON.stringify(event, null, 2));

    // শুধু যদি মেসেজ আসে, তখনই Webhook-এ পাঠাবে
    if (event && event.type === "message" && event.body) {
      await fetch("https://fb-webhook-bot-mjxc.vercel.app/api/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          senderID: event.senderID,
          threadID: event.threadID,
          body: event.body
        })
      }).catch(err => console.error("❌ Webhook POST Error:", err));
    }
  });
});
