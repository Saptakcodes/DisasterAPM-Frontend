import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import floodbg from '../assets/videos/flood.mp4'

// Register Chart.js components
Chart.register(...registerables);

const Flood = () => {
  const [formData, setFormData] = useState({
    MonsoonIntensity: '',
    TopographyDrainage: '',
    RiverManagement: '',
    Deforestation: '',
    Urbanization: '',
    ClimateChange: '',
    DamsQuality: '',
    Siltation: '',
    AgriculturalPractices: '',
    Encroachments: '',
    IneffectiveDisasterPreparedness: '',
    DrainageSystems: '',
    CoastalVulnerability: '',
    Landslides: '',
    Watersheds: '',
    DeterioratingInfrastructure: '',
    PopulationScore: '',
    WetlandLoss: '',
    InadequatePlanning: '',
    PoliticalFactors: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const historyChartRef = useRef(null);
  const severityChartRef = useRef(null);

  // Flood safety tips
  const safetyTips = [
    {
      title: "Before a Flood",
      icon: "fas fa-home",
      tips: [
        "Know your area's flood risk",
        "Elevate critical utilities",
        "Install check valves in plumbing",
        "Prepare sandbags and emergency kit"
      ]
    },
    {
      title: "During a Flood",
      icon: "fas fa-exclamation-triangle",
      tips: [
        "Move to higher ground immediately",
        "Avoid walking or driving through flood waters",
        "Stay tuned to weather reports",
        "Turn off utilities if instructed"
      ]
    },
    {
      title: "After a Flood",
      icon: "fas fa-clinic-medical",
      tips: [
        "Avoid floodwaters (may be contaminated)",
        "Be aware of areas where water has receded",
        "Clean and disinfect everything that got wet",
        "Watch for electrical hazards"
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      setTimeout(() => {
        const riskLevel = Math.random() > 0.5 ? "High Risk" : "Low Risk";
        setPredictionResult(`Flood Risk Assessment: ${riskLevel}`);
        setAccuracy((Math.random() * 20 + 80).toFixed(1)); // Random accuracy between 80-100%
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setPredictionResult('Error: Could not get prediction');
      setIsLoading(false);
    }
  };

  // Initialize charts
  useEffect(() => {
    // Initialize flood history chart
    const historyCtx = document.getElementById('floodHistoryChart');
    if (historyCtx) {
      if (historyChartRef.current) {
        historyChartRef.current.destroy();
      }
      
      historyChartRef.current = new Chart(historyCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Flood Frequency',
            data: [12, 19, 8, 15, 24, 35, 42, 38, 31, 19, 12, 9],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // Initialize flood severity chart
    const severityCtx = document.getElementById('floodSeverityChart');
    if (severityCtx) {
      if (severityChartRef.current) {
        severityChartRef.current.destroy();
      }
      
      severityChartRef.current = new Chart(severityCtx, {
        type: 'pie',
        data: {
          labels: ['Low', 'Medium', 'High', 'Extreme'],
          datasets: [{
            data: [30, 25, 35, 10],
            backgroundColor: [
              'rgba(75, 192, 192, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(255, 99, 132, 0.5)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    // Cleanup function to destroy charts
    return () => {
      if (historyChartRef.current) {
        historyChartRef.current.destroy();
      }
      if (severityChartRef.current) {
        severityChartRef.current.destroy();
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
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(1.2) contrast(1.1)' }}
            >
              <source src={floodbg} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Gradient overlay for better text visibility */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))`
              }}
            />
          </div>
        

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in-down">
            Real-Time Flood Prediction
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white mb-8 animate-fade-in-up">
            Stay ahead of floods with AI-powered prediction and early warning systems tailored to your region.
          </p>
          <a 
            href="#floodPredictionForm" 
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 animate-pulse-slow"
          >
            <i className="fas fa-bolt mr-2"></i> Get Risk Assessment
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
            <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-400">
              <i className="fas fa-water mr-3"></i>Flood Prediction System
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our advanced AI model analyzes multiple environmental factors to predict flood risks with high accuracy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Prediction Form */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400 flex items-center">
                <i className="fas fa-chart-line mr-3"></i> Real-time Flood Risk Assessment
              </h2>
              
              <form 
                id="floodPredictionForm" 
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
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input 
                        type="number" 
                        step="any" 
                        name={key} 
                        id={key} 
                        value={formData[key]}
                        onChange={handleInputChange}
                        required
                        min="0"
                        max="100"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
                        placeholder="Enter value (0-100)"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
                        Analyzing Data...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-bolt mr-3"></i> Predict Flood Risk
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
            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400 flex items-center">
                <i className="fas fa-life-ring mr-3"></i> Flood Safety Information
              </h2>
              
              {/* Animated safety tips */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md transition-all duration-500">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                    <i className={`${safetyTips[currentTip].icon} text-green-600 dark:text-green-300 text-lg`}></i>
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
                      className={`w-3 h-3 rounded-full mx-1 ${currentTip === index ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}`}
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
                    <span>Flood Helpline: 1-800-FLOOD-99</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-globe text-blue-500 dark:text-blue-300 mr-3"></i>
                    <a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">National Flood Authority</a>
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
                    <i className="fas fa-exclamation-triangle mr-1"></i> Report Flood
                  </button>
                  <button className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 py-2 px-4 rounded-lg text-sm font-medium transition hover:bg-blue-200 dark:hover:bg-blue-800">
                    <i className="fas fa-download mr-1"></i> Safety Guide
                  </button>
                  <button className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 py-2 px-4 rounded-lg text-sm font-medium transition hover:bg-green-200 dark:hover:bg-green-800">
                    <i className="fas fa-map-marked-alt mr-1"></i> Risk Map
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
            <h2 className="text-2xl font-bold mb-8 text-green-700 dark:text-green-400 flex items-center">
              <i className="fas fa-history mr-3"></i> Historical Flood Data Analysis
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="animate-fade-in-left">
                <h3 className="font-bold mb-4 text-gray-800 dark:text-white text-lg">Flood Frequency by Month</h3>
                <div className="h-72">
                  <canvas id="floodHistoryChart"></canvas>
                </div>
              </div>
              
              <div className="animate-fade-in-right">
                <h3 className="font-bold mb-4 text-gray-800 dark:text-white text-lg">Severity Distribution</h3>
                <div className="h-72">
                  <canvas id="floodSeverityChart"></canvas>
                </div>
              </div>
            </div>

            {/* Regional Risk Map */}
            <div className="mt-10">
              <h3 className="font-bold mb-6 text-gray-800 dark:text-white text-lg flex items-center">
                <i className="fas fa-map mr-2"></i> Regional Flood Risk Map
              </h3>
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <i className="fas fa-map-marked-alt text-4xl mb-3"></i>
                  <p>Interactive flood risk map would appear here</p>
                  <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                    View Full Map
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Prevention Measures Section */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-green-700 dark:text-green-400 flex items-center">
              <i className="fas fa-shield-alt mr-3"></i> Flood Prevention Measures
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-blue-500 dark:text-blue-400 text-3xl mb-3">
                  <i className="fas fa-tree"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Reforestation</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Planting trees to improve water absorption and reduce runoff.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-green-500 dark:text-green-400 text-3xl mb-3">
                  <i className="fas fa-water"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Drainage Systems</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Improving drainage infrastructure to handle excess water.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-yellow-500 dark:text-yellow-400 text-3xl mb-3">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Flood Barriers</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Installing temporary or permanent barriers to protect areas.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-red-500 dark:text-red-400 text-3xl mb-3">
                  <i className="fas fa-bell"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Early Warning</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Implementing advanced alert systems for timely evacuation.</p>
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

export default Flood;