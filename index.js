const login = require("fb-chat-api");
const fs = require("fs-extra");
const path = require("path");
require("dotenv").config();
const chalk = require("chalk");

const prefix = process.env.BOT_PREFIX || "/";
const appState = require("./config/appstate.json");

global.client = { commands: new Map(), events: [] };
global.data = { threadData: new Map(), userName: new Map() };

login({ appState }, (err, api) => {
  if (err) return console.error(chalk.red("❌ Login Failed:", err));
  console.log(chalk.green("✅ Shourov-Bot চালু হয়েছে!"));

  global.api = api;

api.listenMqtt(async (err, event) => {
  if (err) return console.error(err);
  // Event handle logic here
});

  // 🔁 Load Commands
  const commandFiles = fs.readdirSync('./scripts/commands').filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./scripts/commands/${file}`);
    global.client.commands.set(command.config.name, command);
    console.log(`📘 Loaded command: ${command.config.name}`);
  }

  // 🔁 Load Events
  const eventFiles = fs.readdirSync('./scripts/events').filter(file => file.endsWith('.js'));
  for (const file of eventFiles) {
    const event = require(`./scripts/events/${file}`);
    if (!event.config || !event.config.eventType) continue;
    global.client.events.push(event);
    console.log(`📗 Loaded event: ${event.config.name}`);
  }

  // 🧠 Listen for messages & events
  api.listenMqtt(async (err, event) => {
    if (err) return console.error(err);

    // 🔥 Handle events (log:subscribe, log:unsubscribe, etc.)
    for (const evt of global.client.events) {
      if (evt.config.eventType.includes(event.type)) {
        try {
          await evt.run({ event, api });
        } catch (e) {
          console.error(`❌ Error in event ${evt.config.name}:`, e);
        }
      }
    }

    // 💬 Handle commands
    if (event.body && event.body.startsWith(prefix)) {
      const args = event.body.slice(prefix.length).trim().split(/ +/);
      const cmdName = args.shift().toLowerCase();
      const cmd = global.client.commands.get(cmdName);
      if (cmd) {
        try {
          await cmd.run({ api, event, args });
        } catch (e) {
          console.error(`❌ Error in command ${cmdName}:`, e);
        }
      }
    }
  });
});
