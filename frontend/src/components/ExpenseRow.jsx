import React from 'react';

const ExpenseRow = ({ expense, serialNumber, onDelete, onEdit, isEven }) => {
  // Format date as MM/DD/YY without timezone issues
  const dateObj = new Date(expense.date);
  const formattedDate = `${(dateObj.getUTCMonth() + 1)
    .toString()
    .padStart(2, '0')}/${dateObj.getUTCDate()
    .toString()
    .padStart(2, '0')}/${dateObj.getUTCFullYear().toString().slice(-2)}`;
  const rowBg = isEven ? "bg-[#3F7981] text-white" : "bg-[#FEC459] text-black";
  return (
    <tr className={`${rowBg} border-b transition duration-200 hover:brightness-110`}>
      <td className="px-4 py-3 font-semibold">#{serialNumber}</td>
      <td className="flex items-center gap-2 px-4 py-3">
        {/* You can add icon logic later here */}
        <span>{expense.description || "-"}</span>
      </td>
      <td className="px-4 py-3">{expense.category}</td>
      <td className="px-4 py-3">{formattedDate}</td>
      <td className="px-4 py-3">${expense.amount.toFixed(2)}</td>
      <td className="px-4 py-3">{expense.emotion}</td>
      <td className="px-4 py-3 flex gap-2 items-center">
        <button className="hover:scale-110 transition" onClick={() => onEdit(expense)}>✏️</button>
        <button className="hover:scale-110 transition" onClick={() => onDelete(expense._id)}>🗑️</button>
      </td>
    </tr>
  );
};

export default ExpenseRow;
