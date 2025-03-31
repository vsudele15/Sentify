import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ExpenseTable from "../components/ExpenseTable";
import EditExpenseModal from "../components/EditExpenseModal";

const PastExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);


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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
  
      const res = await fetch(`http://localhost:5000/pastExpenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
  
      if (!res.ok) throw new Error("Failed to delete");
  
      // Remove deleted item from state
      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };
  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setIsEditOpen(true);
  };
  
  const handleSave = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/pastExpenses/${updatedData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!res.ok) throw new Error("Failed to update");
  
      const updated = await res.json();
  
      // Update the state
      setExpenses((prev) =>
        prev.map((e) => (e._id === updated._id ? updated : e))
      );
      setIsEditOpen(false);
      setEditingExpense(null);
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  };
  

  const filteredExpenses = expenses.filter((exp) =>
    exp.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#FDF7DC] min-h-screen">
        <div className="w-full max-w-screen-xl mx-auto p-6 pt-40">
            <SearchBar onSearch={setSearchQuery} />
            <ExpenseTable data={filteredExpenses} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
        <EditExpenseModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        expense={editingExpense}
        onSave={handleSave}
        />

    </div>
  );
};

export default PastExpenses;
