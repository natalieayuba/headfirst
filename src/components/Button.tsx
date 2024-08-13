import React, { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  alt?: boolean;
}

const Button = ({ children, className, alt }: ButtonProps) => {
  return (
    <button
      className={`h-11 min-w-32 px-4 font-semibold rounded ${
        alt ? 'border' : 'bg-white text-dark-purple'
      }${className ? ` ${className}` : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
