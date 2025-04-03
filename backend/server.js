require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Allows cross-origin requests (needed for frontend-backend communication).
const helmet = require("helmet"); //Adds security headers to protect against web attacks.
const morgan = require("morgan"); // Logs HTTP requests (useful for debugging).

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const pastExpenseRoutes = require('./src/routes/pastExpenses');

const app = express();

// Connect to MongoDB
(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Stop the server if DB connection fails
  }
})();

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json()); // Allow JSON requests
app.use(express.urlencoded({ extended: true })); // Handle form data
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging requests

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", require("./src/routes/expenseRoutes"));
app.use("/pastExpenses", require("./src/routes/pastExpenses"));
app.use("/api/insights", require("./src/routes/insightRoutes"));


// Default route (optional)
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// 404 Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "❌ Route not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
