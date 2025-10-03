// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/images/logo.png"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const location = useLocation();

  useEffect(() => {
    // Check for dark mode preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }

    // Handle scroll effect
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // Handle resize for responsive behavior
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      // Close mobile menu when resizing to large screen
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/', icon: 'fas fa-home' },
    { name: 'Flood', path: '/flood', icon: 'fas fa-water' },
    { name: 'Forest Fire', path: '/fire', icon: 'fas fa-fire' },
    { name: 'Earthquake', path: '/earthquake', icon: 'fas fa-mountain' },
    { name: 'Cyclone', path: '/cyclone', icon: 'fas fa-wind' },
    { name: 'Thunderstorm', path: '/thunderstorm', icon: 'fas fa-bolt' },
    { name: 'Heatwave', path: '/heatwave', icon: 'fas fa-temperature-high' },
    { name: 'Updates', path: '/updates', icon: 'fas fa-satellite-dish' },
    { name: 'Alerts', path: '/alerts', icon: 'fas fa-bell' },
    { name: 'Analysis', path: '/analysis', icon: 'fas fa-chart-bar' },
  ];

  // For large screens, show all items. For medium screens, show fewer items with dropdown
  const getVisibleNavItems = () => {
    if (isLargeScreen) {
      return navItems;
    } else if (window.innerWidth >= 768) {
      // For medium screens, show first 4 items + dropdown for rest
      return navItems.slice(0, 4);
    } else {
      // For mobile, all items go in the mobile menu
      return [];
    }
  };

  const visibleNavItems = getVisibleNavItems();
  const dropdownItems = window.innerWidth >= 768 && !isLargeScreen ? navItems.slice(4) : [];

  return (
    <header className={`sticky top-0 z-50 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-800 dark:to-green-900 text-white shadow-lg transition-all duration-300 ${scrolled ? 'py-2 shadow-xl' : 'py-3'}`}>
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute -inset-1 bg-white/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <img 
              src={logo} 
              alt="Logo" 
              className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-lg transition-all duration-500 hover:scale-110 hover:rotate-6 border-2 border-white/30" 
            />
          </div>
          <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-100">
            DisasterAPM
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-1">
          {visibleNavItems.map((item, index) => (
            <div key={index} className="relative group">
              <Link 
                to={item.path} 
                className={`relative px-2 py-1 sm:px-3 sm:py-2 rounded-lg transition-all duration-300 text-sm sm:text-base ${location.pathname === item.path 
                  ? 'text-white bg-green-700 dark:bg-green-900 shadow-inner' 
                  : 'text-white/90 hover:text-white'}`}
              >
                <i className={`${item.icon} mr-1 text-xs sm:text-sm`}></i>
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          ))}
          
          {/* Dropdown for medium screens */}
          {dropdownItems.length > 0 && (
            <div className="relative group">
              <button className="px-2 py-1 sm:px-3 sm:py-2 rounded-lg transition-all duration-300 text-sm sm:text-base text-white/90 hover:text-white flex items-center">
                <i className="fas fa-chevron-down mr-1 text-xs sm:text-sm"></i>
                More
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-200 dark:border-gray-700">
                {dropdownItems.map((item, index) => (
                  <Link 
                    key={index}
                    to={item.path} 
                    className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900 transition-colors duration-200 ${location.pathname === item.path ? 'bg-green-100 dark:bg-green-800' : ''}`}
                  >
                    <i className={`${item.icon} mr-2 w-4 text-center`}></i>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <Link 
            to="/login" 
            className="relative px-4 py-1 sm:px-6 sm:py-2 rounded-lg text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg overflow-hidden group text-sm sm:text-base ml-2"
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </Link>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-green-700 dark:bg-green-800 hover:bg-green-800 dark:hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 text-sm"
            aria-label="Toggle theme"
          >
            <i className={isDarkMode ? 'fas fa-sun text-amber-200' : 'fas fa-moon text-blue-100'}></i>
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-green-700 dark:bg-green-800 hover:bg-green-800 dark:hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="Toggle menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-gradient-to-b from-green-700 to-green-800 dark:from-green-900 dark:to-green-950 text-white transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0 py-0'}`}>
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          {navItems.map((item, index) => (
            <Link 
              key={index}
              to={item.path} 
              className={`py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${location.pathname === item.path 
                ? 'bg-green-800 dark:bg-green-700 shadow-inner' 
                : 'hover:bg-green-800/50'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className={`${item.icon} mr-3 w-5 text-center`}></i>
              {item.name}
            </Link>
          ))}
          <Link 
            to="/login" 
            className="py-3 px-4 rounded-lg text-white bg-gradient-to-r from-emerald-500 to-green-600 text-center mt-2 shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="fas fa-sign-in-alt mr-2"></i>
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;