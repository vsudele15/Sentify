import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import girlImage from "../assets/girl-image.png";
import { signup } from "../api"; // Import API call

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(formData); // Call backend API
      navigate("/dashboard"); // Redirect user to login after signup
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <motion.div
      className="flex h-screen bg-[#FEFADC]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Left Section with Image */}
      <div className="hidden md:flex w-1/3 items-center justify-center"></div>

      {/* Right Section with Signup Form */}
      <div className="w-full md:w-2/3 flex items-center justify-center pl-20 bg-[#FEC459] rounded-tl-3xl rounded-bl-3xl">
        <div className="bg-white px-8 pb-[90px] pt-[60px] rounded-lg shadow-2xl w-[38rem] ml-20">
          <div className="pb-8">
            <h2 className="text-4xl font-semibold text-gray-900 text-center">Create Account</h2>
            <p className="text-sm text-gray-600 text-center mt-1">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600">
                Login
              </a>
            </p>
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* First & Last Name */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-500 text-sm font-medium mb-1 ml-4">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full h-12 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-500 text-sm font-medium mb-1 ml-4">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full h-12 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="w-full">
              <label className="block text-gray-500 text-sm font-medium mb-1 ml-4">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-12 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Password */}
            <div className="w-full">
              <label className="block text-gray-500 text-sm font-medium mb-1 ml-4">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-12 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full h-12 mt-6 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>

      {/* Image Illustration */}
      <img
        src={girlImage}
        alt="Signup Illustration"
        className="w-3/4 absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/3 md:w-[45rem]"
      />
    </motion.div>
  );
};

export default Signup;
