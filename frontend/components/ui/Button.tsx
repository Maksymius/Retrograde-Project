import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({ children, className = '', variant = 'primary', ...props }: ButtonProps) => {
  const baseStyles = "relative overflow-hidden uppercase tracking-widest font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-retro-primary/10 text-retro-primary border border-retro-primary hover:bg-retro-primary hover:text-black hover:shadow-[0_0_15px_rgba(255,176,0,0.5)]",
    secondary: "bg-transparent text-retro-text border border-retro-border hover:border-retro-accent hover:text-retro-accent"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};