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
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  Happy: "#2ecc71",
  Neutral: "#f1c40f",
  Stressed: "#e74c3c",
  Sad: "#9b59b6",
  Guilty: "#34495e",
  Excited: "#3498db",
};

const MoodVsSpendingChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchMoodSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        const res = await axios.get(
          `http://localhost:5000/api/expenses/mood-summary?userId=${userId}`
        );

        // Transform data into recharts format
        const formatted = res.data.map((weekEntry) => {
          const entry = { week: `W${weekEntry.week}` };
          weekEntry.emotions.forEach((e) => {
            entry[e.emotion] = e.total;
          });
          return entry;
        });

        setChartData(formatted);
      } catch (error) {
        console.error("Failed to fetch mood summary", error);
      }
    };

    fetchMoodSummary();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(COLORS).map((emotion) => (
          <Line
            key={emotion}
            type="monotone"
            dataKey={emotion}
            stroke={COLORS[emotion]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MoodVsSpendingChart;
