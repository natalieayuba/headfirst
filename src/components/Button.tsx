import React, { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  alt?: boolean;
}

const Button = ({ children, className, alt }: ButtonProps) => {
  return (
    <button
      className={`py-2 px-4 font-semibold rounded ${
        alt ? 'border' : 'bg-white text-dark-purple'
      }${className ? ` ${className}` : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
