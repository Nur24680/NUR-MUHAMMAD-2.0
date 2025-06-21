module.exports.config = {
  name: "antiout",
  version: "1.0.0",
  credits: "Shourov",
  description: "Turn on/off anti-out system",
  usage: "[on/off]",
  cooldown: 3
};

module.exports.run = async ({ api, event, args, Threads }) => {
  const { threadID, senderID } = event;

  // ✅ Only allow Shourov (Bot Owner)
  const botAdmins = ["100070297030133"]; // <-- তোমার UID

  if (!botAdmins.includes(senderID)) {
    return api.sendMessage("⛔ শুধু বট অনার এই কমান্ড চালাতে পারবে!", threadID);
  }

  // ✅ Main logic
  const threadData = await Threads.getData(threadID) || {};
  const data = threadData.data || {};

  if (!args[0]) {
    return api.sendMessage(
      `⚙️ Anti-out Status: ${data.antiout === true ? "ON ✅" : "OFF ❌"}\n\n👉 ব্যবহার:\nantiout on\nantiout off`,
      threadID
    );
  }

  const input = args[0].toLowerCase();
  if (input === "on") {
    data.antiout = true;
    await Threads.setData(threadID, { data });
    return api.sendMessage(`✅ Anti-out এখন চালু ✅`, threadID);
  } else if (input === "off") {
    data.antiout = false;
    await Threads.setData(threadID, { data });
    return api.sendMessage(`❌ Anti-out এখন বন্ধ ❌`, threadID);
  } else {
    return api.sendMessage(`❗ অনুগ্রহ করে "on" বা "off" লিখো।\n👉 উদাহরণ: antiout on`, threadID);
  }
};
