import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user from localStorage on mount
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Login function - Store decoded user data
const login = (token) => {
  try {
    const decodedUser = jwtDecode(token); // ✅ Decode JWT Token
    localStorage.setItem("user", JSON.stringify(decodedUser)); // ✅ Save decoded user
    setUser(decodedUser);
  } catch (error) {
    console.error("❌ Error decoding token:", error);
    alert("Invalid token received");
  }
};


  // Logout function - Remove user data
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Create and export `useAuth` Hook
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
