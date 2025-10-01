// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
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
  useEffect(() => {
    // Initialize theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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
