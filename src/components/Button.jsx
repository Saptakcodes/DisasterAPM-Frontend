// src/components/Button.jsx
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false,
  icon = null,
  ...props 
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 shadow hover:shadow-md',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 shadow hover:shadow-md',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow hover:shadow-md',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white focus:ring-green-500',
  };

  const disabledClasses = 'opacity-60 cursor-not-allowed';
  const enabledClasses = 'cursor-pointer';

  const classes = `
    ${baseClasses} 
    ${variants[variant]} 
    ${disabled ? disabledClasses : enabledClasses} 
    ${className}
    inline-flex items-center justify-center
  `;

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={classes.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {icon && <i className={`${icon} ${children ? 'mr-2' : ''}`}></i>}
      {children}
    </motion.button>
  );
};

export default Button;