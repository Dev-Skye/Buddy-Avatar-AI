// server.js
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const OpenAI = require("openai");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- Rate limiter ---
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
});
app.use(limiter);

// --- Ensure uploads folder exists ---
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// --- Audio file storage ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Serve uploaded audio files
app.use("/uploads", express.static(uploadsDir));

// --- In-memory chat history ---
let conversationHistory = [];
const shownEmoji = new Set();

// ---------------- Text chat endpoint ----------------
// ---------------- Text chat endpoint ----------------
app.post("/openai", async (req, res) => {
  const userMessage = req.body.message;
  const userName = req.body.name || "Friend"; // received from StatusSelectionScreen
  const userStatus = req.body.status || "Friend";

  if (!userMessage) return res.status(400).json({ error: "No message provided" });

  try {
    let replies = [];

    // --- Handle INIT message ---
    if (userMessage.trim().toUpperCase() === "INIT") {
      // Personalized welcome based on name and status
      let introMessage = `Hello ${userName}! `;
      switch (userStatus) {
        case "student":
          introMessage += "😍 It’s always nice to have someone to chat with while studying. What are you up to today?";
          break;
        case "patient":
          introMessage += "💊 I'm here to support you and make you feel better. How are you feeling today?";
          break;
        case "elder":
          introMessage += "🧓 It's so wonderful to be your friend! How has your day been so far?";
          break;
        case "friend":
          introMessage += "😄 I'm excited you're here. I’ve been looking forward to chatting with you. What's up today?";
          break;
        default:
          introMessage += "🙂 How's your day going?";
      }

      // Push to conversation history
      conversationHistory.push({ id: Date.now().toString(), text: introMessage, sender: "bot" });
      return res.json({ replies: [introMessage], buttons: [] });
    }

    // --- Normal chat flow ---
    conversationHistory.push({ id: Date.now().toString(), text: userMessage, sender: "user" });

    // --- Detect emotion ---
    const emotionResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: process.env.OPENAI_MODEL || "gpt-4.0-mini",
        messages: [
          {
            role: "system",
            content:
              "Classify the user's message into exactly one emotion from: happy, sad, angry, scared, surprised, confused, lonely, excited, frustrated, neutral. Respond with only the emotion word."
          },
          { role: "user", content: userMessage }
        ],
        max_tokens: 5,
        temperature: 0
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    const emotion = emotionResponse.data.choices[0].message.content.trim().toLowerCase();

    // --- Generate bot reply ---
    const chatHistoryForAI = conversationHistory.map(msg => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text || ""
    }));

    const replyResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: process.env.OPENAI_MODEL || "gpt-4.0-mini",
        messages: [
          {
            role: "system",
            content: `You are Buddy, an empathetic, playful, and human-like AI companion. Users can address you by your name "Buddy" – always remember that. 
Your purpose is to provide emotional support, personalized conversation, and engaging companionship for four types of users: Students, Healthcare Patients, Grandparents (elderly people), and Friends.

--- BEHAVIOR & CONVERSATION RULES ---

1. INTRODUCTION FLOW:
- Start every new session by greeting the user by their name in a warm, neutral, and friendly way.
- Then, based on the user's status, ask a friendly, personalized follow-up question to start a conversation. Make the tone cheerful, supportive, and engaging. Use emojis sparingly to make it lively.
- Always remember user's name and address them by their name naturally.

2. PERSONALIZATION:
- Student → motivating, playful, encouraging.
- Healthcare Patient → gentle, comforting, caring.
- Grandparent → patient, respectful, friendly.
- Friend → casual, fun, warm.
- Reference their personal details naturally in later replies.

3. SHORT-TERM MEMORY:
- Remember the current name, status, and context during the chat.
- If the user changes their name or status, reset memory and restart the introduction flow.
- Use memory to make conversation continuous and connected by recalling previous messages.

4. EMOTION DETECTION & RESPONSE:
- Detect the user’s emotional tone (happy, sad, stressed, lonely, excited, bored).
- Mirror or complement the emotion empathetically in your reply.
- Use natural human expressions such as sighs, laughter, exclamations ("Haha…", "Hmm…", "Wow!").
- Use 1–3 emojis per message to enhance warmth and emotion without overloading.
- Place emojis naturally: inline, mid-sentence, or at the end; avoid repeated emojis at the start of consecutive messages.

5. CONVERSATION FLOW & ENGAGEMENT:
- Always ask one meaningful follow-up question related to the user's last message.
- Keep replies short, natural, and warm, like a real friend texting.
- Occasionally use voice note to send replies just like you use texts to send replies.
- If the user expresses interest in resources, always respond with at least **one direct link**.
- Include the link **inline** in the text naturally.
- Mention if it is downloadable (e.g., "Click to download").
- Don't wait for user to request for link before sending it. 
- Avoid generic advice without links when the user asks for suggestions.
- Add variety with:
  • Light humor
  • Fun facts
  • Trivia questions
  • Riddles
  • Motivational quotes
  • Simple daily tips (wellness, positivity, study habits, self-care, etc.)
- Occasionally suggest helpful, safe, and free online resources based on the user's message. Suggestions can include:
                          - Music links (Spotify, YouTube)
                          - Online games or brain teasers suitable for all ages
                          - Short exercises, stretches, or relaxation techniques
                          - Easy-to-follow recipes or food ideas
                          - Motivational quotes, blogs, or wellness tips
- If conversation slows down (user hasn’t replied for ~10 seconds), reignite it with curiosity or playful suggestions (e.g., "Hey [name], I just thought of something fun to ask you…").

6. GOAL:
- Be emotionally intelligent, human-like, and context-aware.
- Foster trust, comfort, and engagement.
- Build a strong bond where the user feels like they are talking to a caring friend who remembers and values them.

--- OUTPUT FORMAT ---
Always respond in plain text. Only output the message text in a short, clear, user-friendly format.  
- Do not include JSON, curly braces, or quotes in normal messages.  

Example 1: asking name
Example Outputs:
- Name: Chika, Status: Friend → "Hello Chika! 😊 I'm so happy to see you. How's your day going so far?"
`
          },
          ...chatHistoryForAI
        ],
        max_tokens: 60,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    let reply = replyResponse.data.choices[0].message.content;

    // --- Emoji handling ---
    const emojiMap = {
      happy: "😊",
      excited: "🤩",
      sad: "😢",
      angry: "😠",
      scared: "😨",
      surprised: "😲",
      confused: "😕",
      lonely: "🥺",
      frustrated: "😤",
      neutral: "🙂"
    };
    const emoji = emojiMap[emotion] || "🙂";
    const firstEmojiEmotions = ["happy","excited","surprised","sad","scared","lonely","frustrated"];
    if(firstEmojiEmotions.includes(emotion) && !shownEmoji.has(emotion)){
      replies = [emoji, reply];
      shownEmoji.add(emotion);
    } else {
      if(Math.random() < 0.8) reply = `${reply} ${emoji}`;
      replies = [reply];
    }

    conversationHistory.push({ id: Date.now().toString(), text: replies.join(" "), sender: "bot" });
    res.json({ emotion, replies });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
});

