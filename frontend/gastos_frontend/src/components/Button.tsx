import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  loading?: boolean; // Add loading prop
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  disabled,
  loading, // Destructure loading prop
  ...props
}) => {
  const baseStyles = 'rounded-lg transition-all duration-200 ease-in-out flex items-center justify-center'; // Added flex for centering loader

  const variantStyles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800',
    secondary: 'bg-indigo-500 text-white hover:bg-indigo-600 active:bg-indigo-700',
    accent: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
    warning: 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700',
    info: 'bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700',
  }[variant];

  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-5 py-3 text-lg',
  }[size];

  const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : ''; // Disable if loading

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${disabledStyles} ${className}`}
      disabled={disabled || loading} // Pass disabled prop including loading state
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;