import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="flex items-center justify-start mb-6">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search Expense"
        className="p-3 w-[300px] rounded-xl shadow-md focus:outline-none"
      />
      <button className="ml-2 p-3 bg-[#5C9EAD] text-white rounded-full shadow-md">
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
