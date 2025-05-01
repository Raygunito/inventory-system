import { useAuth } from "../component/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/full_logo.svg" alt="Logo" className="h-14" />
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link
            to="/products"
            className="text-text hover:text-secondary transition"
          >
            Products
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-text hover:text-secondary transition"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-text hover:text-secondary transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/account"
              className="text-text hover:text-secondary transition"
            >
              Account
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
