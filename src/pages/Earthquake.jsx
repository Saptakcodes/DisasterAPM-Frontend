import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import earthquakebg from '../assets/videos/earthquake_features2.mp4'

// Register Chart.js components
Chart.register(...registerables);

const Earthquake = () => {
  const [formData, setFormData] = useState({
    location: '',
    historicalData: '',
    tectonicPlate: '',
    faultType: 'normal',
    seismicActivity: '',
    soilType: '',
    buildingResilience: '',
    populationDensity: '',
    proximityToFault: '',
    groundAcceleration: '',
    liquefactionPotential: '',
    landslideRisk: '',
    tsunamiRisk: '',
    infrastructureQuality: '',
    earlyWarningSystems: '',
    historicalMagnitude: '',
    depth: '',
    aftershockProbability: ''
  });
  const [timeSeriesFile, setTimeSeriesFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const magnitudeChartRef = useRef(null);
  const depthMagnitudeChartRef = useRef(null);
  const seismicChartRef = useRef(null);

  // Earthquake safety tips
  const safetyTips = [
    {
      title: "Before an Earthquake",
      icon: "fas fa-home",
      tips: [
        "Secure heavy furniture and appliances",
        "Identify safe spots in each room",
        "Prepare an emergency kit",
        "Practice drop, cover, and hold on"
      ]
    },
    {
      title: "During an Earthquake",
      icon: "fas fa-exclamation-triangle",
      tips: [
        "Drop, cover, and hold on",
        "Stay indoors until shaking stops",
        "Stay away from windows",
        "If outside, move to an open area"
      ]
    },
    {
      title: "After an Earthquake",
      icon: "fas fa-clinic-medical",
      tips: [
        "Check for injuries and damages",
        "Be prepared for aftershocks",
        "Listen to emergency broadcasts",
        "Use phone only for emergencies"
      ]
    }
  ];

  // Tectonic plates options
  const tectonicPlates = [
    "Pacific Plate",
    "North American Plate",
    "Eurasian Plate",
    "Indo-Australian Plate",
    "African Plate",
    "Antarctic Plate",
    "South American Plate",
    "Nazca Plate"
  ];

  // Fault types
  const faultTypes = [
    "Normal",
    "Reverse",
    "Strike-Slip",
    "Oblique"
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setTimeSeriesFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      setTimeout(() => {
        const riskLevel = Math.random() > 0.5 ? "High Seismic Risk" : "Low Seismic Risk";
        const magnitude = (Math.random() * 5 + 3).toFixed(1); // Random magnitude between 3.0-8.0
        setPredictionResult(`Earthquake Risk Assessment: ${riskLevel} - Predicted Magnitude: ${magnitude}`);
        setAccuracy((Math.random() * 15 + 80).toFixed(1)); // Random accuracy between 80-95%
        setIsLoading(false);
        
        // Show time series visualization after prediction
        document.getElementById('timeSeriesViz').classList.remove('hidden');
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setPredictionResult('Error: Could not get prediction');
      setIsLoading(false);
    }
  };

  // Initialize charts
  useEffect(() => {
    // Initialize magnitude distribution chart
    const magnitudeCtx = document.getElementById('magnitudeChart');
    if (magnitudeCtx) {
      if (magnitudeChartRef.current) {
        magnitudeChartRef.current.destroy();
      }
      
      magnitudeChartRef.current = new Chart(magnitudeCtx, {
        type: 'bar',
        data: {
          labels: ['3.0-4.0', '4.0-5.0', '5.0-6.0', '6.0-7.0', '7.0+'],
          datasets: [{
            label: 'Number of Earthquakes',
            data: [45, 32, 18, 8, 3],
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
                text: 'Frequency'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Magnitude Range'
              }
            }
          }
        }
      });
    }

    // Initialize depth vs magnitude chart
    const depthMagnitudeCtx = document.getElementById('depthMagnitudeChart');
    if (depthMagnitudeCtx) {
      if (depthMagnitudeChartRef.current) {
        depthMagnitudeChartRef.current.destroy();
      }
      
      // Generate sample data
      const depthData = Array.from({length: 20}, () => Math.floor(Math.random() * 600));
      const magnitudeData = depthData.map(depth => 
        (7 - (depth / 100) + (Math.random() * 2 - 1)).toFixed(1)
      );
      
      depthMagnitudeChartRef.current = new Chart(depthMagnitudeCtx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Depth vs Magnitude',
            data: depthData.map((depth, i) => ({
              x: depth,
              y: magnitudeData[i]
            })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              title: {
                display: true,
                text: 'Magnitude'
              },
              beginAtZero: false,
              min: 3,
              max: 8
            },
            x: {
              title: {
                display: true,
                text: 'Depth (km)'
              },
              reverse: true // Deeper earthquakes at the right
            }
          }
        }
      });
    }

    // Initialize seismic activity chart (will be shown after prediction)
    const seismicCtx = document.getElementById('seismicChart');
    if (seismicCtx) {
      if (seismicChartRef.current) {
        seismicChartRef.current.destroy();
      }
      
      // Generate time series data for the last 14 days
      const dates = Array.from({length: 14}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (13 - i));
        return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
      });
      
      const seismicData = dates.map(() => Math.random() * 10);
      
      seismicChartRef.current = new Chart(seismicCtx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Seismic Activity',
            data: seismicData,
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
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
                text: 'Activity Level'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            }
          }
        }
      });
    }

    // Cleanup function to destroy charts
    return () => {
      if (magnitudeChartRef.current) {
        magnitudeChartRef.current.destroy();
      }
      if (depthMagnitudeChartRef.current) {
        depthMagnitudeChartRef.current.destroy();
      }
      if (seismicChartRef.current) {
        seismicChartRef.current.destroy();
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
              <source src={earthquakebg} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Gradient overlay for better text visibility */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7))`
              }}
            />
          </div>
        

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in-down">
            Earthquake Early Warning System
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white mb-8 animate-fade-in-up">
            Access AI-driven seismic predictions and alerts to prepare and respond effectively to ground-shaking events.
          </p>
          <a 
            href="#earthquakePredictionForm" 
            className="mt-6 inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 animate-pulse-slow"
          >
            <i className="fas fa-wave-square mr-2"></i> Explore Features
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
            <h1 className="text-4xl font-bold mb-4 text-orange-700 dark:text-orange-400">
              <i className="fas fa-mountain mr-3"></i>Earthquake Prediction System
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our advanced AI model analyzes multiple seismic factors to predict earthquake risks with high accuracy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Prediction Form */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-orange-700 dark:text-orange-400 flex items-center">
                <i className="fas fa-chart-line mr-3"></i> Seismic Activity Analysis
              </h2>
              
              <form 
                id="earthquakePredictionForm" 
                className="prediction-form" 
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location */}
                  <div className="animate-fade-in">
                    <label 
                      htmlFor="location" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Location
                    </label>
                    <input 
                      type="text" 
                      name="location" 
                      id="location" 
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
                      placeholder="City or Coordinates"
                    />
                  </div>

                  {/* Upload Time Series CSV */}
                  <div className="md:col-span-2 animate-fade-in">
                    <label 
                      htmlFor="timeSeriesFile" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Upload Seismic Data (Last 14 Days)
                    </label>
                    <div className="flex items-center space-x-3">
                      <input 
                        type="file" 
                        id="timeSeriesFile" 
                        name="timeSeriesFile" 
                        accept=".csv" 
                        onChange={handleFileChange}
                        className="hidden"
                        required
                      />
                      <button 
                        type="button" 
                        onClick={() => document.getElementById('timeSeriesFile').click()}
                        className="text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded transition-colors"
                      >
                        <i className="fas fa-upload mr-2"></i> Upload CSV
                      </button>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {timeSeriesFile ? timeSeriesFile.name : "No file chosen"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Expected columns: date, longitude, latitude, depth, significance, tsunami
                    </p>
                  </div>

                  {/* Historical Data */}
                  <div className="animate-fade-in">
                    <label 
                      htmlFor="historicalData" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Historical Earthquakes (Last 5 Years)
                    </label>
                    <input 
                      type="number" 
                      name="historicalData" 
                      id="historicalData" 
                      value={formData.historicalData}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
                      placeholder="e.g., 30"
                    />
                  </div>

                  {/* Tectonic Plate */}
                  <div className="animate-fade-in">
                    <label 
                      htmlFor="tectonicPlate" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Nearest Tectonic Plate
                    </label>
                    <select 
                      name="tectonicPlate" 
                      id="tectonicPlate" 
                      value={formData.tectonicPlate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
                    >
                      <option value="">Select plate</option>
                      {tectonicPlates.map(plate => (
                        <option key={plate} value={plate.toLowerCase().replace(/\s+/g, '_')}>
                          {plate}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Fault Type */}
                  <div className="md:col-span-2 animate-fade-in">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fault Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {faultTypes.map(type => (
                        <label key={type} className="flex items-center text-gray-800 dark:text-gray-200">
                          <input 
                            type="radio" 
                            name="faultType" 
                            value={type.toLowerCase().replace(/-/g, '_')} 
                            checked={formData.faultType === type.toLowerCase().replace(/-/g, '_')}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Additional seismic parameters */}
                  {['seismicActivity', 'soilType', 'buildingResilience', 'populationDensity', 
                    'proximityToFault', 'groundAcceleration', 'liquefactionPotential', 
                    'landslideRisk', 'tsunamiRisk', 'infrastructureQuality', 
                    'earlyWarningSystems', 'historicalMagnitude', 'depth', 
                    'aftershockProbability'].map((key) => (
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
                        min="0"
                        max="100"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
                        placeholder="Enter value (0-100)"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
                        Analyzing Seismic Data...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-wave-square mr-3"></i> Analyze Seismic Risk
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Loading Indicator */}
              {isLoading && (
                <div className="mt-6 text-center">
                  <p className="mt-2 text-gray-600 dark:text-gray-300">Processing time series data with LSTM model...</p>
                </div>
              )}

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

              {/* Time Series Visualization */}
              <div id="timeSeriesViz" className="mt-8 hidden animate-fade-in">
                <h3 className="font-bold mb-4 text-gray-800 dark:text-white text-lg">Seismic Activity Visualization</h3>
                <div className="h-72">
                  <canvas id="seismicChart"></canvas>
                </div>
              </div>
            </div>
            
            {/* Safety Information */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-orange-700 dark:text-orange-400 flex items-center">
                <i className="fas fa-life-ring mr-3"></i> Earthquake Safety Information
              </h2>
              
              {/* Animated safety tips */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md transition-all duration-500">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-900 p-3 rounded-full mr-4">
                    <i className={`${safetyTips[currentTip].icon} text-orange-600 dark:text-orange-300 text-lg`}></i>
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
                      className={`w-3 h-3 rounded-full mx-1 ${currentTip === index ? 'bg-orange-600' : 'bg-gray-300 dark:bg-gray-600'}`}
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
                    <span>Seismic Helpline: 1-800-EARTH-99</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-globe text-blue-500 dark:text-blue-300 mr-3"></i>
                    <a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">USGS Earthquake Information</a>
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
                    <i className="fas fa-exclamation-triangle mr-1"></i> Report Earthquake
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

              {/* Richter Scale Reference */}
              <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 p-4 rounded-lg">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2 text-lg">Richter Scale Guide</h3>
                <ul className="text-sm space-y-2 text-yellow-700 dark:text-yellow-300">
                  <li className="flex justify-between">
                    <span>2.5 or less</span>
                    <span>Usually not felt</span>
                  </li>
                  <li className="flex justify-between">
                    <span>2.5 to 5.4</span>
                    <span>Minor damage possible</span>
                  </li>
                  <li className="flex justify-between">
                    <span>5.5 to 6.0</span>
                    <span>Slight damage to buildings</span>
                  </li>
                  <li className="flex justify-between">
                    <span>6.1 to 6.9</span>
                    <span>May cause damage in populated areas</span>
                  </li>
                  <li className="flex justify-between">
                    <span>7.0 to 7.9</span>
                    <span>Major earthquake</span>
                  </li>
                  <li className="flex justify-between">
                    <span>8.0 or greater</span>
                    <span>Great earthquake, serious damage</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Historical Data Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-orange-700 dark:text-orange-400 flex items-center">
              <i className="fas fa-history mr-3"></i> Historical Earthquake Data Analysis
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="animate-fade-in-left">
                <h3 className="font-bold mb-4 text-gray-800 dark:text-white text-lg">Magnitude Distribution</h3>
                <div className="h-72">
                  <canvas id="magnitudeChart"></canvas>
                </div>
              </div>
              
              <div className="animate-fade-in-right">
                <h3 className="font-bold mb-4 text-gray-800 dark:text-white text-lg">Depth vs. Magnitude</h3>
                <div className="h-72">
                  <canvas id="depthMagnitudeChart"></canvas>
                </div>
              </div>
            </div>

            {/* Tectonic Plates Map */}
            <div className="mt-10">
              <h3 className="font-bold mb-6 text-gray-800 dark:text-white text-lg flex items-center">
                <i className="fas fa-map mr-2"></i> Global Tectonic Plates Map
              </h3>
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <i className="fas fa-globe-americas text-4xl mb-3"></i>
                  <p>Interactive tectonic plates map would appear here</p>
                  <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm">
                    View Plate Boundaries
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Prevention Measures Section */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-orange-700 dark:text-orange-400 flex items-center">
              <i className="fas fa-shield-alt mr-3"></i> Earthquake Preparedness Measures
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-blue-500 dark:text-blue-400 text-3xl mb-3">
                  <i className="fas fa-house-damage"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Structural Reinforcement</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Retrofitting buildings to withstand seismic forces.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-green-500 dark:text-green-400 text-3xl mb-3">
                  <i className="fas fa-warning"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Early Warning Systems</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Implementing systems to detect earthquakes seconds before shaking arrives.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-yellow-500 dark:text-yellow-400 text-3xl mb-3">
                  <i className="fas fa-drafting-compass"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Zoning Regulations</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Enforcing building codes in high-risk areas.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-red-500 dark:text-red-400 text-3xl mb-3">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Community Drills</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Regular practice of earthquake response procedures.</p>
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

export default Earthquake;