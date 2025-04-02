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
  Legend,
} from "recharts";

// Helper to map month number to name
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
    const fetchMonthlySummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        const res = await axios.get(
          `http://localhost:5000/api/expenses/monthly-summary?userId=${userId}`
        );

        // Group entries by month
        const grouped = {};
        res.data.forEach((entry) => {
          const month = entry.month;
          const week = `W${entry.week}`;
          if (!grouped[month]) grouped[month] = [];
          const weekData = { week };
          entry.categories.forEach((cat) => {
            weekData[cat.category] = cat.total;
          });
          grouped[month].push(weekData);
        });

        const monthNums = Object.keys(grouped).map(Number).sort();
        const defaultMonth = monthNums[monthNums.length - 1]; // latest month
        setSelectedMonth(defaultMonth);
        setMonthsAvailable(monthNums);
        setChartData(grouped);
      } catch (error) {
        console.error("Failed to fetch monthly summary", error);
      }
    };

    fetchMonthlySummary();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-2">
        <select
          value={selectedMonth || ""}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="px-2 py-1 rounded border"
        >
          {monthsAvailable.map((monthNum) => (
            <option key={monthNum} value={monthNum}>
              {monthNames[monthNum]}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData[selectedMonth] || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Dynamically generate lines based on categories */}
          {chartData[selectedMonth] &&
            Object.keys(
              chartData[selectedMonth].reduce((acc, item) => {
                Object.keys(item).forEach((key) => {
                  if (key !== "week") acc[key] = true;
                });
                return acc;
              }, {})
            ).map((category) => (
              <Line
                key={category}
                type="monotone"
                dataKey={category}
                strokeWidth={2}
                dot={false}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySpendingChart;
