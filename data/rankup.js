const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

const DATA_PATH = path.join(__dirname, "../../data/rank.json");

module.exports.config = {
  name: "AutoRankUp",
  eventType: ["message"]
};

module.exports.run = async function ({ api, event }) {
  const { senderID, threadID } = event;

  if (!fs.existsSync(DATA_PATH)) fs.writeJsonSync(DATA_PATH, {});
  const data = fs.readJsonSync(DATA_PATH);

  if (!data[senderID]) data[senderID] = { count: 0, rank: 0 };
  data[senderID].count += 1;

  const newRank = Math.floor(data[senderID].count / 10);

  if (newRank > data[senderID].rank) {
    data[senderID].rank = newRank;

    const userInfo = await api.getUserInfo(senderID);
    const name = userInfo[senderID]?.name || "বন্ধু";

    const gifUrl = "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif"; // You can change this
    const filePath = path.join(__dirname, `temp_${senderID}.gif`);

    const response = await axios({
      url: gifUrl,
      method: "GET",
      responseType: "stream"
    });

    const writer = response.data.pipe(fs.createWriteStream(filePath));

    writer.on("finish", () => {
      api.sendMessage({
        body: `🌟 ${name}, আপনি এখন Level ${newRank} এ পৌঁছেছেন!\n\n💎 BOT OWNER 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯`,
        attachment: fs.createReadStream(filePath)
      }, threadID, () => fs.unlinkSync(filePath));
    });
  }

  fs.writeJsonSync(DATA_PATH, data, { spaces: 2 });
};
