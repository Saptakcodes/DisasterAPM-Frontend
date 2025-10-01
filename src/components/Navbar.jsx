// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/images/logo.png"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    // { name: 'About Us', path: '/about', icon: "fas fa-users" },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-800 dark:to-green-900 text-white shadow-lg transition-all duration-300 ${scrolled ? 'py-2 shadow-xl' : 'py-3'}`}>
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute -inset-1 bg-white/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <img 
              src={logo} 
              alt="Logo" 
              className="relative h-12 w-12 rounded-full shadow-lg transition-all duration-500 hover:scale-110 hover:rotate-6 border-2 border-white/30" 
            />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-100">
            DisasterAPM
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-1">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <Link 
                to={item.path} 
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${location.pathname === item.path 
                  ? 'text-white bg-green-700 dark:bg-green-900 shadow-inner' 
                  : 'text-white/90 hover:text-white'}`}
              >
                <i className={`${item.icon} mr-1 text-sm`}></i>
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          ))}
          
          <Link 
            to="/login" 
            className="relative px-6 py-0 rounded-lg text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg overflow-hidden group"
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-green-700 dark:bg-green-800 hover:bg-green-800 dark:hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
            aria-label="Toggle theme"
          >
            <i className={isDarkMode ? 'fas fa-sun text-amber-200' : 'fas fa-moon text-blue-100'}></i>
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-green-700 dark:bg-green-800 hover:bg-green-800 dark:hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="Toggle menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-gradient-to-b from-green-700 to-green-800 dark:from-green-900 dark:to-green-950 text-white transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'}`}>
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          {navItems.map((item, index) => (
            <Link 
              key={index}
              to={item.path} 
              className={`py-2 px-4 rounded-lg transition-all duration-300 flex items-center ${location.pathname === item.path 
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
            className="py-2 px-4 rounded-lg text-white bg-gradient-to-r from-emerald-500 to-green-600 text-center mt-2 shadow-md transition-all duration-300 hover:shadow-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;