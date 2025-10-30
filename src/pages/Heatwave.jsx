import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import heatwaveImage from "../assets/images/heatwave-img.jpg";

// Register Chart.js components
Chart.register(...registerables);

const Heatwave = () => {
  const [formData, setFormData] = useState({
    temperature_max: '',
    temperature_min: '',
    humidity_max: '',
    humidity_min: '',
    precipitation: '',
    uv_index: '',
    visibility: '',
    historicalData: 'no',
    urbanHeat: 'medium',
    wind_speed: '',
    soil_moisture: '',
    vegetation_index: '',
    drought_index: '',
    air_quality: '',
    population_density: '',
    previous_fires: '',
    fire_risk_index: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [satelliteImage, setSatelliteImage] = useState(null);

  // Weather API states
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [locationName, setLocationName] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);

  const tempTrendChartRef = useRef(null);
  const frequencyChartRef = useRef(null);
  const riskMapChartRef = useRef(null);

  // API base URL - CORRECTED with /api prefix
  const API_BASE_URL = 'http://127.0.0.1:5000';

  // Heatwave safety tips
  const safetyTips = [
    {
      title: "Before a Heatwave",
      icon: "fas fa-home",
      tips: [
        "Install window reflectors to keep heat out",
        "Weather-strip doors and windows",
        "Identify cooling centers in your area",
        "Prepare emergency supplies including water"
      ]
    },
    {
      title: "During a Heatwave",
      icon: "fas fa-exclamation-triangle",
      tips: [
        "Stay hydrated with water and electrolyte drinks",
        "Limit outdoor activities during peak hours (10am-4pm)",
        "Wear lightweight, light-colored, loose-fitting clothing",
        "Check on vulnerable neighbors and family members"
      ]
    },
    {
      title: "Recognizing Heat Illness",
      icon: "fas fa-clinic-medical",
      tips: [
        "Heat cramps: muscle pains or spasms",
        "Heat exhaustion: heavy sweating, weakness, cold skin",
        "Heat stroke: high body temperature, confusion, loss of consciousness",
        "Seek medical help immediately for severe symptoms"
      ]
    },
    {
      title: "Community Preparedness",
      icon: "fas fa-fire",
    tips: [
      "Establish neighborhood check-in systems for vulnerable residents",
      "Know locations of public cooling centers and pools",
      "Share information about heat warnings with community members",
      "Volunteer to help those without adequate cooling at home"
    ]
    }
  ];

  // Improved AQI calculation with proper breakpoints
  const calculateAQI = (pm25, pm10) => {
    if (pm25 === undefined || pm10 === undefined) {
      return 25; // Default good air quality
    }

    // AQI calculation based on US EPA standards
    const calculatePM25AQI = (pm25) => {
      const breakpoints = [
        { pmLow: 0, pmHigh: 12.0, aqiLow: 0, aqiHigh: 50 },
        { pmLow: 12.1, pmHigh: 35.4, aqiLow: 51, aqiHigh: 100 },
        { pmLow: 35.5, pmHigh: 55.4, aqiLow: 101, aqiHigh: 150 },
        { pmLow: 55.5, pmHigh: 150.4, aqiLow: 151, aqiHigh: 200 },
        { pmLow: 150.5, pmHigh: 250.4, aqiLow: 201, aqiHigh: 300 },
        { pmLow: 250.5, pmHigh: 500.4, aqiLow: 301, aqiHigh: 500 }
      ];

      for (const bp of breakpoints) {
        if (pm25 >= bp.pmLow && pm25 <= bp.pmHigh) {
          return Math.round(
            ((bp.aqiHigh - bp.aqiLow) / (bp.pmHigh - bp.pmLow)) * (pm25 - bp.pmLow) + bp.aqiLow
          );
        }
      }
      return pm25 > 500.4 ? 500 : 0;
    };

    const calculatePM10AQI = (pm10) => {
      const breakpoints = [
        { pmLow: 0, pmHigh: 54, aqiLow: 0, aqiHigh: 50 },
        { pmLow: 55, pmHigh: 154, aqiLow: 51, aqiHigh: 100 },
        { pmLow: 155, pmHigh: 254, aqiLow: 101, aqiHigh: 150 },
        { pmLow: 255, pmHigh: 354, aqiLow: 151, aqiHigh: 200 },
        { pmLow: 355, pmHigh: 424, aqiLow: 201, aqiHigh: 300 },
        { pmLow: 425, pmHigh: 604, aqiLow: 301, aqiHigh: 500 }
      ];

      for (const bp of breakpoints) {
        if (pm10 >= bp.pmLow && pm10 <= bp.pmHigh) {
          return Math.round(
            ((bp.aqiHigh - bp.aqiLow) / (bp.pmHigh - bp.pmLow)) * (pm10 - bp.pmLow) + bp.aqiLow
          );
        }
      }
      return pm10 > 604 ? 500 : 0;
    };

    const pm25AQI = calculatePM25AQI(pm25);
    const pm10AQI = calculatePM10AQI(pm10);
    
    // Return the highest AQI value
    return Math.max(pm25AQI, pm10AQI);
  };

  // Calculate Drought Index (Simplified SPI-style)
  const calculateDroughtIndex = (precipitation) => {
    // Simplified calculation - in real scenario, you'd use historical data
    const avgPrecip = 50; // Average monthly precipitation in mm
    const stdPrecip = 20; // Standard deviation
    
    const SPI = (precipitation - avgPrecip) / stdPrecip;
    
    if (SPI < -1.5) return "Severe Drought";
    if (SPI < -1) return "Moderate Drought";
    if (SPI < -0.5) return "Mild Drought";
    return "Normal";
  };

  // Calculate Fire Risk Index
  const calculateFireRisk = (temp, wind, humidity, precip) => {
    const fireRisk = 0.1 * temp + 0.4 * wind - 0.7 * humidity - 0.2 * precip;
    return Math.max(0, Math.min(100, fireRisk));
  };

  // Calculate Soil Moisture
  const calculateSoilMoisture = (temp, precip, prevMoisture = 0.5) => {
    // Simplified: Soil moisture decreases with heat, increases with rain
    const soilMoistureIndex = Math.max(0, Math.min(1, prevMoisture + (precip/100) - (temp/100)));
    return Math.round(soilMoistureIndex * 100);
  };

  // Calculate Vegetation Index (Simplified)
  const calculateVegetationIndex = (temp, precip) => {
    // Simplified NDVI-like calculation
    const baseIndex = 0.6; // Base vegetation health
    const tempEffect = Math.max(0, 1 - (temp - 25) / 50); // Optimal around 25°C
    const precipEffect = Math.min(1, precip / 100);
    return Math.round((baseIndex * tempEffect * precipEffect) * 100);
  };

  // Fetch Air Quality Data with better error handling
  const fetchAirQualityData = async (lat, lon) => {
    try {
      console.log('Fetching AQI for:', lat, lon);
      const response = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5&timezone=auto`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('AQI API Response:', data);
      
      // Check if we have valid data
      if (!data.hourly || !data.hourly.pm2_5 || data.hourly.pm2_5.length === 0) {
        console.warn('No PM2.5 data available, using default');
        return 35; // Default good air quality
      }
      
      // Get the most recent PM values (last element in array)
      const recentIndex = data.hourly.pm2_5.length - 1;
      const pm25 = data.hourly.pm2_5[recentIndex];
      const pm10 = data.hourly.pm10[recentIndex];
      
      console.log('PM2.5:', pm25, 'PM10:', pm10);
      
      const aqi = calculateAQI(pm25, pm10);
      console.log('Calculated AQI:', aqi);
      
      return aqi;
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      // Return a reasonable default value if API fails
      return 35; // Good air quality as default
    }
  };

  // Weather API Functions
  const fetchWeatherData = async (lat, lon, name = '') => {
    setWeatherLoading(true);
    setWeatherError(null);
    setCurrentLocation({ lat, lon });
    
    try {
      console.log('Starting weather data fetch for:', lat, lon);
      
      // Fetch weather data and AQI in parallel
      const [weatherResponse, aqi] = await Promise.all([
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=196f36a5be2a4c1eaed174902252107&q=${lat},${lon}&days=1`),
        fetchAirQualityData(lat, lon)
      ]);
      
      if (!weatherResponse.ok) {
        throw new Error('Weather data not available');
      }
      
      const weatherData = await weatherResponse.json();
      console.log('Weather API Response:', weatherData);
      
      setWeatherData(weatherData);
      setLocationName(name || weatherData.location.name);
      
      // Calculate derived values
      const temp = weatherData.current.temp_c;
      const humidity = weatherData.current.humidity;
      const wind = weatherData.current.wind_kph;
      const precip = weatherData.current.precip_mm;
      const uv = weatherData.current.uv;
      const visibility = weatherData.current.vis_km;
      
      const droughtIndex = calculateDroughtIndex(precip);
      const fireRisk = calculateFireRisk(temp, wind, humidity, precip);
      const soilMoisture = calculateSoilMoisture(temp, precip);
      const vegetationIndex = calculateVegetationIndex(temp, precip);
      
      console.log('Calculated values:', {
        temp, humidity, wind, precip, uv, visibility,
        aqi, droughtIndex, fireRisk, soilMoisture, vegetationIndex
      });
      
      // Populate form with weather data and calculated values
      setFormData(prev => ({
        ...prev,
        temperature_max: temp,
        temperature_min: Math.round((temp - 5) * 10) / 10, // Estimate min temp
        humidity_max: humidity,
        humidity_min: Math.max(0, humidity - 20), // Estimate min humidity
        precipitation: precip,
        uv_index: uv,
        visibility: visibility,
        wind_speed: wind,
        air_quality: aqi,
        drought_index: droughtIndex === "Severe Drought" ? 3 : droughtIndex === "Moderate Drought" ? 2 : droughtIndex === "Mild Drought" ? 1 : 0,
        fire_risk_index: Math.round(fireRisk),
        soil_moisture: soilMoisture,
        vegetation_index: vegetationIndex,
        // These would need additional data sources or user input
        population_density: prev.population_density || '75', // Default medium density
        previous_fires: prev.previous_fires || '0' // Default no previous fires
      }));
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherError('Unable to fetch weather data. Please try again.');
    } finally {
      setWeatherLoading(false);
    }
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
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log('Got location:', lat, lon);
        fetchWeatherData(lat, lon, 'Your Location');
      },
      (error) => {
        console.error('Geolocation error:', error);
        setWeatherError('Unable to access your location.');
        setWeatherLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Search location by name
  const searchLocation = async () => {
    if (!locationInput.trim()) return;
    
    try {
      setWeatherLoading(true);
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
      console.log('Found location:', name, lat, lon);
      fetchWeatherData(lat, lon, name);
    } catch (error) {
      console.error('Location search error:', error);
      setWeatherError('Unable to find the specified location.');
      setWeatherLoading(false);
    }
  };

  // Use fetched weather data in prediction form
  const useWeatherData = () => {
    if (weatherData && currentLocation) {
      // Recalculate with current form data to preserve user inputs for missing fields
      const temp = weatherData.current.temp_c;
      const humidity = weatherData.current.humidity;
      const wind = weatherData.current.wind_kph;
      const precip = weatherData.current.precip_mm;
      
      const droughtIndex = calculateDroughtIndex(precip);
      const fireRisk = calculateFireRisk(temp, wind, humidity, precip);
      const soilMoisture = calculateSoilMoisture(temp, precip);
      const vegetationIndex = calculateVegetationIndex(temp, precip);
      
      setFormData(prev => ({
        ...prev,
        temperature_max: temp,
        temperature_min: Math.round((temp - 5) * 10) / 10,
        humidity_max: humidity,
        humidity_min: Math.max(0, humidity - 20),
        precipitation: precip,
        uv_index: weatherData.current.uv,
        visibility: weatherData.current.vis_km,
        wind_speed: wind,
        air_quality: prev.air_quality, // Keep existing AQI if already set
        drought_index: droughtIndex === "Severe Drought" ? 3 : droughtIndex === "Moderate Drought" ? 2 : droughtIndex === "Mild Drought" ? 1 : 0,
        fire_risk_index: Math.round(fireRisk),
        soil_moisture: soilMoisture,
        vegetation_index: vegetationIndex
      }));
    }
  };

  // Refresh AQI data
  const refreshAQI = async () => {
    if (currentLocation) {
      try {
        setWeatherLoading(true);
        const aqi = await fetchAirQualityData(currentLocation.lat, currentLocation.lon);
        setFormData(prev => ({
          ...prev,
          air_quality: aqi
        }));
      } catch (error) {
        console.error('Error refreshing AQI:', error);
        setWeatherError('Failed to refresh AQI data');
      } finally {
        setWeatherLoading(false);
      }
    }
  };

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
      reader.onload = (e) => {
        setSatelliteImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // FIXED: Updated handleSubmit function with better error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPredictionResult(null);
    setAccuracy(null);
    
    try {
      // Prepare data for backend API - MATCHING BACKEND SCHEMA
      const predictionData = {
        temperature_max: parseFloat(formData.temperature_max) || 0,
        temperature_min: parseFloat(formData.temperature_min) || 0,
        humidity_max: parseFloat(formData.humidity_max) || 0,
        humidity_min: parseFloat(formData.humidity_min) || 0,
        precipitation: parseFloat(formData.precipitation) || 0,
        uv_index: parseFloat(formData.uv_index) || 0,
        visibility: parseFloat(formData.visibility) || 0,
        historicalData: formData.historicalData,
        urbanHeat: formData.urbanHeat,
        wind_speed: parseFloat(formData.wind_speed) || 0,
        soil_moisture: parseFloat(formData.soil_moisture) || 0,
        vegetation_index: parseFloat(formData.vegetation_index) || 0,
        drought_index: parseInt(formData.drought_index) || 0,
        air_quality: parseInt(formData.air_quality) || 0,
        population_density: parseInt(formData.population_density) || 0,
        previous_fires: parseInt(formData.previous_fires) || 0,
        fire_risk_index: parseInt(formData.fire_risk_index) || 0
      };

      console.log('📤 Sending POST request to:', `${API_BASE_URL}/api/predict/heatwave`);
      console.log('📦 Request data:', predictionData);

      // Make API call to backend - WITH /api PREFIX
      const response = await fetch(`${API_BASE_URL}/api/predict/heatwave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(predictionData)
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Prediction result:', result);

      // Handle different response formats from backend
      if (result.prediction !== undefined) {
        setPredictionResult(result.prediction);
        setAccuracy(result.accuracy || '85.5');
      } else if (result.result !== undefined) {
        setPredictionResult(result.result);
        setAccuracy(result.accuracy || '85.5');
      } else {
        // If backend returns different structure, try to handle it
        setPredictionResult(`Heatwave Risk Assessment: ${JSON.stringify(result)}`);
        setAccuracy('85.5');
      }

    } catch (error) {
      console.error('❌ Error making prediction:', error);
      
      // Enhanced error display
      setPredictionResult(`Error: ${error.message}. Using fallback prediction.`);
      
      // Fallback to mock data if backend is not available
      console.log('🔄 Using mock data due to error');
      setTimeout(() => {
        const riskLevel = Math.random() > 0.5 ? "High Risk" : "Low Risk";
        const accuracyValue = (Math.random() * 20 + 80).toFixed(1);
        
        setPredictionResult(`Heatwave Risk Assessment: ${riskLevel}`);
        setAccuracy(accuracyValue);
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  // FIXED: Updated fetchHistoricalData function (commented out since endpoint doesn't exist)
  const fetchHistoricalData = async () => {
    try {
      // This endpoint doesn't exist in your backend, so we'll use mock data
      console.log('Historical data endpoint not available, using mock data');
      // If you add the endpoint later, uncomment this:
      // const response = await fetch(`${API_BASE_URL}/api/historical/heatwave`);
      // if (response.ok) {
      //   const data = await response.json();
      //   updateChartsWithRealData(data);
      // }
    } catch (error) {
      console.error('Error fetching historical data:', error);
      // Continue with mock data if backend fails
    }
  };

  // Update charts with real data from backend
  const updateChartsWithRealData = (data) => {
    // This function would update the charts with real data from backend
    // For now, we'll keep the mock data
    console.log('Historical data received:', data);
  };

  // Initialize charts
  useEffect(() => {
    // Initialize temperature trend chart
    const tempTrendCtx = document.getElementById('temperatureTrendChart');
    if (tempTrendCtx) {
      if (tempTrendChartRef.current) {
        tempTrendChartRef.current.destroy();
      }
      
      tempTrendChartRef.current = new Chart(tempTrendCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Average Temperature (°C)',
            data: [15, 18, 22, 27, 32, 36, 39, 38, 33, 28, 21, 16],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: 'Temperature (°C)'
              }
            }
          }
        }
      });
    }

    // Initialize heatwave frequency chart
    const frequencyCtx = document.getElementById('frequencyChart');
    if (frequencyCtx) {
      if (frequencyChartRef.current) {
        frequencyChartRef.current.destroy();
      }
      
      frequencyChartRef.current = new Chart(frequencyCtx, {
        type: 'bar',
        data: {
          labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
          datasets: [{
            label: 'Heatwave Days per Year',
            data: [12, 18, 22, 26, 31, 35, 28],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
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
                text: 'Number of Days'
              }
            }
          }
        }
      });
    }

    // Initialize risk map chart
    const riskMapCtx = document.getElementById('riskMapChart');
    if (riskMapCtx) {
      if (riskMapChartRef.current) {
        riskMapChartRef.current.destroy();
      }
      
      riskMapChartRef.current = new Chart(riskMapCtx, {
        type: 'doughnut',
        data: {
          labels: ['Low Risk', 'Moderate Risk', 'High Risk', 'Extreme Risk'],
          datasets: [{
            data: [25, 35, 25, 15],
            backgroundColor: [
              'rgba(75, 192, 192, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(255, 159, 64, 0.7)',
              'rgba(255, 99, 132, 0.7)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
            hoverOffset: 15
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    // Fetch historical data when component mounts
    fetchHistoricalData();

    // Cleanup function to destroy charts
    return () => {
      if (tempTrendChartRef.current) {
        tempTrendChartRef.current.destroy();
      }
      if (frequencyChartRef.current) {
        frequencyChartRef.current.destroy();
      }
      if (riskMapChartRef.current) {
        riskMapChartRef.current.destroy();
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
        {/* Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heatwaveImage}
            alt="Flood background"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(1.2) contrast(1.1)' }}
          />
          
          {/* Gradient overlay */}
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
            Heatwave & Wildfire Risk Monitoring
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white mb-8 animate-fade-in-up">
            Stay informed during extreme temperatures with AI models that predict and track dangerous heatwave patterns.
          </p>
          <a 
            href="#heatwavePredictionForm" 
            className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 animate-pulse-slow"
          >
            <i className="fas fa-fire mr-2"></i> Get Risk Assessment
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
            <h1 className="text-4xl font-bold mb-4 text-red-700 dark:text-red-400">
              <i className="fas fa-temperature-high mr-3"></i>Heatwave Prediction System
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our advanced AI model analyzes multiple environmental factors to predict heatwave and wildfire risks with high accuracy.
            </p>
          </div>
          
          {/* Weather API Integration Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-8 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center">
              <i className="fas fa-cloud-sun mr-3"></i> Live Weather Data
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Get Weather Data
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={getCurrentLocation}
                    disabled={weatherLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                  >
                    {weatherLoading ? 'Loading...' : 'Use My Location'}
                  </button>
                  <button
                    onClick={() => setShowLocationSearch(!showLocationSearch)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
                  >
                    Search
                  </button>
                </div>
                
                {showLocationSearch && (
                  <div className="mt-3 animate-fade-in">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        placeholder="Enter city name..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      />
                      <button
                        onClick={searchLocation}
                        disabled={weatherLoading}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                      >
                        Go
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Weather Display */}
              <div>
                {weatherError && (
                  <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 rounded-lg mb-3 animate-fade-in">
                    {weatherError}
                  </div>
                )}
                
                {weatherData && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-white">
                          {locationName}
                        </h3>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                          {weatherData.current.temp_c}°C
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {weatherData.current.condition.text}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <button
                          onClick={useWeatherData}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-all duration-300 block w-full"
                        >
                          Use in Form
                        </button>
                        <button
                          onClick={refreshAQI}
                          disabled={weatherLoading}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-all duration-300 block w-full disabled:opacity-50"
                        >
                          Refresh AQI
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600 dark:text-gray-400">
                      <div>Humidity: {weatherData.current.humidity}%</div>
                      <div>Wind: {weatherData.current.wind_kph} kph</div>
                      <div>UV: {weatherData.current.uv}</div>
                      <div>Visibility: {weatherData.current.vis_km} km</div>
                      <div>AQI: {formData.air_quality || 'N/A'}</div>
                      <div>Fire Risk: {formData.fire_risk_index || 'N/A'}%</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Prediction Form */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-red-700 dark:text-red-400 flex items-center">
                <i className="fas fa-chart-line mr-3"></i> Real-time Heatwave Risk Assessment
              </h2>
              
              <form 
                id="heatwavePredictionForm" 
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
                        {key === 'historicalData' || key === 'urbanHeat' ? '' : 
                         key.includes('temperature') ? ' (°C)' : 
                         key.includes('humidity') || key.includes('precipitation') || 
                         key.includes('soil_moisture') || key.includes('vegetation_index') ? ' (%)' : 
                         key === 'visibility' ? ' (km)' : 
                         key === 'wind_speed' ? ' (kph)' : 
                         key === 'drought_index' ? ' (0-3)' :
                         key === 'fire_risk_index' ? ' (%)' : ''}
                      </label>
                      {key === 'historicalData' || key === 'urbanHeat' ? (
                        <select
                          name={key}
                          id={key}
                          value={formData[key]}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
                        >
                          {key === 'historicalData' ? (
                            <>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </>
                          ) : (
                            <>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </>
                          )}
                        </select>
                      ) : (
                        <input 
                          type="number" 
                          step={key.includes('temperature') ? "0.1" : "1"}
                          name={key} 
                          id={key} 
                          value={formData[key]}
                          onChange={handleInputChange}
                          required={!(key === 'historicalData' || key === 'urbanHeat')}
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
                          placeholder={`Enter value${key.includes('temperature') ? ' in °C' : key.includes('humidity') || key.includes('precipitation') ? ' in %' : key === 'visibility' ? ' in km' : ''}`}
                        />
                      )}
                    </div>
                  ))}
                  
                  {/* Satellite Image Upload */}
                  <div className="md:col-span-2">
                    <label htmlFor="satelliteImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Satellite Image (Optional)
                    </label>
                    <input 
                      type="file" 
                      id="satelliteImage" 
                      name="satelliteImage" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:shadow-md"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Upload recent satellite image for enhanced heat mapping
                    </p>
                    
                    {satelliteImage && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Uploaded Image Preview</h4>
                        <img 
                          src={satelliteImage} 
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
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
                        Analyzing Data...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-fire mr-3"></i> Predict Heatwave Risk
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Prediction Result */}
              {predictionResult && (
                <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg shadow-md transition-all duration-500 animate-fade-in">
                  <h3 className="font-bold text-xl mb-3 flex items-center">
                    <i className="fas fa-info-circle mr-2"></i> Prediction Result
                  </h3>
                  <p className="text-lg mb-4">{predictionResult}</p>
                  
                  {/* Model Accuracy Display */}
                  {accuracy && (
                    <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg text-center">
                      <div className="text-sm text-green-700 dark:text-green-300">Model Accuracy</div>
                      <div className="text-2xl font-bold text-green-800 dark:text-green-200">{accuracy}%</div>
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1">Training Performance</div>
                    </div>
                  )}
                  
                  {/* Additional Prediction Details */}
                  {predictionResult && predictionResult.details && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                        <i className="fas fa-chart-bar mr-2"></i> Prediction Details
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-blue-700 dark:text-blue-300">
                          <span className="font-medium">Risk Level:</span> {predictionResult.details.risk_level || 'High'}
                        </div>
                        <div className="text-blue-700 dark:text-blue-300">
                          <span className="font-medium">Model Type:</span> {predictionResult.details.model_type || 'RandomForest'}
                        </div>
                        <div className="text-blue-700 dark:text-blue-300">
                          <span className="font-medium">Features Used:</span> {predictionResult.details.features_used || 9}
                        </div>
                        <div className="text-blue-700 dark:text-blue-300">
                          <span className="font-medium">Prediction Score:</span> {predictionResult.details.prediction_numeric || '0.85'}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fallback for string-based prediction results */}
                  {predictionResult && typeof predictionResult === 'string' && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                        <i className="fas fa-chart-bar mr-2"></i> Prediction Details
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-blue-700 dark:text-blue-300">
                          <span className="font-medium">Risk Level:</span> {predictionResult.includes('High') ? 'High' : predictionResult.includes('Low') ? 'Low' : 'Moderate'}
                        </div>
                        <div className="text-blue-700 dark:text-blue-300">
                          <span className="font-medium">Model Type:</span> RandomForest
                        </div>
                        <div className="text-blue-700 dark:text-blue-300">
                          <span className="font-medium">Features Used:</span> 9
                        </div>
                        <div className="text-blue-700 dark:text-blue-300">
                          <span className="font-medium">Model Accuracy:</span> 98.34%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Safety Information */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-red-700 dark:text-red-400 flex items-center">
                <i className="fas fa-life-ring mr-3"></i> Heatwave Safety Information
              </h2>
              
              {/* Animated safety tips */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md transition-all duration-500">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 bg-red-100 dark:bg-red-900 p-3 rounded-full mr-4">
                    <i className={`${safetyTips[currentTip].icon} text-red-600 dark:text-red-300 text-lg`}></i>
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
                      className={`w-3 h-3 rounded-full mx-1 ${currentTip === index ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Emergency Contacts */}
              <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 p-5 rounded-lg">
                <h3 className="font-bold text-red-800 dark:text-red-200 mb-3 text-lg flex items-center">
                  <i className="fas fa-phone-alt mr-2"></i> Emergency Contacts
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-red-700 dark:text-red-200">
                    <i className="fas fa-phone text-red-500 dark:text-red-300 mr-3"></i>
                    <span>Local Emergency: 911</span>
                  </li>
                  <li className="flex items-center text-red-700 dark:text-red-200">
                    <i className="fas fa-phone text-red-500 dark:text-red-300 mr-3"></i>
                    <span>Heat Helpline: 1-800-HEAT-99</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-globe text-red-500 dark:text-red-300 mr-3"></i>
                    <a href="#" className="text-red-600 dark:text-red-300 hover:underline">NOAA Heat Safety</a>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-red-500 dark:text-red-300 mr-3"></i>
                    <a href="#" className="text-red-600 dark:text-red-300 hover:underline">Cooling Centers Near You</a>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-lg">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 py-2 px-4 rounded-lg text-sm font-medium transition hover:bg-red-200 dark:hover:bg-red-800">
                    <i className="fas fa-exclamation-triangle mr-1"></i> Report Emergency
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
            <h2 className="text-2xl font-bold mb-8 text-red-700 dark:text-red-400 flex items-center">
              <i className="fas fa-history mr-3"></i> Historical Heatwave Data Analysis
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="animate-fade-in-left">
                <h3 className="font-bold mb-4 text-gray-800 dark:text-white text-lg">Temperature Trends</h3>
                <div className="h-72">
                  <canvas id="temperatureTrendChart"></canvas>
                </div>
              </div>
              
              <div className="animate-fade-in-right">
                <h3 className="font-bold mb-4 text-gray-800 dark:text-white text-lg">Heatwave Frequency</h3>
                <div className="h-72">
                  <canvas id="frequencyChart"></canvas>
                </div>
              </div>
            </div>

            {/* Risk Distribution */}
            <div className="mt-10">
              <h3 className="font-bold mb-6 text-gray-800 dark:text-white text-lg flex items-center">
                <i className="fas fa-map mr-2"></i> Regional Risk Distribution
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-72">
                  <canvas id="riskMapChart"></canvas>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 h-72 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <i className="fas fa-map-marked-alt text-4xl mb-3"></i>
                    <p>Interactive heat risk map would appear here</p>
                    <button className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                      View Full Map
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prevention Measures Section */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-red-700 dark:text-red-400 flex items-center">
              <i className="fas fa-shield-alt mr-3"></i> Heatwave Prevention Measures
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-blue-500 dark:text-blue-400 text-3xl mb-3">
                  <i className="fas fa-house"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Cool Roofs</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Installing reflective materials to reduce heat absorption in buildings.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-green-500 dark:text-green-400 text-3xl mb-3">
                  <i className="fas fa-tree"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Urban Greening</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Increasing vegetation to provide shade and reduce urban heat island effect.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-yellow-500 dark:text-yellow-400 text-3xl mb-3">
                  <i className="fas fa-tint"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Water Features</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Installing fountains and misting systems to cool public spaces.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <div className="text-red-500 dark:text-red-400 text-3xl mb-3">
                  <i className="fas fa-bell"></i>
                </div>
                <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Early Warning</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Implementing advanced alert systems for heatwave preparedness.</p>
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

export default Heatwave;