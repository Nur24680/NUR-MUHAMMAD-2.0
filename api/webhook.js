import axios from "axios";

export default async function handler(req, res) {
  const { senderID, threadID, body } = req.body;

  const gpt = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: body }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const reply = gpt.data.choices[0].message.content;

  await axios.post("http://localhost:3000/send-message", {
    threadID,
    message: reply
  });

  res.status(200).json({ success: true });
}
