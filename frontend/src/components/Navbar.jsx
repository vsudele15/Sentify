import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/logo.png';
import './Navbar.css';


const Navbar = () => {
  const location = useLocation();

  // Pages where we only show the logo without a link
  const authPages = ["/login", "/"];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <nav className="bg-transparent text-white p-4 fixed w-full top-0 left-0">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo - Clickable only if logged in */}
        {isAuthPage ? (
            <img src={Logo} alt="Sentify Logo" className="logo-size ml-[-20px]" />
        ) : (
          <Link to="/dashboard" className="text-xl font-bold">
            <img src={Logo} alt="Sentify Logo" className="logo-size ml-[-20px]" />
          </Link>
        )}

        {/* Show additional menu items only if NOT on auth pages */}
        {!isAuthPage && (
          <div className="flex items-center space-x-6">
            <Link to="/expenses" className="hover:text-gray-400 text-gray-800">Past Expenses</Link>
            <Link to="/insights" className="hover:text-gray-400 text-gray-800">Insights</Link>
            
            {/* User Profile Icon */}
            <Link to="/profile">
              <img 
                src="https://via.placeholder.com/40" 
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
