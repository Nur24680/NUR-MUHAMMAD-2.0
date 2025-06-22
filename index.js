const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const login = require("facebook-chat-api");

// === Global Config Load ===
global.config = require("./config/config.json");

// === Load Cookie (appstate) ===
const appState = require("./config/appstate.json");

// === Login ===
login({ appState }, async (err, api) => {
  if (err) return console.error(chalk.red("[❌] Login Failed:"), err);
  console.log(chalk.green("[✅] Login Successful!"));

  // === Global Setup ===
  global.api = api;
  global.commands = new Map();
  global.events = new Map();

  // === Bot Options ===
  api.setOptions({
    listenEvents: true,
    selfListen: false,
    logLevel: "silent"
  });

  // === Load Commands ===
  const commandPath = path.join(__dirname, "scripts", "commands");
  const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(path.join(commandPath, file));
    if (command.config?.name) {
      global.commands.set(command.config.name, command);
      console.log(chalk.blue(`[📦] Loaded command: ${command.config.name}`));
    }
  }

  // === Load Events ===
  const eventPath = path.join(__dirname, "scripts", "events");
  const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith(".js"));
  for (const file of eventFiles) {
    const event = require(path.join(eventPath, file));
    if (event.config?.name && typeof event.run === "function") {
      global.events.set(event.config.name, event);
      console.log(chalk.yellow(`[⚡] Loaded event: ${event.config.name}`));
    }
  }

  // === Listen to Messages ===
  api.listenMqtt(async (err, event) => {
    if (err) return console.error(chalk.red("[❌] Listen Error:"), err);
    if (!["message", "message_reply"].includes(event.type)) return;

    const body = event.body || "";
    const prefix = global.config.PREFIX || "/";

    // === Command (with prefix) ===
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

    // === No-Prefix Features (handleEvent) ===
    for (const [name, cmd] of global.commands) {
      if (typeof cmd.handleEvent === "function") {
        try {
          await cmd.handleEvent({ api, event });
        } catch (err) {
          console.error(chalk.red(`[❌] Error in handleEvent of "${name}":`), err);
        }
      }
    }
  });
});
