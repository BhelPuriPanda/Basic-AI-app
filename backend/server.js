import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// async function askOpenRouter(userMessage) {
//   try {
//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": "Bearer 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", // Replace later
//         "Referer": "http://localhost:5173", // Optional
//         "X-Title": "DeepSeek Chatbot", // Optional
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         model: "deepseek/deepseek-r1:free",
//         messages: [
//           {
//             role: "user",
//             content: userMessage
//           }
//         ]
//       })
//     });

//     const data = await response.json();
//     return data.choices[0].message.content;
//   } catch (error) {
//     console.error("Error:", error);
//     return "Sorry, something went wrong.";
//   }
// }

async function askOpenRouter(userMessage) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`,
        "Referer": "http://localhost:5173",   // match your frontend
        "X-Title": "DeepSeek Chatbot",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();

    // Debugging: log the raw response
    console.log("Raw OpenRouter response:", data);

    // Safe access with optional chaining
    const reply = data?.choices?.[0]?.message?.content || "No response from model";
    return reply;

  } catch (error) {
    console.error("OpenRouter error:", error);
    return "Sorry, something went wrong.";
  }
}

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  const reply = await askOpenRouter(message);
  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
