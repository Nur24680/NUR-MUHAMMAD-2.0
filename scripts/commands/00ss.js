const fs = require("fs");

module.exports.config = {
  name: "iloveu",
  version: "2.0.0",
  permission: 0,
  credits: "nayan",
  description: "",
  prefix: false,
  category: "user",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  const { threadID, messageID, body } = event;

  if (
    body &&
    (
      body.toLowerCase().indexOf("i love you") === 0 ||
      body.toLowerCase().indexOf("i love u") === 0 ||
      body.toLowerCase().indexOf("cudi") === 0
    )
  ) {
    const msg = {
      body: "Hmm... বস সৌরভ ও তোমাকে ভালোবাসে😇😻 :))"
    };
    api.sendMessage(msg, threadID, messageID);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {
  // Nothing to run manually
};
