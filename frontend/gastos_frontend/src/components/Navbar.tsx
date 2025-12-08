import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Button from './ui/Button';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, logout, isAuthenticated } = useAuthStore();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-100 z-10">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden mr-4"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Título visible solo en móvil si se desea, o breadcrumbs */}
        <h1 className="text-xl font-semibold text-gray-800 lg:hidden">
          GastosApp
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {isAuthenticated && user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              Hola, <span className="font-medium text-gray-900">{user.name || user.email}</span>
            </span>
            <Button onClick={logout} variant="ghost" size="sm" className="text-danger hover:bg-red-50 hover:text-red-700">
              Cerrar Sesión
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">
                Registrarse
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
