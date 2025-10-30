// src/components/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-900 dark:from-green-900 dark:to-green-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <div className="relative mr-2">
                <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm opacity-50"></div>
                <i className="fas fa-shield-alt relative text-green-300"></i>
              </div>
              DisasterAPM
            </h3>
            <p className="mb-4 text-white/90">
              Advanced AI-powered disaster prediction and monitoring to keep communities safe worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-green-700 hover:bg-green-600 transition-all duration-300 transform hover:scale-110" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in text-sm"></i>
              </a>
              <a href="#" className="p-2 rounded-full bg-green-700 hover:bg-green-600 transition-all duration-300 transform hover:scale-110" aria-label="Twitter">
                <i className="fab fa-twitter text-sm"></i>
              </a>
              <a href="#" className="p-2 rounded-full bg-green-700 hover:bg-green-600 transition-all duration-300 transform hover:scale-110" aria-label="GitHub">
                <i className="fab fa-github text-sm"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-green-300">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-green-300 transition-all duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="hover:text-green-300 transition-all duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                  Alerts
                </Link>
              </li>
              <li>
                <Link to="/updates" className="hover:text-green-300 transition-all duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                  Recent Updates
                </Link>
              </li>
              <li>
                <Link to="/analysis" className="hover:text-green-300 transition-all duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                  Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Predictions */}
          <div>
            <h4 className="font-bold mb-4 text-green-300">Predictions</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/flood" className="hover:text-green-300 transition-all duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                  Flood
                </Link>
              </li>
              <li>
                <Link to="/fire" className="hover:text-green-300 transition-all duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                  Forest Fire
                </Link>
              </li>
              <li>
                <Link to="/earthquake" className="hover:text-green-300 transition-all duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                  Earthquake
                </Link>
              </li>
              <li>
                <Link to="/cyclone" className="hover:text-green-300 transition-all duration-300 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                  Cyclone
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-green-300">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start group hover:text-green-300 transition-colors duration-300">
                <i className="fas fa-envelope mt-1 mr-3 text-green-400 group-hover:scale-110 transition-transform duration-300"></i>
                <span>support@disasterapm.org</span>
              </li>
              <li className="flex items-start group hover:text-green-300 transition-colors duration-300">
                <i className="fas fa-phone-alt mt-1 mr-3 text-green-400 group-hover:scale-110 transition-transform duration-300"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start group hover:text-green-300 transition-colors duration-300">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-green-400 group-hover:scale-110 transition-transform duration-300"></i>
                <span>123 Safety Ave, Resilience City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700/50 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/80">
              &copy; 2025 <span className="font-bold text-green-300">DisasterAPM</span>. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="#" className="hover:text-green-300 transition-colors duration-300 hover:underline">Privacy Policy</a>
              <a href="#" className="hover:text-green-300 transition-colors duration-300 hover:underline">Terms of Service</a>
              <a href="#" className="hover:text-green-300 transition-colors duration-300 hover:underline">Disclaimer</a>
            </div>
          </div>
          <p className="mt-4 text-xs text-white/60">
            Advanced Prediction and Monitoring System for Natural Disasters
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;