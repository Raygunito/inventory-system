import { useState } from "react";
import { Link } from "react-router-dom";  // Import Link from 'react-router-dom'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/full_logo.svg" alt="Logo" className="h-14" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/products" className="text-text hover:text-secondary transition">
            Products
          </Link>
          <Link to="/account" className="text-text hover:text-secondary transition">
            Account
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <span>&times;</span> : <span>&#9776;</span>}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-background p-4 border-t border-primary">
          <Link to="/products" className="block py-2 text-text hover:text-secondary transition">
            Products
          </Link>
          <Link to="/account" className="block py-2 text-text hover:text-secondary transition">
            Account
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
