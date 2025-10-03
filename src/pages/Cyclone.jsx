import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import cycloneImage from "../assets/images/cyclone-img2.jpg";

// Register Chart.js components
Chart.register(...registerables);

const Cyclone = () => {
  const [formData, setFormData] = useState({
    lat: '',
    long: '',
    wind: '',
    pressure: '',
    tropicalstorm_force_diameter: '',
    hurricane_force_diameter: ''
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const intensityChartRef = useRef(null);
  const tracksChartRef = useRef(null);

  // Cyclone safety tips
  const safetyTips = [
    {
      title: "Before a Cyclone",
      icon: "fas fa-home",
      tips: [
        "Secure your property and windows",
        "Prepare emergency kit with supplies",
        "Identify evacuation routes and shelters",
        "Trim trees and secure loose items outdoors"
      ]
    },
    {
      title: "During a Cyclone",
      icon: "fas fa-exclamation-triangle",
      tips: [
        "Stay indoors away from windows",
        "Turn off utilities if instructed",
        "Listen to emergency broadcasts",
        "Evacuate if ordered by authorities"
      ]
    },
    {
      title: "After a Cyclone",
      icon: "fas fa-clinic-medical",
      tips: [
        "Wait for official all-clear before going out",
        "Be aware of damaged infrastructure",
        "Avoid floodwaters and downed power lines",
        "Check on neighbors, especially elderly"
      ]
    }
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call with image processing
      setTimeout(() => {
        const riskLevel = Math.random() > 0.5 ? "High Risk" : "Low Risk";
        setPredictionResult(`Cyclone Risk Assessment: ${riskLevel}`);
        setAccuracy((Math.random() * 20 + 80).toFixed(1)); // Random accuracy between 80-100%
        setIsLoading(false);
      }, 3000); // Longer delay to simulate image processing
    } catch (error) {
      console.error('Error:', error);
      setPredictionResult('Error: Could not get prediction');
      setIsLoading(false);
    }
  };

  // Initialize charts
  useEffect(() => {
    // Initialize intensity chart
    const intensityCtx = document.getElementById('intensityChart');
    if (intensityCtx) {
      if (intensityChartRef.current) {
        intensityChartRef.current.destroy();
      }
      
      intensityChartRef.current = new Chart(intensityCtx, {
        type: 'bar',
        data: {
          labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
          datasets: [{
            label: 'Frequency',
            data: [35, 25, 20, 15, 5],
            backgroundColor: [
              'rgba(75, 192, 192, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(255, 99, 132, 0.5)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Cyclones'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Cyclone Category'
              }
            }
          }
        }
      });
    }

    // Initialize tracks chart
    const tracksCtx = document.getElementById('tracksChart');
    if (tracksCtx) {
      if (tracksChartRef.current) {
        tracksChartRef.current.destroy();
      }
      
      tracksChartRef.current = new Chart(tracksCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Atlantic Basin',
              data: [1, 1, 2, 3, 5, 8, 10, 9, 7, 4, 2, 1],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.1)',
              tension: 0.3,
              fill: true
            },
            {
              label: 'Pacific Basin',
              data: [2, 2, 3, 4, 6, 9, 12, 11, 8, 5, 3, 2],
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.1)',
              tension: 0.3,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Cyclone Activity'
              }
            }
          }
        }
      });
    }

    // Cleanup function to destroy charts
    return () => {
      if (intensityChartRef.current) {
        intensityChartRef.current.destroy();
      }
      if (tracksChartRef.current) {
        tracksChartRef.current.destroy();
      }
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  // Rotate safety tips
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % safetyTips.length);
    }, 5000);
    
    return () => clearInterval(tipInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
          <div className="absolute inset-0 z-0">
        <img
          src={cycloneImage}
          alt="Cyclone background"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(1.2) contrast(1.1)' }}
        />
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`
          }}
        />
      </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in-down">
            Real-Time Cyclone Tracking & Alerts
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white mb-8 animate-fade-in-up">
            Monitor cyclone patterns with precision and receive AI-powered warnings to stay safe during critical weather conditions.
          </p>
          <a 
            href="#cyclonePredictionForm" 
            className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 animate-pulse-slow"
          >
            <i className="fas fa-satellite-dish mr-2"></i> Explore Features
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
              <i className="fas fa-wind mr-3"></i>Cyclone Prediction System
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our advanced AI model analyzes satellite imagery and meteorological data to predict cyclone paths and intensities with high accuracy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Prediction Form */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
                <i className="fas fa-chart-line mr-3"></i> Real-time Cyclone Risk Assessment
              </h2>
              
              <form 
                id="cyclonePredictionForm" 
                className="prediction-form" 
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.keys(formData).map((key) => (
                    <div key={key} className="animate-fade-in">
                      <label 
                        htmlFor={key} 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}
                      </label>
                      <input 
                        type="number" 
                        step="any" 
                        name={key} 
                        id={key} 
                        value={formData[key]}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
                        placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}`}
                      />
                    </div>
                  ))}
                  
                  {/* Image Upload Section */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Satellite Image (Optional)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label
                            htmlFor="satellite-image"
                            className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input 
                              id="satellite-image" 
                              name="satellite-image" 
                              type="file" 
                              className="sr-only" 
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                    
                    {uploadedImage && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Uploaded Image</h4>
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded satellite" 
                          className="w-full h-48 object-contain rounded-lg border border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10">
                  <button 
                    type="submit" 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
                        Analyzing Data...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-satellite-dish mr-3"></i> Predict Cyclone Risk
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Prediction Result */}
              {predictionResult && (
                <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg shadow-md transition-all duration-500 animate-fade-in">
                  <h3 className="font-bold text-xl mb-3 flex items-center">
                    <i className="fas fa-info-circle mr-2"></i> Prediction Result
                  </h3>
                  <p className="text-lg">{predictionResult}</p>
                </div>
              )}
              
              {accuracy && (
                <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 font-semibold rounded-lg shadow-md text-center animate-fade-in">
                  🔍 Model Accuracy: <span className="text-xl">{accuracy}%</span>
                </div>
              )}
            </div>
            
            {/* Safety Information */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
                <i className="fas fa-life-ring mr-3"></i> Cyclone Safety Information
              </h2>
              
              {/* Animated safety tips */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md transition-all duration-500">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mr-4">
                    <i className={`${safetyTips[currentTip].icon} text-indigo-600 dark:text-indigo-300 text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">
                      {safetyTips[currentTip].title}
                    </h3>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
                      {safetyTips[currentTip].tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  {safetyTips.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTip(index)}
                      className={`w-3 h-3 rounded-full mx-1 ${currentTip === index ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Emergency Contacts */}
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 p-5 rounded-lg">
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-3 text-lg flex items-center">
                  <i className="fas fa-phone-alt mr-2"></i> Emergency Contacts
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-blue-700 dark:text-blue-200">
                    <i className="fas fa-phone text-blue-500 dark:text-blue-300 mr-3"></i>
                    <span>Local Emergency: 911</span>
                  </li>
                  <li className="flex items-center text-blue-700 dark:text-blue-200">
                    <i className="fas fa-phone text-blue-500 dark:text-blue-300 mr-3"></i>
                    <span>Cyclone Helpline: 1-800-CYCLONE</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-globe text-blue-500 dark:text-blue-300 mr-3"></i>
                    <a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">National Hurricane Center</a>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-blue-500 dark:text-blue-300 mr-3"></i>
                    <a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">Evacuation Centers Near You</a>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-lg">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 py-2 px-4 rounded-lg text-sm font-medium transition hover:bg-red-200 dark:hover:bg-red-800">
                    <i className="fas fa-exclamation-triangle mr-1"></i> Report Cyclone
                  </button>
                  <button className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 py-2 px-4 rounded-lg text-sm font-medium transition hover:bg-blue-200 dark:hover:bg-blue-800">
                    <i className="fas fa-download mr-1"></i> Safety Guide
                  </button>
                  <button className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 py-2 px-4 rounded-lg text-sm font-medium transition hover:bg-green-200 dark:hover:bg-green-800">
                    <i className="fas fa-map-marked-alt mr-1"></i> Track Map
                  </button>
                  <button className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 py-2 px-4 rounded-lg text-sm font-medium transition hover:bg-purple-200 dark:hover:bg-purple-800">
                    <i className="fas fa-bell mr-1"></i> Alerts
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Historical Data Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-indigo-700 dark:text-indigo-400 flex items-center">
              <i className="fas fa-history mr-3"></i> Historical Cyclone Data Analysis
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="animate-fade-in-left">
                <h3 className="font-bold mb-4 text-gray-800 dark:text-white text-lg">Cyclone Intensity Distribution</h3>
                <div className="h-72">
                  <canvas id="intensityChart"></canvas>
                </div>
              </div>
              
              <div className="animate-fade-in-right">
                <h3 className="font-bold mb-4 text-gray-800 dark:text-white text-lg">Seasonal Activity Patterns</h3>
                <div className="h-72">
                  <canvas id="tracksChart"></canvas>
                </div>
              </div>
            </div>

            {/* Regional Risk Map */}
            <div className="mt-10">
              <h3 className="font-bold mb-6 text-gray-800 dark:text-white text-lg flex items-center">
                <i className="fas fa-map mr-2"></i> Current Cyclone Tracking Map
              </h3>
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <i className="fas fa-wind text-4xl mb-3"></i>
                  <p>Interactive cyclone tracking map would appear here</p>
                  <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
                    View Live Tracking
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Prevention Measures Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-indigo-700 dark:text-indigo-400 flex items-center">
              <i className="fas fa-shield-alt mr-3"></i> Cyclone Preparedness Measures
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-blue-500 dark:text-blue-400 text-3xl mb-3">
                  <i className="fas fa-home"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Structural Safety</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Reinforce buildings with storm shutters and impact-resistant windows.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-green-500 dark:text-green-400 text-3xl mb-3">
                  <i className="fas fa-satellite"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Early Warning Systems</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Implement advanced satellite monitoring for timely alerts.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-yellow-500 dark:text-yellow-400 text-3xl mb-3">
                  <i className="fas fa-route"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Evacuation Planning</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Establish clear evacuation routes and shelter locations.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-red-500 dark:text-red-400 text-3xl mb-3">
                  <i className="fas fa-tools"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Emergency Kits</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Prepare supplies including food, water, medicine, and tools.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode}
        className="fixed bottom-6 right-6 bg-gray-800 dark:bg-yellow-400 text-white dark:text-gray-900 p-4 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <i className="fas fa-sun text-xl"></i>
        ) : (
          <i className="fas fa-moon text-xl"></i>
        )}
      </button>
    </div>
  );
};

export default Cyclone;