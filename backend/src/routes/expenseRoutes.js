const express = require("express");
const mongoose = require("mongoose");
const Expense = require("../models/Expense");
const router = express.Router();

// ✅ Add Expense Route
router.post("/add", async (req, res) => {
  try {
    const { userId, amount, date, category, emotion, description } = req.body;

    // ✅ Check if userId is valid
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    // ✅ Create new expense
    const newExpense = new Expense({
      userId: new mongoose.Types.ObjectId(userId), // Convert userId to ObjectId
      amount,
      date: new Date(date), // Convert to Date object
      category,
      emotion,
      description
    });

    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully", expense: newExpense });

  } catch (error) {
    console.error("❌ Error adding expense:", error);
    res.status(500).json({ error: "Failed to add expense" });
  }
});

// ✅ Get All Expenses for a User
router.get("/:userId", async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

module.exports = router;
