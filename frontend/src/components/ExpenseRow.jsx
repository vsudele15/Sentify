import React from 'react';

const ExpenseRow = ({ expense, serialNumber, onDelete, onEdit }) => {
  return (
    <tr className="bg-[#D9EAD3] border-b">
      <td>#{serialNumber}</td>
      <td className="flex items-center gap-2">
        {/* You can add icon logic later here */}
        <span>{expense.description || "-"}</span>
      </td>
      <td>{expense.category}</td>
      <td>{new Date(expense.date).toLocaleDateString()}</td>
      <td>${expense.amount.toFixed(2)}</td>
      <td>{expense.emotion}</td>
      <td className="flex gap-3">
        <button className="text-purple-700" onClick={() => onEdit(expense)}>✏️</button>
        <button className="text-red-600" onClick={() => onDelete(expense._id)}>🗑️</button>
      </td>
    </tr>
  );
};

export default ExpenseRow;
