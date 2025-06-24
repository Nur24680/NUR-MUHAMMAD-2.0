const login = require("fca-unofficial");
const fs = require("fs");
const path = require("path");

const appStatePath = path.join(__dirname, "config", "appstate.json");

if (!fs.existsSync(appStatePath)) {
    console.error("⚠️ appstate.json ফাইল config ফোল্ডারে নেই!");
    process.exit(1);
}

const appState = require(appStatePath);

login({ appState }, (err, api) => {
    if (err) return console.error("লগইন এরর:", err);

    console.log("✅ বট অন হয়েছে!");

    api.setOptions({
        listenEvents: true,
        selfListen: false,
    });

    const listen = require("fca-unofficial").listenMqtt;
    listen(api, (err, event) => {
        if (err) return console.error(err);

        const handleMessage = require("./scripts/events/message.js");
        handleMessage({ api, event });
    });
});
