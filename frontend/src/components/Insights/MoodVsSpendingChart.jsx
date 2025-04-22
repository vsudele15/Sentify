import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";

const COLORS = {
  Happy: "#2ecc71",
  Neutral: "#f39c12",
  Stressed: "#e74c3c",
  Sad: "#9b59b6",
  Guilty: "#34495e",
  Excited: "#3498db",
};

const monthNames = {
  1: "January", 2: "February", 3: "March", 4: "April",
  5: "May", 6: "June", 7: "July", 8: "August",
  9: "September", 10: "October", 11: "November", 12: "December"
};

const MoodVsSpendingChart = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthsAvailable, setMonthsAvailable] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchMoodSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        const res = await axios.get(
          `http://localhost:5000/api/expenses/mood-summary?userId=${userId}`
        );

        setFullData(res.data);

        // Get list of unique months
        const uniqueMonths = [
          ...new Set(res.data.map((item) => item.month))
        ].sort((a, b) => a - b);

        const latestMonth = uniqueMonths[uniqueMonths.length - 1];

        setMonthsAvailable(uniqueMonths);
        setSelectedMonth(latestMonth);

        // Filter for latest month initially
        const filtered = res.data
          .filter((item) => item.month === latestMonth)
          .map((item) => ({
            mood: item.mood,
            value: item.total,
          }));

        setFilteredData(filtered);
      } catch (error) {
        console.error("Failed to fetch mood summary", error);
      }
    };

    fetchMoodSummary();
  }, []);

  const handleMonthChange = (e) => {
    const month = Number(e.target.value);
    setSelectedMonth(month);

    const filtered = fullData
      .filter((item) => item.month === month)
      .map((item) => ({
        mood: item.mood,
        value: item.total,
      }));

    setFilteredData(filtered);
  };

  return (
    <div>
      {/* Dropdown */}
      <div className="flex justify-end mb-2">
        <select
          value={selectedMonth || ""}
          onChange={handleMonthChange}
          className="px-2 py-1 rounded border"
        >
          {monthsAvailable.map((monthNum) => (
            <option key={monthNum} value={monthNum}>
              {monthNames[monthNum]}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="bg-white p-2 rounded-md">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mood" />
          <YAxis tickFormatter={(value) => `$${value}`}/>
          <Tooltip />
          
          <Bar dataKey="value" name="Spending" radius={[4, 4, 0, 0]}>
            {filteredData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[entry.mood] || "#8884d8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodVsSpendingChart;
