import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext"; // Auth Context
import PrivateRoute from "./PrivateRoute"; // Protect Dashboard
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <Navbar /> {/* ✅ Navbar is now always visible */}

      <AnimatePresence mode="wait"> {/* Enables smooth page transitions */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Protected Route for Dashboard */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;
