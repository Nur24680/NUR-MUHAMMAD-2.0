const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");

// Cookie-based facebook-chat-api
const { listenMqtt } = require("facebook-chat-api");

// Load appstate (cookie)
const appState = require("appstate.json");

listenMqtt({ appState }, async (err, api) => {
  if (err) {
    console.error(chalk.red("[❌] Login Failed:"), err);
    return;
  }

  console.log(chalk.green("[✅] Login Successful!"));

  // === Global Setup ===
  global.api = api;
  global.commands = new Map();
  global.events = new Map();

  // === Set Options ===
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
    if (command.config && command.config.name) {
      global.commands.set(command.config.name, command);
      console.log(chalk.blue(`[📦] Loaded command: ${command.config.name}`));
    }
  }

  // === Load Events ===
  const eventPath = path.join(__dirname, "scripts", "events");
  const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(path.join(eventPath, file));
    if (event.config && event.config.name && typeof event.run === "function") {
      global.events.set(event.config.name, event);
      console.log(chalk.yellow(`[⚡] Loaded event: ${event.config.name}`));
    }
  }

  // === Message Handler ===
  api.listenMqtt(async (err, event) => {
    if (err) return console.error(chalk.red("[❌] Listen Error:"), err);
    if (event.type !== "message" && event.type !== "message_reply") return;

    const body = event.body || "";
    const prefix = "/"; // command prefix
    if (!body.startsWith(prefix)) return;

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
  });
});
