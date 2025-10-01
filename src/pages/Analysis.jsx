import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line, Doughnut, PolarArea, Radar } from 'react-chartjs-2';
import Button from '../components/Button';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analysis = () => {
  const [activeTab, setActiveTab] = useState('wildfires');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [stats, setStats] = useState({
    activeDisasters: 127,
    affectedPopulation: '2.8M',
    economicImpact: '$14.2B',
    responseTeams: 348
  });
  
  const dashboardRef = useRef(null);
  const statsRef = useRef(null);
  
  const dashboardInView = useInView(dashboardRef, { margin: "-20%" });
  const statsInView = useInView(statsRef, { margin: "-20%" });

  // Toggle dark/light mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Simulate loading data
  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    loadData();
  }, []);

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeElement = document.getElementById('current-time');
      if (timeElement) {
        timeElement.textContent = now.toLocaleString();
      }
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const disasterTypes = {
    wildfires: { icon: 'fas fa-fire', color: 'text-red-500', bgColor: 'bg-red-500' },
    floods: { icon: 'fas fa-water', color: 'text-blue-500', bgColor: 'bg-blue-500' },
    cyclones: { icon: 'fas fa-wind', color: 'text-cyan-500', bgColor: 'bg-cyan-500' },
    earthquakes: { icon: 'fas fa-mountain', color: 'text-orange-500', bgColor: 'bg-orange-500' },
    thunderstorm: { icon: 'fas fa-bolt', color: 'text-purple-500', bgColor: 'bg-purple-500' },
    heatwaves: { icon: 'fas fa-temperature-high', color: 'text-yellow-500', bgColor: 'bg-yellow-500' }
  };

  // Chart data and options
  const frequencyChartData = {
    labels: ['Wildfires', 'Floods', 'Cycloness', 'Earthquakes', 'Thunderstorm', 'Heatwaves'],
    datasets: [
      {
        label: 'Number of Incidents',
        data: [42, 38, 17, 29, 8, 31],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)'
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(59, 130, 246)',
          'rgb(6, 182, 212)',
          'rgb(249, 115, 22)',
          'rgb(139, 92, 246)',
          'rgb(245, 158, 11)'
        ],
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const economicImpactData = {
    labels: ['Wildfires', 'Floods', 'Cycloness', 'Earthquakes', 'Thunderstorm', 'Heatwaves'],
    datasets: [
      {
        label: 'Economic Impact (Billions $)',
        data: [14.5, 28.3, 41.7, 22.8, 3.5, 9.2],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)'
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(59, 130, 246)',
          'rgb(6, 182, 212)',
          'rgb(249, 115, 22)',
          'rgb(139, 92, 246)',
          'rgb(245, 158, 11)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const regionalDistributionData = {
    labels: ['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania'],
    datasets: [
      {
        label: 'Regional Distribution',
        data: [22, 18, 15, 31, 19, 7],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(30, 64, 175, 0.7)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const severityData = {
    labels: ['Wildfires', 'Floods', 'Cycloness', 'Earthquakes', 'Thunderstorm', 'Heatwaves'],
    datasets: [
      {
        label: 'Intensity',
        data: [85, 78, 92, 88, 95, 82],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgb(239, 68, 68)',
        pointBackgroundColor: 'rgb(239, 68, 68)',
      },
      {
        label: 'Impact Radius',
        data: [65, 90, 85, 75, 70, 88],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
      },
    ],
  };

  const historicalTrendData = {
    labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Wildfires',
        data: [28, 32, 36, 41, 45, 38, 42, 47, 51, 49, 42],
        borderColor: 'rgb(239, 68, 68)',
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Floods',
        data: [25, 28, 32, 30, 35, 38, 40, 42, 38, 41, 38],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Hurricanes',
        data: [12, 15, 14, 16, 18, 17, 15, 19, 16, 18, 17],
        borderColor: 'rgb(6, 182, 212)',
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const responseTimeData = {
    labels: ['Wildfires', 'Floods', 'Cycloness', 'Earthquakes', 'Thunderstorm', 'Heatwaves'],
    datasets: [
      {
        label: 'Average Response Time (hours)',
        data: [5.2, 8.7, 12.4, 6.8, 14.3, 3.5],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)'
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(59, 130, 246)',
          'rgb(6, 182, 212)',
          'rgb(249, 115, 22)',
          'rgb(139, 92, 246)',
          'rgb(245, 158, 11)'
        ],
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const seasonalData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Wildfires',
        data: [15, 18, 22, 28, 35, 42, 51, 49, 38, 30, 22, 17],
        borderColor: 'rgb(239, 68, 68)',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Floods',
        data: [32, 35, 40, 38, 35, 30, 28, 31, 36, 40, 38, 34],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Hurricanes',
        data: [5, 5, 7, 10, 15, 28, 35, 42, 30, 18, 10, 7],
        borderColor: 'rgb(6, 182, 212)',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  // Common chart options
  const chartOptions = (isDark) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      ...(isDark ? {
        y: {
          grid: {
            color: 'rgba(75, 85, 99, 0.3)',
          },
          ticks: {
            color: '#9ca3af',
          },
        },
        x: {
          grid: {
            color: 'rgba(75, 85, 99, 0.3)',
          },
          ticks: {
            color: '#9ca3af',
          },
        },
      } : {
        y: {
          grid: {
            color: 'rgba(209, 213, 219, 0.8)',
          },
          ticks: {
            color: '#6b7280',
          },
        },
        x: {
          grid: {
            color: 'rgba(209, 213, 219, 0.8)',
          },
          ticks: {
            color: '#6b7280',
          },
        },
      })
    },
  });

  const radarChartOptions = (isDark) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          font: {
            size: 12
          }
        }
      },
    },
    scales: {
      r: {
        angleLines: {
          color: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.8)',
        },
        grid: {
          color: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.8)',
        },
        pointLabels: {
          color: isDark ? '#9ca3af' : '#6b7280',
        },
        ticks: {
          backdropColor: 'transparent',
          color: isDark ? '#9ca3af' : '#6b7280',
        },
      },
    },
  });

  const polarAreaOptions = (isDark) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          font: {
            size: 11
          }
        }
      },
    },
  });

  const doughnutOptions = (isDark) => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          font: {
            size: 12
          }
        }
      },
    },
  });

  const StatCard = ({ label, value, icon, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 relative overflow-hidden shadow-lg"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
      <div className="relative z-10">
        <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">{label}</div>
        <div className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{value}</div>
        <div className="text-4xl opacity-20 absolute bottom-4 right-4 text-gray-600 dark:text-gray-300">
          <i className={icon}></i>
        </div>
      </div>
      <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-green-500 opacity-10"></div>
      <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-blue-500 opacity-10"></div>
    </motion.div>
  );

  const TabButton = ({ type, icon, label }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setActiveTab(type)}
      className={`px-5 py-3 rounded-full flex items-center gap-2 transition-all ${
        activeTab === type
          ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg'
      }`}
    >
      <i className={icon}></i>
      <span>{label}</span>
    </motion.button>
  );

  const ChartCard = ({ title, icon, children, className = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden ${className}`}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
          <i className={`${icon} mr-2 text-green-500`}></i>
          {title}
        </h3>
        <div className="text-gray-400 dark:text-gray-500 text-2xl">
          <i className={icon}></i>
        </div>
      </div>
      <div className="p-6 h-80">
        {children}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 pb-20">
      {/* Header */}
      <div className="relative py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                className="text-4xl mr-4 text-green-400"
              >
                <i className="fas fa-globe-americas"></i>
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Global Disaster Analysis
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Last updated: <span id="current-time" className="ml-1 font-medium">Loading...</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-12 h-6 bg-gray-700 rounded-full relative"
              >
                <motion.div
                  className={`w-5 h-5 rounded-full absolute top-0.5 ${isDarkMode ? 'bg-blue-500 right-0.5' : 'bg-yellow-400 left-0.5'}`}
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
                <span className="sr-only">Toggle dark mode</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Animated waves background */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-16" viewBox="0 0 1200 150" preserveAspectRatio="none">
            <path d="M0,100 C150,200 350,0 500,100 C650,200 750,0 1000,100 C1150,200 1200,150 1200,150 L1200,200 L0,200 Z" className="fill-gray-100 dark:fill-gray-900"></path>
          </svg>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 mb-8"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            
            <TabButton type="wildfires" icon="fas fa-fire" label="Wildfires" />
            <TabButton type="floods" icon="fas fa-water" label="Floods" />
            <TabButton type="hurricanes" icon="fas fa-wind" label="Hurricanes" />
            <TabButton type="earthquakes" icon="fas fa-mountain" label="Earthquakes" />
            <TabButton type="thunderstorm" icon="fas fa-bolt" label="Thunderstorm" />
            <TabButton type="heatwaves" icon="fas fa-temperature-high" label="Heatwaves" />
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div ref={statsRef} className="container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatCard 
            label="Active Disasters" 
            value={stats.activeDisasters} 
            icon="fas fa-exclamation-triangle" 
            index={0}
          />
          <StatCard 
            label="Affected Population" 
            value={stats.affectedPopulation} 
            icon="fas fa-users" 
            index={1}
          />
          <StatCard 
            label="Economic Impact" 
            value={stats.economicImpact} 
            icon="fas fa-dollar-sign" 
            index={2}
          />
          <StatCard 
            label="Response Teams" 
            value={stats.responseTeams} 
            icon="fas fa-helicopter" 
            index={3}
          />
        </motion.div>
      </div>

      {/* Dashboard Grid */}
      <div ref={dashboardRef} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={dashboardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          <ChartCard title="Disaster Frequency by Type (2023)" icon="fas fa-chart-bar">
            <Bar data={frequencyChartData} options={chartOptions(isDarkMode)} />
          </ChartCard>
          
          <ChartCard title="Economic Impact by Disaster Type" icon="fas fa-money-bill-wave">
            <Doughnut data={economicImpactData} options={doughnutOptions(isDarkMode)} />
          </ChartCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <ChartCard title="Regional Distribution" icon="fas fa-globe-americas">
            <PolarArea data={regionalDistributionData} options={polarAreaOptions(isDarkMode)} />
          </ChartCard>
          
          <ChartCard title="Severity Level Analysis" icon="fas fa-signal">
            <Radar data={severityData} options={radarChartOptions(isDarkMode)} />
          </ChartCard>
          
          <ChartCard title="Historical Trend (2013-2023)" icon="fas fa-chart-line">
            <Line data={historicalTrendData} options={chartOptions(isDarkMode)} />
          </ChartCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-8"
        >
            <ChartCard title="Global Disaster Map" icon="fas fa-map-marked-alt" className="mb-6">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <h4 className="text-gray-800 dark:text-white font-semibold mb-2">Live Disaster Tracking</h4>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Extreme</span>
                    </div>
                    <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">High</span>
                    </div>
                    <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Medium</span>
                    </div>
                    <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Low</span>
                    </div>
                </div>
                </div>
                
                {/* Interactive Map Container */}
                <div className="absolute inset-0 z-0" id="disaster-map">
                {/* Map will be rendered here by Leaflet */}
                </div>
                
                {/* Map Controls */}
                <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
                <button className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <i className="fas fa-plus"></i>
                </button>
                <button className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <i className="fas fa-minus"></i>
                </button>
                <button className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <i className="fas fa-location-arrow"></i>
                </button>
                </div>
                
                {/* Loading indicator */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 bg-opacity-80 z-20" id="map-loading">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mb-2"></div>
                    <p className="text-gray-700 dark:text-gray-300">Loading map data...</p>
                </div>
                </div>
            </div>
            </ChartCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          <ChartCard title="Response Time Analysis" icon="fas fa-clock">
            <Bar data={responseTimeData} options={chartOptions(isDarkMode)} />
          </ChartCard>
          
          <ChartCard title="Seasonal Patterns" icon="fas fa-calendar-alt">
            <Line data={seasonalData} options={chartOptions(isDarkMode)} />
          </ChartCard>
        </motion.div>

        {/* Data Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-xl overflow-hidden p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-6">Data Insights & Predictions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Key Findings</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-arrow-up mt-1 mr-3"></i>
                  <span>Wildfires have increased by 24% compared to last year</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-arrow-trend-down mt-1 mr-3"></i>
                  <span>Response times improved by 18% in coastal regions</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-exclamation-triangle mt-1 mr-3"></i>
                  <span>Asia-Pacific region shows highest disaster frequency</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Predictive Analysis</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-thermometer-full mt-1 mr-3"></i>
                  <span>High probability of heatwaves in Southern Europe next month</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-water mt-1 mr-3"></i>
                  <span>Flood risk elevated in Southeast Asia during monsoon season</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-wind mt-1 mr-3"></i>
                  <span>Hurricane activity expected to be above average this season</span>
                </li>
              </ul>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-white text-green-600 px-6 py-3 rounded-full font-medium shadow-md"
          >
            Download Full Report <i className="fas fa-download ml-2"></i>
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="container mx-auto px-4 mt-12 text-center text-gray-500 dark:text-gray-400"
      >
        <p>Global Disaster Analysis Dashboard • Real-time Monitoring and Predictive Analytics</p>
        <p className="mt-2">Data updated every 15 minutes • Powered by Advanced AI Forecasting Systems</p>
      </motion.footer>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full shadow-2xl flex items-center justify-center z-40"
      >
        <i className="fas fa-chart-line text-xl"></i>
      </motion.button>
    </div>
  );
};

export default Analysis;