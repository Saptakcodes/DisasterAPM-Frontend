// src/components/Loader.jsx
const Loader = ({ size = 'medium' }) => {
  const sizes = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizes[size]} border-4 border-green-200 border-t-green-600 rounded-full animate-spin`}></div>
    </div>
  );
};

export default Loader;