import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isCollapsed, toggleCollapse }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  const navItems = [
    { name: 'Panel Principal', icon: '📊', path: '/dashboard', protected: true },
    { name: 'Gastos', icon: '💸', path: '/gastos', protected: true },
    { name: 'Categorías', icon: '🏷️', path: '/categorias', protected: true },
    { name: 'Métodos de Pago', icon: '💳', path: '/metodos', protected: true },
    { name: 'Presupuestos', icon: '💰', path: '/presupuestos', protected: true },
    { name: 'Reportes', icon: '📈', path: '/reportes', protected: true },
    { name: 'Importar', icon: '📥', path: '/importar', protected: true },
    { name: 'Perfil', icon: '👤', path: '/perfil', protected: true },
  ];

  return (
    <>
      {/* Overlay para móvil */}
      <div
        className={`fixed inset-0 z-30 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden ${isOpen ? 'opacity-100 ease-out duration-300' : 'opacity-0 ease-in duration-200 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 z-40 bg-white shadow-xl transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-all duration-300 ease-in-out flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} h-16 px-4 border-b border-gray-100`}>
          <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span>💰</span>
            {!isCollapsed && <span>GastosApp</span>}
          </Link>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-2 py-6 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isVisible = (item.protected && isAuthenticated) || (!item.protected && !isAuthenticated);

            if (!isVisible) return null;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-2 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                  ? 'bg-primary-light/10 text-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.name : ''}
                onClick={onClose}
              >
                <span className={`text-xl ${!isCollapsed && 'mr-3'}`}>{item.icon}</span>
                {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Botón de Colapso para Desktop */}
        {/* Botón de Colapso para Desktop */}
        <div className="hidden lg:flex justify-center p-2 border-t border-gray-100 z-50 bg-white">
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors focus:outline-none ring-1 ring-gray-200"
            title={isCollapsed ? "Expandir menú" : "Contraer menú"}
          >
            {isCollapsed ? '➡️' : '⬅️'}
          </button>
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className={`flex items-center gap-3 px-2 py-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
              U
            </div>
            {!isCollapsed && (
              <div className="text-sm overflow-hidden">
                <p className="font-medium text-gray-700 truncate">Usuario</p>
                <p className="text-xs text-gray-500 truncate">Ver perfil</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
