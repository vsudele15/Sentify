import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0066cc", "#c0392b", "#f39c12", "#e67e22", "#27ae60"];

const ExpenseByCategoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCategorySummary = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {return;}

        const decoded = jwtDecode(token);
        const userId = decoded?.userId;
        const res = await axios.get(`http://localhost:5000/api/expenses/category-summary?userId=${userId}`);
        
        // Transform the backend data to match recharts format
        const formatted = res.data.map(item => ({
          name: item.category,
          value: item.total,
        }));

        setData(formatted);
      } catch (error) {
        console.error("Failed to fetch category summary", error);
      }
    };

    fetchCategorySummary();
  }, []);

  return (
    <div className="flex justify-center">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
};

export default ExpenseByCategoryChart;
