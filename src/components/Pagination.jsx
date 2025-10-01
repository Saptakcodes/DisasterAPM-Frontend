// src/components/Pagination.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Pagination = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState('');
  const location = useLocation();

  const pages = [
    { path: '/', title: 'Home', icon: 'fas fa-home' },
    { path: '/flood', title: 'Flood Prediction', icon: 'fas fa-water' },
    { path: '/fire', title: 'Forest Fire Prediction', icon: 'fas fa-fire' },
    { path: '/earthquake', title: 'Earthquake Prediction', icon: 'fas fa-mountain' },
    { path: '/cyclone', title: 'Cyclone Prediction', icon: 'fas fa-wind' },
    { path: '/thunderstorm', title: 'Thunderstorm Prediction', icon: 'fas fa-bolt' },
    { path: '/heatwave', title: 'Heatwave Prediction', icon: 'fas fa-temperature-high' },
    { path: '/updates', title: 'Real-time Updates', icon: 'fas fa-satellite-dish' },
    { path: '/alerts', title: 'Emergency Alerts', icon: 'fas fa-bell' },
    { path: '/analysis', title: 'Disaster Analysis', icon: 'fas fa-chart-bar' },
    { path: '/about', title: 'About Us', icon: 'fas fa-users' }
  ];

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const togglePagination = () => {
    setIsOpen(!isOpen);
  };

  const containerVariants = {
    closed: {
      height: 50,
      width: 50,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      height: "auto",
      width: "auto",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const itemVariants = {
    closed: { 
      opacity: 0, 
      scale: 0,
      transition: {
        duration: 0.2
      }
    },
    open: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const mainButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <motion.div
        variants={containerVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-xl border border-green-200/30 dark:border-gray-700/30 overflow-hidden"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="p-2 grid grid-cols-1 gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {pages.map((page, index) => (
                <motion.div
                  key={page.path}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  custom={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={page.path}
                    className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                      activePage === page.path
                        ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md'
                        : 'bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-green-100/50 dark:hover:bg-green-900/30'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <i className={`${page.icon} text-sm w-5 text-center mr-2`}></i>
                    <span className="text-xs font-medium whitespace-nowrap">
                      {page.title}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          variants={mainButtonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={togglePagination}
          className={`w-12 h-12 flex items-center justify-center rounded-full shadow-md ${
            isOpen
              ? 'bg-gradient-to-br from-red-500 to-red-600 text-white'
              : 'bg-gradient-to-br from-green-500 to-green-600 text-white'
          }`}
        >
          <motion.i
            className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-sm`}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          ></motion.i>
        </motion.button>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
          >
            Navigation
            <div className="absolute right-[-4px] top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Pagination;