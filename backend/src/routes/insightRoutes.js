const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/generate", async (req, res) => {
  const { categorySummary, moodSummary, monthlySummary } = req.body;

  const prompt = `
You are an AI assistant analyzing user expenses and emotional patterns. Based on the following data, generate 3 short, personalized financial insights.

Category Summary:
${JSON.stringify(categorySummary)}

Mood Summary:
${JSON.stringify(moodSummary)}

Monthly Summary:
${JSON.stringify(monthlySummary)}

Respond like this:
- Insight 1: ...
- Insight 2: ...
- Insight 3: ...
`;

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "mistral",   // or "llama2", if you've pulled that instead
      prompt,
      stream: false
    });

    const insights = response.data.response;
    res.status(200).json({ insights });
  } catch (error) {
    console.error("Error generating insights:", error.message);
    res.status(500).json({ error: "Failed to generate insights" });
  }
});

module.exports = router;
