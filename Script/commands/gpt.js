const axios = require("axios");

module.exports.config = {
  name: "kluster",
  version: "1.0",
  hasPermission: 0,
  credits: "RASEL + ChatGPT",
  usePrefix: false,
  description: "Talk with Kluster AI",
  commandCategory: "AI",
  cooldowns: 2,
};

const API_KEY = "46a5eeae-7374-424e-ab4d-9258806d21ca"; // ⚠️ Replace later if needed
const MODEL = "klusterai/Meta-Llama-3.1-8B-Instruct-Turbo";

module.exports.run = async ({ api, event, args }) => {
  try {
    const prompt = args.join(" ");
    if (!prompt) {
      return api.sendMessage("🧠 প্রশ্ন দিন যেমন: kluster কেমন আছো?", event.threadID);
    }

    const res = await axios.post(
      "https://api.kluster.ai/v1/chat/completions",
      {
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = res.data?.choices?.[0]?.message?.content;
    if (reply) {
      return api.sendMessage(`🤖 Kluster AI:\n${reply}`, event.threadID);
    } else {
      return api.sendMessage("⚠️ উত্তর পাওয়া যায়নি।", event.threadID);
    }

  } catch (error) {
    console.error("❌ Kluster API error:", error.response?.data || error.message);
    return api.sendMessage("❌ Kluster API ব্যবহার করতে সমস্যা হয়েছে।", event.threadID);
  }
};
