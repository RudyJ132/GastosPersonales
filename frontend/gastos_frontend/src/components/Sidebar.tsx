import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  const navItems = [
    { name: 'Dashboard', icon: '📊', path: '/dashboard', protected: true },
    { name: 'Gastos', icon: '💸', path: '/gastos', protected: true },
    { name: 'Categorías', icon: '🏷️', path: '/categorias', protected: true },
    { name: 'Métodos de Pago', icon: '💳', path: '/metodos', protected: true },
    { name: 'Presupuestos', icon: '💰', path: '/presupuestos', protected: true },
    { name: 'Reportes', icon: '📈', path: '/reportes', protected: true },
    { name: 'Importar', icon: '📥', path: '/importar', protected: true },
    { name: 'Perfil', icon: '👤', path: '/perfil', protected: true },
    { name: 'Login', icon: '🚪', path: '/login', protected: false },
    { name: 'Register', icon: '📝', path: '/register', protected: false },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
    >
      <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          Gastos Personales
        </Link>
        <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <nav className="mt-5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isVisible = (item.protected && isAuthenticated) || (!item.protected && !isAuthenticated);

          if (!isVisible) return null;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                isActive ? 'bg-indigo-50 text-indigo-600 font-medium' : ''
              }`}
              onClick={onClose}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
