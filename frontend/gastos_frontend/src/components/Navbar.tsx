import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Button from './Button';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, logout, isAuthenticated } = useAuthStore();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="text-gray-500 focus:outline-none lg:hidden">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <Link to="/" className="text-xl font-bold text-indigo-600 ml-4 hidden lg:block">
          Gastos Personales
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {isAuthenticated && user ? (
          <>
            <span className="text-gray-700">Hello, {user.name || user.email}!</span>
            <Button onClick={logout} variant="danger" size="small">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="secondary" size="small">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="small">
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