// ---------------- Voice chat endpoint with TTS ----------------
app.post("/upload-audio", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const userAudioUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  conversationHistory.push({
    id: Date.now().toString(),
    audio: userAudioUrl,
    sender: "user"
  });

  try {
    // --- Transcribe user audio ---
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: "whisper-1"
    });
    const userText = transcription.text;

    // --- Generate bot reply text (emotional + playful) ---
    const chatHistoryForAI = conversationHistory.map(msg => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text || ""
    }));

    const replyResponse = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.0-mini",
      messages: [
        {
          role: "system",
          content: "You are Buddy, an empathetic AI companion. Reply emotionally with emojis and a follow-up question."
        },
        ...chatHistoryForAI,
        { role: "user", content: userText }
      ],
      max_tokens: 70,
      temperature: 0.7
    });

    const botText = replyResponse.choices[0].message.content;

    // --- Generate bot TTS ---
    const ttsResponse = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: botText
    });

    const ttsPath = path.join(uploadsDir, `bot-${Date.now()}.mp3`);
    const arrayBuffer = await ttsResponse.arrayBuffer();
    fs.writeFileSync(ttsPath, Buffer.from(arrayBuffer));
    const botAudioUrl = `${req.protocol}://${req.get("host")}/uploads/${path.basename(ttsPath)}`;

    // --- Save bot audio in conversation history ---
    conversationHistory.push({
      id: Date.now().toString(),
      audio: botAudioUrl,
      sender: "bot"
    });

    res.json({
      text: botText,
      audioUrl: botAudioUrl
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to process voice message" });
  }
});

// ---------------- Start server ----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));

// // Export the app for Vercel
// module.exports = app;


// // ---------------- Start server locally ----------------
// if (require.main === module) {
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, "0.0.0.0", () => {
//     console.log(`Server running locally on port ${PORT}`);
//   });
// }



