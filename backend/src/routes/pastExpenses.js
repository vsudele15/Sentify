const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    // ✅ Use userId from the token
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    // ✅ Fetch expenses only for that user
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    res.json(expenses);
  } catch (err) {
    console.error("❌ Error fetching expenses:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
