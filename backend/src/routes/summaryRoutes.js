const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// GET /api/summary/:userId
router.get("/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const expenses = await Expense.find({ userId });
  
      if (!expenses.length) {
        return res.json({ total: 0, topCategory: "-", largestPurchase: null });
      }
  
      const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  
      const categoryCount = {};
      expenses.forEach((exp) => {
        categoryCount[exp.category] = (categoryCount[exp.category] || 0) + 1;
      });
      const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0][0];
  
      const largest = expenses.reduce((max, curr) => 
        parseFloat(curr.amount) > parseFloat(max.amount) ? curr : max
      );
  
      res.json({
        total,
        topCategory,
        largestPurchase: {
          amount: largest.amount,
          category: largest.category
        }
      });
  
    } catch (err) {
      console.error("❌ Summary API Error:", err);
      res.status(500).json({ error: "Failed to fetch summary" });
    }
  });
  

module.exports = router;
