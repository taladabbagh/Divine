import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';  
  variant?: 'primary' | 'secondary' | 'back'; 
  className?: string;  
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
}) => {
  const navigate = useNavigate();

  const baseStyle = 'px-4 py-2 rounded font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    secondary: 'bg-gray-500 hover:bg-gray-600',
    back: 'bg-red-500 hover:bg-red-600', 
  };

  const handleClick = () => {
    if (variant === 'back') {
      navigate(-1);  
    } else if (onClick) {
      onClick();  
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
