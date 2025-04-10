import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0066cc", "#c0392b", "#f39c12", "#e67e22", "#27ae60", "#8e44ad", "#2ecc71", "#d35400"];

const ExpenseByCategoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMoodSpendingSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = jwtDecode(token);
        const userId = decoded?.userId;

        const res = await axios.get(`http://localhost:5000/api/expenses/category-summary?userId=${userId}`);

        const formatted = res.data.map(item => ({
          name: item.mood,        // label in the pie
          value: item.percentage, // actual percentage value
        }));

        setData(formatted);
      } catch (error) {
        console.error("Failed to fetch mood spending summary", error);
      }
    };

    fetchMoodSpendingSummary();
  }, []);

  return (
    <div className="flex justify-center">
      <PieChart width={350} height={350}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={100}
        paddingAngle={4}
        dataKey="value"
        labelLine={true}
        label={({ name }) => `${name}`}
      >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
};

export default ExpenseByCategoryChart;
