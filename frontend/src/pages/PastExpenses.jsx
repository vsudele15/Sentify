import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ExpenseTable from "../components/ExpenseTable";

const PastExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/pastExpenses", {
          headers: {
            Authorization: token,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch expenses");
        const data = await res.json();
        setExpenses(data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };

    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.filter((exp) =>
    exp.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#FDF7DC] min-h-screen">
        <div className="w-full max-w-screen-xl mx-auto p-6 pt-40">
            <SearchBar onSearch={setSearchQuery} />
            <ExpenseTable data={filteredExpenses} />
        </div>
    </div>
  );
};

export default PastExpenses;
