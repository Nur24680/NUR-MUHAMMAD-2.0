const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "fbcover",
    version: "1.0.0",
    permission: 0,
    credits: "King_Shourov",
    description: "Generate a custom Facebook cover using your name",
    prefix: true,
    category: "tools",
    usages: "[name]",
    cooldowns: 5
  },

  run: async function({ api, event, args }) {
    const name = args.join(" ") || "King_Shourov";

    const threadID = event.threadID;
    const messageID = event.messageID;

    try {
      // Load background cover image (you can change this path or use a URL)
      const background = await Jimp.read("https://i.postimg.cc/zfjxwhj6/bg-cover.jpg");

      // Load a font
      const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);

      // Add text (you can position and style as needed)
      background.print(font, 100, 100, `🔥 ${name} 🔥`);

      // Save output image
      const outputPath = path.join(__dirname, "fbcover_output.jpg");
      await background.writeAsync(outputPath);

      // Send the image
      const msg = {
        body: "🔖 Here's your Facebook cover:",
        attachment: fs.createReadStream(outputPath)
      };

      api.sendMessage(msg, threadID, () => {
        fs.unlinkSync(outputPath); // Clean up
      }, messageID);
    } catch (err) {
      console.error(err);
      api.sendMessage("❌ Couldn't generate the cover. Try again later.", threadID, messageID);
    }
  }
};
