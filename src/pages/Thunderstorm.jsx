import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
const thunderstormbg = '/videos/thunderstorm_features2.mp4'

// Register Chart.js components
Chart.register(...registerables);

const Thunderstorm = () => {
  const [formData, setFormData] = useState({
    temperature: '',
    dew_point: '',
    humidity: '',
    pressure: '',
    wind_speed: '',
    wind_direction: '',
    cloud_cover: '',
    precipitation: '',
    uvi: '',
    visibility: '',
    elevation: '',
    weather_code: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [locationName, setLocationName] = useState('');

  const strikeFrequencyChartRef = useRef(null);
  const strikeIntensityChartRef = useRef(null);

  // Thunderstorm safety tips
  const safetyTips = [
    {
      title: "Before a Storm",
      icon: "fas fa-home",
      tips: [
        "Monitor weather forecasts regularly",
        "Identify safe shelters in your area",
        "Unplug electronic devices to prevent damage",
        "Prepare an emergency kit with essentials"
      ]
    },
    {
      title: "During a Storm",
      icon: "fas fa-exclamation-triangle",
      tips: [
        "Seek shelter immediately in a sturdy building",
        "Avoid open fields, high ground, and tall objects",
        "Stay away from water sources and metal objects",
        "Don't use corded phones or electrical appliances"
      ]
    },
    {
      title: "If Someone Is Struck",
      icon: "fas fa-clinic-medical",
      tips: [
        "Call for emergency help immediately",
        "Victims don't carry electrical charge - help is safe",
        "Check for breathing and pulse",
        "Begin CPR if necessary and trained to do so"
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
        setPredictionResult(`Thunderstorm Risk Assessment: ${riskLevel}`);
        setAccuracy((Math.random() * 20 + 80).toFixed(1)); // Random accuracy between 80-100%
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setPredictionResult('Error: Could not get prediction');
      setIsLoading(false);
    }
  };

  // Fetch weather data from API
  const fetchWeatherData = async (lat, lon, name = '') => {
    setWeatherLoading(true);
    setWeatherError(null);
    
    try {
      // Using WeatherAPI
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=196f36a5be2a4c1eaed174902252107&q=${lat},${lon}&days=1`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setLocationName(name || data.location.name);
      
      // Populate form with weather data
      setFormData({
        temperature: data.current.temp_c,
        dew_point: calculateDewPoint(data.current.temp_c, data.current.humidity),
        humidity: data.current.humidity,
        pressure: data.current.pressure_mb,
        wind_speed: data.current.wind_kph,
        wind_direction: data.current.wind_degree,
        cloud_cover: data.current.cloud,
        precipitation: data.current.precip_mm,
        uvi: data.current.uv,
        visibility: data.current.vis_km,
        elevation: data.location.lat, // Using lat as elevation isn't provided
        weather_code: data.current.condition.code
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherError('Unable to fetch weather data. Please try again.');
    } finally {
      setWeatherLoading(false);
    }
  };

  // Calculate dew point from temperature and humidity
  const calculateDewPoint = (temp, humidity) => {
    // Magnus formula approximation
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
    return (b * alpha) / (a - alpha);
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setWeatherError('Geolocation is not supported by your browser');
      return;
    }
    
    setWeatherLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherData(
          position.coords.latitude, 
          position.coords.longitude,
          'Your Location'
        );
      },
      (error) => {
        console.error('Geolocation error:', error);
        setWeatherError('Unable to access your location. Please ensure location services are enabled.');
        setWeatherLoading(false);
      }
    );
  };

  // Search location by name
  const searchLocation = async () => {
    if (!locationInput.trim()) return;
    
    try {
      setWeatherLoading(true);
      // Using WeatherAPI geocoding
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=196f36a5be2a4c1eaed174902252107&q=${locationInput}`
      );
      
      if (!response.ok) {
        throw new Error('Location not found');
      }
      
      const data = await response.json();
      if (data.length === 0) {
        throw new Error('Location not found');
      }
      
      const { lat, lon, name } = data[0];
      fetchWeatherData(lat, lon, name);
    } catch (error) {
      console.error('Location search error:', error);
      setWeatherError('Unable to find the specified location. Please try again.');
      setWeatherLoading(false);
    }
  };

  // Use fetched weather data in prediction form
  const useWeatherData = () => {
    if (weatherData) {
      setFormData({
        temperature: weatherData.current.temp_c,
        dew_point: calculateDewPoint(weatherData.current.temp_c, weatherData.current.humidity),
        humidity: weatherData.current.humidity,
        pressure: weatherData.current.pressure_mb,
        wind_speed: weatherData.current.wind_kph,
        wind_direction: weatherData.current.wind_degree,
        cloud_cover: weatherData.current.cloud,
        precipitation: weatherData.current.precip_mm,
        uvi: weatherData.current.uv,
        visibility: weatherData.current.vis_km,
        elevation: weatherData.location.lat,
        weather_code: weatherData.current.condition.code
      });
    }
  };

  // Initialize charts
  useEffect(() => {
    // Initialize strike frequency chart
    const frequencyCtx = document.getElementById('strikeFrequencyChart');
    if (frequencyCtx) {
      if (strikeFrequencyChartRef.current) {
        strikeFrequencyChartRef.current.destroy();
      }
      
      strikeFrequencyChartRef.current = new Chart(frequencyCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Lightning Strikes',
            data: [1200, 1500, 1800, 2500, 3200, 4000, 4500, 4200, 3500, 2800, 2000, 1500],
            borderColor: 'rgba(33, 150, 243, 1)',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            fill: true,
            tension: 0.3
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

    // Initialize strike intensity chart
    const intensityCtx = document.getElementById('strikeIntensityChart');
    if (intensityCtx) {
      if (strikeIntensityChartRef.current) {
        strikeIntensityChartRef.current.destroy();
      }
      
      strikeIntensityChartRef.current = new Chart(intensityCtx, {
        type: 'bar',
        data: {
          labels: ['<10kA', '10-30kA', '30-50kA', '50-100kA', '100kA+'],
          datasets: [{
            label: 'Strikes by Intensity',
            data: [12000, 8500, 4500, 1800, 500],
            backgroundColor: 'rgba(63, 81, 181, 0.7)',
            borderColor: 'rgba(48, 63, 159, 1)',
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

    // Cleanup function to destroy charts
    return () => {
      if (strikeFrequencyChartRef.current) {
        strikeFrequencyChartRef.current.destroy();
      }
      if (strikeIntensityChartRef.current) {
        strikeIntensityChartRef.current.destroy();
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
                      <source src={thunderstormbg} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Gradient overlay for better text visibility */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))`
                      }}
                    />
                  </div>
                

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in-down">
            Instant Thunderstorm Forecasting
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white mb-8 animate-fade-in-up">
            Get real-time alerts and lightning risk assessments powered by advanced storm prediction technology.
          </p>
          <a 
            href="#thunderstormPredictionForm" 
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

      {/* Weather Data Section */}
      <section id="weatherSection" className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300">
          {/* Weather Header with Toggle */}
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-800 dark:to-blue-700 p-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <i className="fas fa-cloud-sun mr-3"></i> Real-time Weather Data
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={getCurrentLocation}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition flex items-center"
              >
                <i className="fas fa-location-arrow mr-2"></i> Use My Location
              </button>
              <button 
                onClick={() => setShowLocationSearch(!showLocationSearch)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition"
              >
                <i className="fas fa-search-location"></i>
              </button>
            </div>
          </div>

          {/* Location Search Input */}
          <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${showLocationSearch ? 'block' : 'hidden'}`}>
            <div className="flex">
              <input 
                type="text" 
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter city or zip code" 
                className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
              <button 
                onClick={searchLocation}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          {/* Weather Display */}
          <div className="p-6">
            {weatherLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">Fetching weather data...</p>
              </div>
            ) : weatherError ? (
              <div className="p-6 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                <span>{weatherError}</span>
              </div>
            ) : weatherData ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Main Weather Card */}
                  <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 rounded-xl p-6 shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{locationName}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {weatherData.current.condition.text}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Humidity: {weatherData.current.humidity}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center">
                        <i className="fas fa-cloud-rain text-6xl text-blue-500 dark:text-blue-300 mr-4"></i>
                        <div>
                          <span className="text-5xl font-bold text-gray-800 dark:text-white">
                            {Math.round(weatherData.current.temp_c)}°
                          </span>
                          <span className="text-gray-600 dark:text-gray-300 ml-1">C</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600 dark:text-gray-300">
                          Feels like: {Math.round(weatherData.current.feelslike_c)}°
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Wind: {Math.round(weatherData.current.wind_kph)} km/h
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Thunderstorm Risk Card */}
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/50 dark:to-yellow-800/50 rounded-xl p-6 shadow flex flex-col justify-center">
                    <div className="text-center">
                      <i className="fas fa-bolt text-4xl text-yellow-500 dark:text-yellow-400 mb-3"></i>
                      <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-1">
                        Thunderstorm Risk
                      </h3>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <p className="text-sm mt-2 text-yellow-600 dark:text-yellow-300">
                        Risk Level: Moderate
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Use Weather Data Button */}
                <button 
                  onClick={useWeatherData}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                >
                  <i className="fas fa-cloud-download-alt mr-3"></i> Use This Weather Data for Prediction
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <i className="fas fa-cloud-rain text-5xl text-gray-400 mb-4"></i>
                <p className="text-gray-600 dark:text-gray-400">Enter a location to view weather data</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-blue-700 dark:text-blue-400">
              <i className="fas fa-bolt mr-3"></i>Thunderstorm Prediction System
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our advanced AI model analyzes atmospheric conditions to predict thunderstorm risks with high accuracy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Prediction Form */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400 flex items-center">
                <i className="fas fa-chart-line mr-3"></i> Real-time Thunderstorm Risk Assessment
              </h2>
              
              <form 
                id="thunderstormPredictionForm" 
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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
                        placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
                        Analyzing Atmospheric Conditions...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-cloud-bolt mr-3"></i> Predict Thunderstorm Risk
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

              {/* Lightning Map */}
              <div className="mt-8">
                <h3 className="font-bold mb-4 text-gray-800 dark:text-white">Thunderstorm Strike Probability</h3>
                <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <img 
                    src="https://via.placeholder.com/600x300/1e3a8a/ffffff?text=Lightning+Strike+Map" 
                    alt="Lightning strike probability map" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* Safety Information */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400 flex items-center">
                <i className="fas fa-life-ring mr-3"></i> Thunderstorm Safety Information
              </h2>
              
              {/* Animated safety tips */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md transition-all duration-500">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                    <i className={`${safetyTips[currentTip].icon} text-blue-600 dark:text-blue-300 text-lg`}></i>
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
                      className={`w-3 h-3 rounded-full mx-1 ${currentTip === index ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
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
                    <span>Storm Helpline: 1-800-STORM-99</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-globe text-blue-500 dark:text-blue-300 mr-3"></i>
                    <a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">NOAA Lightning Safety</a>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-blue-500 dark:text-blue-300 mr-3"></i>
                    <a href="#" className="text-blue-600 dark:text-blue-300 hover:underline">Shelter Locations</a>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-lg">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 py-2 px-4 rounded-lg text-sm font-medium transition hover:bg-red-200 dark:hover:bg-red-800">
                    <i className="fas fa-exclamation-triangle mr-1"></i> Report Lightning
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
            <h2 className="text-2xl font-bold mb-8 text-blue-700 dark:text-blue-400 flex items-center">
              <i className="fas fa-history mr-3"></i> Historical Lightning Data
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="animate-fade-in-left">
                <h3 className="font-bold mb-4 text-gray-800 dark:text-white text-lg">Monthly Strike Frequency</h3>
                <div className="h-72">
                  <canvas id="strikeFrequencyChart"></canvas>
                </div>
              </div>
              
              <div className="animate-fade-in-right">
                <h3 className="font-bold mb-4 text-gray-800 dark:text-white text-lg">Strike Intensity Distribution</h3>
                <div className="h-72">
                  <canvas id="strikeIntensityChart"></canvas>
                </div>
              </div>
            </div>

            {/* Regional Risk Map */}
            <div className="mt-10">
              <h3 className="font-bold mb-6 text-gray-800 dark:text-white text-lg flex items-center">
                <i className="fas fa-map mr-2"></i> Regional Lightning Risk Map
              </h3>
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <i className="fas fa-map-marked-alt text-4xl mb-3"></i>
                  <p>Interactive lightning risk map would appear here</p>
                  <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                    View Full Map
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Prevention Measures Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-blue-700 dark:text-blue-400 flex items-center">
              <i className="fas fa-shield-alt mr-3"></i> Thunderstorm Prevention Measures
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-blue-500 dark:text-blue-400 text-3xl mb-3">
                  <i className="fas fa-bolt"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Lightning Rods</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Install lightning protection systems on buildings to safely direct strikes to ground.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-green-500 dark:text-green-400 text-3xl mb-3">
                  <i className="fas fa-tree"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Tree Maintenance</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Trim trees near structures to prevent lightning damage and falling branches.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-yellow-500 dark:text-yellow-400 text-3xl mb-3">
                  <i className="fas fa-bell"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Early Warning</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Implement advanced alert systems for timely notifications of approaching storms.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-red-500 dark:text-red-400 text-3xl mb-3">
                  <i className="fas fa-house-damage"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Surge Protection</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Use surge protectors for electronic devices to prevent damage from power surges.</p>
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

export default Thunderstorm;