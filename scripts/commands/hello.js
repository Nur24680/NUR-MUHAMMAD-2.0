module.exports.config = {
  name: "hello",
  description: "শুভেচ্ছা বার্তা পাঠায়",
  usage: "!hello",
  cooldown: 5
};

module.exports.run = ({ api, event }) => {
  api.sendMessage("👋 হ্যালো! আমি Shourov-Bot", event.threadID);
};
