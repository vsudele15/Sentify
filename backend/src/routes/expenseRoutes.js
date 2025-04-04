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
    const [year, month, day] = date.split("-").map(Number);
    const localDate = new Date(year, month - 1, day);

    // ✅ Create new expense
    const newExpense = new Expense({
      userId: new mongoose.Types.ObjectId(userId), // Convert userId to ObjectId
      amount,
      date: localDate, // Convert to Date object
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

// ✅ Get Expense Summary by Category
router.get("/category-summary", async (req, res) => {
  const { userId } = req.query;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid or missing userId" });
  }

  try {
    const summary = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1
        }
      }
    ]);

    res.status(200).json(summary);
  } catch (error) {
    console.error("Error fetching category summary:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/mood-summary", async (req, res) => {
  const { userId } = req.query;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid or missing userId" });
  }

  try {
    const summary = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $addFields: {
          week: { $isoWeek: "$date" } // Extract week number from date
        }
      },
      {
        $group: {
          _id: { week: "$week", emotion: "$emotion" },
          total: { $sum: "$amount" }
        }
      },
      {
        $group: {
          _id: "$_id.week",
          emotions: {
            $push: {
              emotion: "$_id.emotion",
              total: "$total"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          week: "$_id",
          emotions: 1
        }
      },
      { $sort: { week: 1 } }
    ]);

    res.status(200).json(summary);
  } catch (error) {
    console.error("Error fetching mood summary:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/monthly-summary", async (req, res) => {
  const { userId } = req.query;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid or missing userId" });
  }

  try {
    const summary = await Expense.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $addFields: {
          month: { $month: "$date" },
          week: { $isoWeek: "$date" }
        }
      },
      {
        $group: {
          _id: {
            month: "$month",
            week: "$week",
            category: "$category"
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $group: {
          _id: {
            month: "$_id.month",
            week: "$_id.week"
          },
          categories: {
            $push: {
              category: "$_id.category",
              total: "$total"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          week: "$_id.week",
          categories: 1
        }
      },
      { $sort: { month: 1, week: 1 } }
    ]);

    res.status(200).json(summary);
  } catch (error) {
    console.error("Error fetching monthly summary:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Get Emotion Breakdown (for pie chart)
router.get("/emotion-breakdown", async (req, res) => {
  const { userId } = req.query;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid or missing userId" });
  }

  try {
    const emotionCounts = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$emotion",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          emotion: "$_id",
          count: 1
        }
      }
    ]);

    res.status(200).json(emotionCounts);
  } catch (error) {
    console.error("Error fetching emotion breakdown:", error);
    res.status(500).json({ error: "Server error" });
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
