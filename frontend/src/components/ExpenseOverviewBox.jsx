import React, { useEffect, useState } from "react";

const ExpenseOverviewBox = () => {
  const [summary, setSummary] = useState({
    total: 0,
    topCategory: "-",
    largestPurchase: { amount: 0, category: "-" }
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData || !userData.userId) return;

        const res = await fetch(`http://localhost:5000/api/summary/${userData.userId}`);
        const data = await res.json();
        setSummary(data);
      } catch (error) {
        console.error("❌ Failed to load summary:", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="bg-[#FEC459] p-6 rounded-2xl">
      <h3 className="text-xl font-semibold">Expense Overview</h3>
      <p className="mt-2">
        Current Balance: <span className="font-bold">${summary.total.toFixed(2)}</span>
      </p>
      <p>
        Top Category: <span className="font-bold">{summary.topCategory}</span>
      </p>
      <p>
        Largest Purchase:{" "}
        <span className="font-bold">
          ${summary.largestPurchase.amount} - {summary.largestPurchase.category}
        </span>
      </p>
    </div>
  );
};

export default ExpenseOverviewBox;
