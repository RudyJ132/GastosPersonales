import React, { useEffect } from 'react';
import { useUIStore } from '../store/uiStore';

const Toast: React.FC = () => {
  const { message, clearMessage } = useUIStore();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 3000); // Auto close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  if (!message) return null;

  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-sky-500',
  }[message.type];

  const icon = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
  }[message.type];

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white flex items-center space-x-2 z-50 ${typeStyles}`}
      role="alert"
    >
      <span className="text-xl">{icon}</span>
      <span>{message.text}</span>
      <button onClick={clearMessage} className="ml-auto p-1 rounded-full hover:bg-white hover:bg-opacity-20">
        &times;
      </button>
    </div>
  );
};

export default Toast;
