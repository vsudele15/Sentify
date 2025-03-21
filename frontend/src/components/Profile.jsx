import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import userlogo from "../assets/user.png";

const Profile = ({ onClose }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      {/* Modal Container */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-600 text-xl">&times;</button>

        <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
        <div className="flex flex-col items-center">
          <img
            src={userlogo}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-gray-300 mb-4"
          />
          <p className="text-lg font-semibold">{user?.name || "User"}</p>
          <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
        </div>

        <hr className="my-4" />

        <button 
          onClick={logout} 
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
