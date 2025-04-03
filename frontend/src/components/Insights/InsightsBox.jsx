import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const InsightsBox = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem("ai_insights");
    if (cached) {
      setInsights(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const fetchInsights = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        // Fetch required data from backend
        const [categoryRes, moodRes, monthlyRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/expenses/category-summary?userId=${userId}`),
          axios.get(`http://localhost:5000/api/expenses/mood-summary?userId=${userId}`),
          axios.get(`http://localhost:5000/api/expenses/monthly-summary?userId=${userId}`)
        ]);

        // Send everything to /api/insights/generate
        const response = await axios.post("http://localhost:5000/api/insights/generate", {
          categorySummary: categoryRes.data,
          moodSummary: moodRes.data,
          monthlySummary: monthlyRes.data
        });

        const lines = response.data.insights
          .split("\n")
          .filter(line => line.trim().startsWith("-"));

        setInsights(lines);
        localStorage.setItem("ai_insights", JSON.stringify(lines));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch AI insights:", error);
        setInsights(["Failed to generate insights."]);
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return (
    <div className="space-y-3">
      <button
        className="text-sm text-blue-600 underline"
        onClick={() => {
          localStorage.removeItem("ai_insights");
          window.location.reload();
        }}
      >
        Regenerate Insights
      </button>

      {loading ? (
        <p className="text-sm text-gray-600">Generating insights...</p>
      ) : (
        insights.map((insight, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-md border-l-4 border-yellow-500 shadow-sm text-sm"
          >
            {insight}
          </div>
        ))
      )}
    </div>
  );
};

export default InsightsBox;
