const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("📥 Facebook Cookie (one-line string) দিন:\n");

rl.question("🍪 Cookie: ", (cookieInput) => {
  const parts = cookieInput.split(";").map(part => part.trim());
  const appState = [];

  for (const part of parts) {
    const [key, value] = part.split("=");
    if (key && value) {
      appState.push({
        key,
        value,
        domain: "facebook.com",
        path: "/",
        hostOnly: false,
        httpOnly: false,
        secure: true
      });
    }
  }

  const filePath = "./config/appstate.json";
  fs.writeFileSync(filePath, JSON.stringify(appState, null, 2));
  console.log(`✅ appstate.json তৈরি হয়েছে: ${filePath}`);
  rl.close();
});
