const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "../config/raw-cookie.json");
const outputPath = path.join(__dirname, "../config/appstate.json");

const rawCookies = require(inputPath);

const keys = ["c_user", "xs", "fr", "sb", "datr"];
const appState = rawCookies
  .filter(cookie => keys.includes(cookie.key))
  .map(cookie => ({
    key: cookie.key,
    value: decodeURIComponent(cookie.value)
  }));

fs.writeFileSync(outputPath, JSON.stringify(appState, null, 2));
console.log("✅ Cookie converted to appstate successfully.");
