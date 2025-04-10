import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthNames = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const MonthlySpendingChart = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthsAvailable, setMonthsAvailable] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        const res = await axios.get(
          `http://localhost:5000/api/expenses/monthly-summary?userId=${userId}`
        );

        // Group and format weekly totals per month
        const grouped = {};
        res.data.forEach((entry) => {
          const { month, week, total } = entry;
          if (!grouped[month]) grouped[month] = [];
          grouped[month].push({
            week: `W${week}`,
            total,
          });
        });

        const months = Object.keys(grouped).map(Number).sort();
        const latest = months[months.length - 1];

        setMonthsAvailable(months);
        setSelectedMonth(latest);
        setChartData(grouped);
      } catch (error) {
        console.error("Failed to fetch monthly summary", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Dropdown */}
      <div className="flex justify-end mb-3">
      <select
        value={selectedMonth || ""}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        {monthsAvailable.map((m) => (
          <option key={m} value={m}>
            {monthNames[m]}
          </option>
        ))}
      </select>
      </div>


      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData[selectedMonth]}>
      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />         {/* Lighter grid */}
      <XAxis dataKey="week" stroke="#ffffff" />                     {/* White X labels */}
      <YAxis stroke="#ffffff" unit="$" />                           {/* White Y labels */}
      <Tooltip 
        contentStyle={{ backgroundColor: "#ffffff", borderRadius: "6px" }}
        labelStyle={{ color: "#333" }}
        itemStyle={{ color: "#333" }}
        formatter={(value) => `$${value}`}                        
      />
      <Line
        type="monotone"
        dataKey="total"
        stroke="#42a5f5"
        strokeWidth={2}
        dot={{ r: 3, stroke: "#ffffff", strokeWidth: 1 }}
        name="Spending"
      />
      </LineChart>

      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySpendingChart;
