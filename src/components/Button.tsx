import React, { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  alt?: boolean;
}

const Button = ({ children, className, alt }: ButtonProps) => {
  return (
    <button
      className={`min-w-32 px-8 py-4 font-semibold rounded ${
        alt ? 'bg-white' : 'bg-lilac text-dark-night'
      }${className ? ` ${className}` : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
