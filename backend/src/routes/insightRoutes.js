const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/generate", async (req, res) => {
  const { categorySummary, moodSummary, monthlySummary } = req.body;
  
  const compressedCategory = categorySummary
  .map(c => `${c.category}: $${c.total}`)
  .join(", ");

const compressedMood = moodSummary
  .map(m => `${m.mood} - $${m.total}`)
  .join(", ");

const compressedMonthly = monthlySummary
  .map(m => `Month ${m.month}, Week ${m.week}: $${m.total}`)
  .join(" | ");

  const prompt = `
You are an AI assistant analyzing a user's emotional and spending patterns. Based on the summarized data below, provide 3 brief insights (maximum 2 sentences each) that are easy to understand and practical.

Spending by Category: ${compressedCategory}
Spending by Mood: ${compressedMood}
Weekly Spending Pattern: ${compressedMonthly}

Write in this format:
- Insight 1: ...
- Insight 2: ...
- Insight 3: ...
`;


  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "mistral",   
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
