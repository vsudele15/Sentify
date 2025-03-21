import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Get user ID
import manImage from "../assets/man-image.png";

const Dashboard = () => {
  // Get user from AuthContext
  const { user } = useAuth();

  useEffect(() => {
    console.log("Current User Data:", user);
  }, [user]);
  // State to store form data
  const [expenseData, setExpenseData] = useState({
    amount: "",
    date: "",
    category: "",
    emotion: "",
    description: "",
  });

  // Expense Categories
  const categories = [
    "Food & Drinks",
    "Shopping",
    "Entertainment",
    "Travel",
    "Health & Fitness",
    "Bills & Rent",
    "Hobbies",
    "Gift",
  ];

  // Emotion Options
  const emotions = ["Happy", "Guilty", "Sad", "Excited", "Stressed", "Neutral"];

  // Handle input changes
  const handleChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("User Data Before Sending:", user);
  
    // ✅ Ensure `userId` exists in the correct format
    if (!user || !user.userId) {
      alert("User not logged in!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/expenses/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: user.userId, // ✅ Using the correct key
          amount: parseFloat(expenseData.amount), 
          date: expenseData.date, 
          category: expenseData.category, 
          emotion: expenseData.emotion, 
          description: expenseData.description || ""
        })
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error("❌ Backend Response Error:", result);
        throw new Error(result.error || "Failed to add expense");
      }
  
      alert("Expense Added Successfully!");
  
      setExpenseData({ amount: "", date: "", category: "", emotion: "", description: "" });
  
    } catch (error) {
      console.error("❌ Error submitting expense:", error);
      alert(`Error submitting the form: ${error.message}`);
    }
  };
  

  return (
    <div className="bg-[#FEFADC] min-h-screen"> {/* Full page background */}
      {/* Padding to push content below the navbar */}
      <div className="w-full max-w-screen-xl mx-auto p-6 pt-40">
        <h1 className="text-2xl font-bold">Hi Vaidehi, Welcome back!</h1>

        {/* Grid Layout for Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="md:col-span-2 bg-[#3F7981] text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={expenseData.amount}
                  onChange={handleChange}
                  className="p-2 w-full rounded-md text-black"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={expenseData.date}
                  onChange={handleChange}
                  className="p-2 w-full rounded-md text-black"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Expense Category Dropdown */}
                <select
                  name="category"
                  value={expenseData.category}
                  onChange={handleChange}
                  className="p-2 w-full rounded-md text-black"
                  required
                >
                  <option value="" disabled>Select Expense Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {/* Emotion at Purchase Dropdown */}
                <select
                  name="emotion"
                  value={expenseData.emotion}
                  onChange={handleChange}
                  className="p-2 w-full rounded-md text-black"
                  required
                >
                  <option value="" disabled>Select Emotion</option>
                  {emotions.map((emotion, index) => (
                    <option key={index} value={emotion}>
                      {emotion}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                name="description"
                placeholder="Expense Description"
                value={expenseData.description}
                onChange={handleChange}
                className="p-2 w-full rounded-md text-black"
              />
              <button
                type="submit"
                className="bg-white text-teal-700 font-bold px-4 py-2 rounded-md w-full"
              >
                Add
              </button>
            </form>
          </div>

          {/* Right Column */}
          <div className="bg-[#FEC459] p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold">Expense Overview</h3>
            <p className="mt-2">Current Balance: <span className="font-bold">$5,432.85</span></p>
            <p>Top Category: <span className="font-bold">Entertainment</span></p>
            <p>Largest Purchase: <span className="font-bold">$250 - Shopping</span></p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-[#FEC459] p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold">Mood breakdown</h3>
            <div className="mt-4 w-full h-32 bg-white rounded-md"></div>
          </div>

          <div className="bg-[#3F7981] text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold">Did You Know?</h3>
            <p className="mt-2">
              Dopamine spikes when you shop, making it addictive. Budgeting can help balance emotions and finances.
            </p>
          </div>

          <div className="flex justify-center items-center">
            <img src={manImage} alt="Finance Illustration" className="w-50 h-50" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
