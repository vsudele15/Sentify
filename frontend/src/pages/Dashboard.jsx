import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Get user ID
import manImage from "../assets/man-image.png";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import DidYouKnowBox from "../components/DidYouKnowBox";
import ExpenseOverviewBox from "../components/ExpenseOverviewBox";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import StreakCalendar from '../components/StreakCalendar';

const Dashboard = () => {
  // Get user from AuthContext
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [moodData, setMoodData] = useState([]);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#F95F62'];
  useEffect(() => {
    if (user && user.userId) {
      // Fetch user first name
      fetch(`http://localhost:5000/api/users/${user.userId}`)
        .then((res) => res.json())
        .then((data) => {
          //console.log("Fetched user data:", data);
          setFirstName(data.firstName);
        })
        .catch((err) => console.error("Error fetching user:", err));
      
        // Fetch mood breakdown data
      fetch(`http://localhost:5000/api/expenses/emotion-breakdown?userId=${user.userId}`)
        .then((res) => res.json())
        .then((data) => setMoodData(data))
        .catch((err) => console.error("Error fetching mood data:", err));
    }
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
  
      toast.success("Expense Added Successfully!");
  
      setExpenseData({ amount: "", date: "", category: "", emotion: "", description: "" });
  
    } catch (error) {
      console.error("❌ Error submitting expense:", error);
      toast.error(`Error submitting the form: ${error.message}`);
    }
  };
  

  return (
    <div className="bg-[#FEFADC] min-h-screen"> {/* Full page background */}
      {/* Padding to push content below the navbar */}
      <div className="w-full max-w-screen-xl mx-auto p-6 pt-40">
        <h1 className="text-3xl font-bold text-gray-800">Hi {firstName || "User"}, Welcome back!</h1>

        {/* Grid Layout for Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="md:col-span-2 bg-[#3F7981] text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 ">Add New Expense</h2>
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
          <ExpenseOverviewBox />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-[#FEC459] p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Expense Streak Tracker</h2>
          <StreakCalendar userId={user?.userId} />
        </div>

        {/* <div className="bg-[#FEC459] p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-2 text-[#2f2f2f]">Mood Breakdown</h3>
        <div className="flex flex-col items-center justify-center">
            {moodData.length > 0 ? (
            <PieChart width={280} height={250}>
            <Pie
              data={moodData}
              dataKey="count"
              nameKey="emotion"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
                >
              {moodData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#ffffff", borderRadius: "10px" }}
                  />
              <Legend
                verticalAlign="bottom"
                layout="horizontal"
                iconType="circle"
                wrapperStyle={{ fontSize: "14px", marginTop: "10px" }}
              />
            </PieChart>
          ) : (
            <p className="text-sm text-gray-800 mt-4">No mood data yet.</p>
          )}
        </div>
      </div> */}
  

          <div className="bg-[#3F7981] text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Did You Know?</h3>
            <DidYouKnowBox />
          </div>

          <div className="flex justify-center items-center">
            <img src={manImage} alt="Finance Illustration" className="w-50 h-50" />
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Dashboard;
