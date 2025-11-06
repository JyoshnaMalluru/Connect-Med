// routes/chatbot.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const MODEL = "gemini-2.5-flash"; 

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const prompt = `
    You are MediConnect, a friendly AI health assistant.
    Answer briefly, clearly, and safely with factual general wellness info.
    Do not provide diagnoses, treatment plans, or prescriptions.
    User question: ${message}
    `.trim();

    const url = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(
      url,
      { contents: [{ parts: [{ text: prompt }] }] },
      { timeout: 20000 }
    );

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "I'm sorry, I couldn't generate a response right now.";

    res.json({ reply });
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    res.status(500).json({
      reply:
        "Error connecting to MediConnect AI service. Please try again later.",
    });
  }
});

export default router;
