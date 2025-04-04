import React from 'react';

const ExpenseRow = ({ expense, serialNumber, onDelete, onEdit }) => {
  // Format date as MM/DD/YY without timezone issues
  const dateObj = new Date(expense.date);
  const formattedDate = `${(dateObj.getUTCMonth() + 1)
    .toString()
    .padStart(2, '0')}/${dateObj.getUTCDate()
    .toString()
    .padStart(2, '0')}/${dateObj.getUTCFullYear().toString().slice(-2)}`;

  return (
    <tr className="bg-[#D9EAD3] border-b">
      <td>#{serialNumber}</td>
      <td className="flex items-center gap-2">
        {/* You can add icon logic later here */}
        <span>{expense.description || "-"}</span>
      </td>
      <td>{expense.category}</td>
      <td>{formattedDate}</td>
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
