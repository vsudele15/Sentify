import React from 'react';
import ExpenseRow from './ExpenseRow';

const ExpenseTable = ({ data, onDelete, onEdit }) => {
  return (
    <div className="overflow-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#E1EEDD]">
          <tr>
            <th>Serial Number</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Emotion</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {data.map((expense, idx) => (
            <ExpenseRow key={expense._id} expense={expense} serialNumber={idx + 1} onDelete={onDelete} onEdit={onEdit}/>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
