const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Links to the logged-in user
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  emotion: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Expense", ExpenseSchema);
