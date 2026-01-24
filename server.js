// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {
  const { question } = req.body;

  if (!question) return res.status(400).json({ error: "No question provided" });

  try {
    const response = await fetch('https://api.groq.ai/v1/llm/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        input: question
      })
    });

    const data = await response.json();

    // Read output safely
    const answer = data.output?.[0]?.content || "No answer found";

    res.json({ answer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get response" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
