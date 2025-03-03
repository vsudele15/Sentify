import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import girlImage from "../assets/girl-image.png";
import { login } from "../api"; // Import API function
import AuthContext from "../context/AuthContext"; // Import Auth Context

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset errors before a new request

    try {
      const { data } = await login(formData); // Call backend login API
      localStorage.setItem("token", data.token); // Store JWT token
      authLogin(data.token); // Update global auth state
      navigate("/dashboard"); // Redirect to Dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
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
      {/* Left Section */}
      <div className="hidden md:flex w-1/3 items-center justify-center"></div>

      {/* Right Section with Login Form */}
      <div className="w-full md:w-2/3 flex items-center justify-center pl-20 bg-[#FEC459] rounded-tl-3xl rounded-bl-3xl">
        <div className="bg-white px-8 pb-[90px] pt-[60px] rounded-lg shadow-2xl w-[38rem] ml-20">
          <div className="pb-8">
            <h2 className="text-4xl font-semibold text-gray-900 text-center">Welcome Back!</h2>
            <p className="text-sm text-gray-600 text-center mt-1">
              Don't have an account? <a href="/" className="text-blue-600">Signup</a>
            </p>
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Email */}
            <div className="w-full">
              <label className="block text-lg text-gray-500 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-12 p-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Password */}
            <div className="w-full">
              <label className="block text-lg text-gray-500 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-12 p-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="/forgot-password" className="text-blue-600 text-sm">Forgot password?</a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-12 mt-4 bg-teal-600 text-white text-xl py-3 rounded-md hover:bg-teal-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <img
        src={girlImage}
        alt="Login Illustration"
        className="w-3/4 absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/3 md:w-[45rem]"
      />
    </motion.div>
  );
};

export default Login;
