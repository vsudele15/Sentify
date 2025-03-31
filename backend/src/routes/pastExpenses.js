const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    // ✅ Use userId from the token
    const userId = new mongoose.Types.ObjectId(String(req.user.userId));

    // ✅ Fetch expenses only for that user
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    res.json(expenses);
  } catch (err) {
    console.error("❌ Error fetching expenses:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = new mongoose.Types.ObjectId(String(req.user.userId)); // or _id based on your JWT
    const deleted = await Expense.findOneAndDelete({ _id: expenseId, userId });

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting expense:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = new mongoose.Types.ObjectId(String(req.user.userId)); // based on your token
    const updatedFields = req.body;

    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expenseId, userId },
      updatedFields,
      { new: true } // return the updated document
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    res.json(updatedExpense);
  } catch (err) {
    console.error("❌ Error updating expense:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
