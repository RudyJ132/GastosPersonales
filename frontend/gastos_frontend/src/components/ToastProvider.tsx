import React from 'react';
import Toast from './Toast';

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <Toast />
    </>
  );
};

export default ToastProvider;
