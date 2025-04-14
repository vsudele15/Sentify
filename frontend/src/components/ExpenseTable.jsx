import React from 'react';
import ExpenseRow from './ExpenseRow';

const ExpenseTable = ({ data, onDelete, onEdit, startIndex  }) => {
  return (
    <div className="overflow-auto shadow-md rounded-lg">
      <table className="w-full text-base text-left rounded-xl overflow-hidden">
        <thead className="bg-[#FDF7DC] text-gray-800 uppercase text-lg">
          <tr>
            <th className="px-4 py-3">Serial Number</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Emotion</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
        {data.map((expense, idx) => {
          const serial = startIndex + idx + 1;
          const isEven = serial % 2 === 0;

          return (
            <ExpenseRow
              key={expense._id}
              expense={expense}
              onDelete={onDelete}
              onEdit={onEdit}
              serialNumber={`${serial}`}
              isEven={isEven} // ✅ Pass to control background color
            />
          );
        })}

        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
