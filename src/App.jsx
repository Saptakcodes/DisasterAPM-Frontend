// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Button from './components/Button';
import Loader from './components/Loader';
import Pagination from './components/Pagination';
import Home from './pages/Home';
import Alerts from './pages/Alerts';
import Analysis from './pages/Analysis';
import Cyclone from './pages/Cyclone';
import Earthquake from './pages/Earthquake';
import Fire from './pages/Fire';
import Flood from './pages/Flood';
import Heatwave from './pages/Heatwave';
import Thunderstorm from './pages/Thunderstorm';
import Updates from './pages/Updates';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize theme
    const initializeTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const savedTheme = localStorage.getItem('theme');

      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };

    // Initialize app
    const initializeApp = async () => {
      try {
        initializeTheme();
        
        // Simulate initial loading (remove this if not needed)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setLoading(false);
      } catch (error) {
        console.error('Error initializing app:', error);
        setLoading(false);
      }
    };

    initializeApp();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  // Show loader while initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading DisasterAlert...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/cyclone" element={<Cyclone />} />
            <Route path="/earthquake" element={<Earthquake />} />
            <Route path="/fire" element={<Fire />} />
            <Route path="/flood" element={<Flood />} />
            <Route path="/heatwave" element={<Heatwave />} />
            <Route path="/thunderstorm" element={<Thunderstorm />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            
            {/* Optional: 404 Page */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
                  <a 
                    href="/" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Button />
        {/* <Loader /> */}
        <Pagination />
        <Footer />
      </div>
    </Router>
  );
}

export default App;