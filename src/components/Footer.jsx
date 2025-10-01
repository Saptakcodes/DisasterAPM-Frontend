// src/components/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Socials */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-shield-alt mr-2"></i> DisasterAlert
            </h3>
            <p className="mb-4">Providing AI-powered disaster predictions to keep communities safe worldwide.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-green-300"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="text-white hover:text-green-300"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white hover:text-green-300"><i className="fab fa-github"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-green-300 hover:underline transition">Home</Link></li>
              <li><Link to="/alerts" className="hover:text-green-300 hover:underline transition">Alerts</Link></li>
              <li><Link to="/updates" className="hover:text-green-300 hover:underline transition">Recent Updates</Link></li>
              <li><Link to="/analysis" className="hover:text-green-300 hover:underline transition">Analysis</Link></li>
            </ul>
          </div>

          {/* Predictions */}
          <div>
            <h4 className="font-bold mb-4">Predictions</h4>
            <ul className="space-y-2">
              <li><Link to="/flood" className="hover:text-green-300 hover:underline transition">Flood</Link></li>
              <li><Link to="/fire" className="hover:text-green-300 hover:underline transition">Forest Fire</Link></li>
              <li><Link to="/earthquake" className="hover:text-green-300 hover:underline transition">Earthquake</Link></li>
              <li><Link to="/cyclone" className="hover:text-green-300 hover:underline transition">Cyclone</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-white">
              <li className="flex items-start"><i className="fas fa-envelope mt-1 mr-2"></i><span>alerts@disasterpredict.org</span></li>
              <li className="flex items-start"><i className="fas fa-phone-alt mt-1 mr-2"></i><span>+1 (555) 123-4567</span></li>
              <li className="flex items-start"><i className="fas fa-map-marker-alt mt-1 mr-2"></i><span>123 Safety Ave, Resilience City</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p>&copy; 2025 DisasterAPM. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4 text-sm">
            <a href="#" className="hover:text-green-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-green-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-green-300 transition">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;