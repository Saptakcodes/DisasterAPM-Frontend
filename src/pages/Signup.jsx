import React, { useState, useRef, useEffect } from 'react';
const disasterVideo = '/videos/disaster_video4.mp4';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video plays correctly on component mount
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Signup attempted with:', formData);
      setIsLoading(false);
      // Here you would typically handle user registration
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* Background Video */}
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={disasterVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Signup Card */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div className={`w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/30 border border-white/20 shadow-2xl ${shake ? 'shake-animation' : 'animate-fadeIn'}`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Create your Account</h2>
            <p className="text-white/80">Join DisasterAlert for monitoring services</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white mb-2 font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="FirstName LastName"
                className="w-full px-4 py-3 border border-gray-300 bg-white/95 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500 transition-all duration-200"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white mb-2 font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 bg-white/95 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500 transition-all duration-200"
              />
            </div>
            
            <div className="relative">
              <label htmlFor="password" className="block text-white mb-2 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 bg-white/95 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500 transition-all duration-200"
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                className="absolute right-3 bottom-3 text-sm text-white hover:text-blue-200 transition-colors duration-200"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            
            <div className="pt-2">
              <button 
                type="submit" 
                className={`w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center ${isLoading ? 'opacity-80' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
            
            <div className="text-center pt-4">
              <p className="text-sm text-white">
                Already have an account? 
                <a href="/login" className="text-blue-200 hover:text-white font-medium ml-1 transition-colors duration-200 underline">Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        .shake-animation {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Signup;