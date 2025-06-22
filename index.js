const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const login = require("facebook-chat-api");

// === Global Config Load ===
global.config = require("./config/config.json");

// === Load Cookie (appstate) ===
const appState = require("./config/appstate.json");

login({ appState }, async (err, api) => {
  if (err) return console.error(chalk.red("[❌] Login Failed:"), err);
  console.log(chalk.green("[✅] Login Successful!"));

  // === Global Setup ===
  global.api = api;
  global.commands = new Map();
  global.events = new Map();

  // === Set Bot Options ===
  api.setOptions({
    listenEvents: true,
    selfListen: false,
    logLevel: "silent"
  });

  // === Load Commands ===
  const commandPath = path.join(__dirname, "scripts", "commands");
  for (const file of fs.readdirSync(commandPath).filter(f => f.endsWith(".js"))) {
    const command = require(path.join(commandPath, file));
    if (command.config?.name) {
      global.commands.set(command.config.name, command);
      console.log(chalk.blue(`[📦] Loaded command: ${command.config.name}`));
    }
  }

  // === Load Events ===
  const eventPath = path.join(__dirname, "scripts", "events");
  for (const file of fs.readdirSync(eventPath).filter(f => f.endsWith(".js"))) {
    const event = require(path.join(eventPath, file));
    if (event.config?.name && typeof event.run === "function") {
      global.events.set(event.config.name, event);
      console.log(chalk.yellow(`[⚡] Loaded event: ${event.config.name}`));
    }
  }

  // === Listen to Messages ===
  api.listenMqtt(async (err, event) => {
    if (err) return console.error(chalk.red("[❌] Listen Error:"), err);
    if (event.type !== "message" && event.type !== "message_reply") return;

    const body = event.body || "";
    const prefix = global.config.PREFIX || "/";
    if (body.startsWith(prefix)) {
      const args = body.slice(prefix.length).trim().split(/ +/);
      const cmdName = args.shift().toLowerCase();
      const command = global.commands.get(cmdName);
      if (command) {
        try {
          await command.run({ api, event, args });
        } catch (err) {
          console.error(chalk.red(`[❌] Error in command "${cmdName}":`), err);
          api.sendMessage("❌ কমান্ড চালাতে সমস্যা হচ্ছে!", event.threadID);
        }
      }
    }

    // === Handle No-Prefix Features ===
    for (const [name, cmd] of global.commands) {
      if (typeof cmd.handleEvent === "function") {
        try {
          await cmd.handleEvent({ api, event });
        } catch (err) {
          console.error(chalk.red(`[❌] Error in handleEvent of ${name}:`), err);
        }
      }
    }
  });
});
