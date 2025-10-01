// src/pages/Alerts.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';

const Alerts = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    severity: { critical: 2, warning: 3, advisory: 2, info: 1 },
    types: { earthquake: 1, wildfire: 1, flood: 1, cyclone: 1, heatwave: 1, thunderstorm: 1 }
  });
  
  const alertsRef = useRef(null);
  const mapRef = useRef(null);
  const statsRef = useRef(null);
  
  const alertsInView = useInView(alertsRef, { margin: "-20%" });
  const statsInView = useInView(statsRef, { margin: "-20%" });

  // Simulate loading alerts data
  useEffect(() => {
    const loadAlerts = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockAlerts = [
          {
            id: 1,
            type: 'wildfire',
            risk: 'CRITICAL',
            title: 'Wildfire Emergency - Evacuation Order',
            description: 'Northern California region showing extreme fire risk due to drought conditions and high winds. Evacuation orders issued for zones 4B, 5C, and 6A.',
            time: '12 minutes ago',
            icon: 'fas fa-fire',
            borderColor: 'border-red-500',
            location: 'California, USA',
            coordinates: { lat: 38.575764, lng: -121.478851 },
            severity: 9.2,
            affectedAreas: ['Shasta County', 'Trinity County', 'Tehama County'],
            estimatedImpact: '15,000 acres at risk, 2,000 properties threatened',
            actions: ['Evacuate immediately', 'Follow emergency routes', 'Stay tuned to local news']
          },
          {
            id: 2,
            type: 'flood',
            risk: 'HIGH',
            title: 'Flood Warning - Mississippi River Basin',
            description: 'Mississippi River basin expected to reach flood stage within 36 hours. Heavy rainfall upstream causing rapid water level rise.',
            time: '45 minutes ago',
            icon: 'fas fa-water',
            borderColor: 'border-orange-500',
            location: 'Mississippi Basin',
            coordinates: { lat: 38.624691, lng: -90.184776 },
            severity: 7.8,
            affectedAreas: ['St. Louis Metro', 'Southern Illinois', 'Eastern Missouri'],
            estimatedImpact: 'Low-lying areas expected to be inundated, road closures likely',
            actions: ['Move to higher ground', 'Avoid flood waters', 'Prepare evacuation kit']
          },
          {
            id: 3,
            type: 'heatwave',
            risk: 'MODERATE',
            title: 'Heatwave Advisory - Southwest US',
            description: 'Southwest US facing extreme heatwave with temperatures exceeding 115°F. Heat index values may reach 125°F in some areas.',
            time: '2 hours ago',
            icon: 'fas fa-temperature-high',
            borderColor: 'border-yellow-500',
            location: 'Southwest USA',
            coordinates: { lat: 33.448376, lng: -112.074036 },
            severity: 6.5,
            affectedAreas: ['Arizona', 'Southern Nevada', 'Southeastern California'],
            estimatedImpact: 'Increased risk of heat-related illnesses, power demand surge expected',
            actions: ['Stay hydrated', 'Limit outdoor activities', 'Check on vulnerable neighbors']
          },
          {
            id: 4,
            type: 'earthquake',
            risk: 'HIGH',
            title: 'Earthquake Aftershock Warning - Southern California',
            description: 'Potential for significant aftershocks following the 5.7 magnitude earthquake. Aftershocks of 4.0+ magnitude possible in next 48 hours.',
            time: '3 hours ago',
            icon: 'fas fa-mountain',
            borderColor: 'border-orange-500',
            location: 'Southern California',
            coordinates: { lat: 34.052235, lng: -118.243683 },
            severity: 7.2,
            affectedAreas: ['Los Angeles County', 'Ventura County', 'Orange County'],
            estimatedImpact: 'Potential structural damage to weakened buildings',
            actions: ['Stay away from damaged structures', 'Prepare for aftershocks', 'Secure heavy items']
          },
          {
            id: 5,
            type: 'cyclone',
            risk: 'ELEVATED',
            title: 'Cyclone Formation Alert - Caribbean Sea',
            description: 'Tropical disturbance developing in eastern Caribbean with 60% chance of cyclone formation in next 48 hours.',
            time: '5 hours ago',
            icon: 'fas fa-wind',
            borderColor: 'border-blue-500',
            location: 'Caribbean Sea',
            coordinates: { lat: 18.735693, lng: -64.750504 },
            severity: 5.8,
            affectedAreas: ['Eastern Caribbean Islands', 'Puerto Rico', 'Hispaniola'],
            estimatedImpact: 'Heavy rainfall, strong winds, and rough seas expected',
            actions: ['Monitor storm development', 'Review evacuation plans', 'Secure outdoor objects']
          },
          {
            id: 6,
            type: 'thunderstorm',
            risk: 'MODERATE',
            title: 'Severe Thunderstorm Watch - Midwest',
            description: 'Strong line of thunderstorms expected to develop across the Midwest with potential for damaging winds and large hail.',
            time: '6 hours ago',
            icon: 'fas fa-bolt',
            borderColor: 'border-purple-500',
            location: 'Midwest USA',
            coordinates: { lat: 41.878876, lng: -87.635918 },
            severity: 5.2,
            affectedAreas: ['Northern Illinois', 'Southern Wisconsin', 'Northwestern Indiana'],
            estimatedImpact: 'Possible power outages, tree damage, and localized flooding',
            actions: ['Stay indoors', 'Avoid windows', 'Unplug electronic devices']
          }
        ];
        setAlerts(mockAlerts);
        setIsLoading(false);
      }, 1500);
    };

    loadAlerts();
  }, []);

  const filteredAlerts = activeFilter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === activeFilter);

  const riskLevels = {
    CRITICAL: { color: 'red', text: 'text-red-700', bg: 'bg-red-100' },
    HIGH: { color: 'orange', text: 'text-orange-700', bg: 'bg-orange-100' },
    MODERATE: { color: 'yellow', text: 'text-yellow-700', bg: 'bg-yellow-100' },
    ELEVATED: { color: 'blue', text: 'text-blue-700', bg: 'bg-blue-100' }
  };

  const AlertCard = ({ alert, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-l-4 ${alert.borderColor} cursor-pointer`}
      onClick={() => setSelectedAlert(alert)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${riskLevels[alert.risk].bg} ${riskLevels[alert.risk].text}`}>
              {alert.risk}
            </span>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{alert.title}</h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <i className="fas fa-map-marker-alt mr-2"></i>
              {alert.location}
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            className={`text-3xl text-${riskLevels[alert.risk].color}-500`}
          >
            <i className={alert.icon}></i>
          </motion.div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {alert.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <i className="fas fa-clock mr-2"></i>
            {alert.time}
          </div>
          <div className="text-sm font-semibold">
            Severity: {alert.severity}/10
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
          <div 
            className={`h-2 rounded-full bg-${riskLevels[alert.risk].color}-500`}
            style={{ width: `${alert.severity * 10}%` }}
          ></div>
        </div>
        
        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
          <i className="fas fa-info-circle mr-2"></i>
          View Details
        </Button>
      </div>
    </motion.div>
  );

  const AlertDetailModal = () => (
    <AnimatePresence>
      {selectedAlert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAlert(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${riskLevels[selectedAlert.risk].bg} ${riskLevels[selectedAlert.risk].text}`}>
                    {selectedAlert.risk}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {selectedAlert.title}
                  </h2>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    {selectedAlert.location}
                    <span className="mx-3">•</span>
                    <i className="fas fa-clock mr-2"></i>
                    {selectedAlert.time}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAlert(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                    <i className="fas fa-info-circle mr-2 text-green-500"></i>
                    Alert Details
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {selectedAlert.description}
                  </p>

                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                    <i className="fas fa-map-marked-alt mr-2 text-blue-500"></i>
                    Affected Areas
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-300 mb-6">
                    {selectedAlert.affectedAreas.map((area, index) => (
                      <li key={index} className="flex items-center mb-2">
                        <i className="fas fa-circle text-xs mr-2 text-green-500"></i>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                    <i className="fas fa-chart-line mr-2 text-orange-500"></i>
                    Impact Assessment
                  </h3>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl mb-6">
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedAlert.estimatedImpact}
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                    <i className="fas fa-exclamation-triangle mr-2 text-red-500"></i>
                    Recommended Actions
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-300">
                    {selectedAlert.actions.map((action, index) => (
                      <li key={index} className="flex items-start mb-3">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Severity Scale</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 mb-2">
                  <div 
                    className={`h-4 rounded-full bg-${riskLevels[selectedAlert.risk].color}-500`}
                    style={{ width: `${selectedAlert.severity * 10}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                  <span>Critical</span>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedAlert(null)}
                  className="border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  Close
                </Button>
                <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  <i className="fas fa-share-alt mr-2"></i>
                  Share Alert
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const FilterButton = ({ type, icon, label }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setActiveFilter(type)}
      className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
        activeFilter === type
          ? 'bg-green-500 text-white shadow-lg'
          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg'
      }`}
    >
      <i className={icon}></i>
      <span>{label}</span>
    </motion.button>
  );

  // Stats Charts Component
  const StatsCharts = () => {
    const severityData = {
      labels: ['Critical', 'Warning', 'Advisory', 'Information'],
      datasets: [
        {
          data: [stats.severity.critical, stats.severity.warning, stats.severity.advisory, stats.severity.info],
          backgroundColor: ['#ef4444', '#f97316', '#eab308', '#3b82f6'],
          hoverBackgroundColor: ['#dc2626', '#ea580c', '#ca8a04', '#2563eb'],
          borderWidth: 0,
        }
      ]
    };

    const typeData = {
      labels: ['Earthquake', 'Wildfire', 'Flood', 'Cyclone', 'Heatwave', 'Thunderstorm'],
      datasets: [
        {
          data: [
            stats.types.earthquake,
            stats.types.wildfire,
            stats.types.flood,
            stats.types.cyclone,
            stats.types.heatwave,
            stats.types.thunderstorm
          ],
          backgroundColor: [
            '#8b5cf6', '#ef4444', '#3b82f6', '#06b6d4', '#f97316', '#eab308'
          ],
          hoverBackgroundColor: [
            '#7c3aed', '#dc2626', '#2563eb', '#0891b2', '#ea580c', '#ca8a04'
          ],
          borderWidth: 0,
        }
      ]
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Alert Severity</h3>
          <div className="h-64">
            {/* Doughnut Chart for Severity */}
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {Object.values(stats.severity).reduce((a, b) => a + b, 0)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total Alerts</div>
                </div>
              </div>
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {(() => {
                  const total = Object.values(stats.severity).reduce((a, b) => a + b, 0);
                  let accumulatedPercent = 0;
                  
                  return Object.values(stats.severity).map((value, index) => {
                    const percent = (value / total) * 100;
                    const dashArray = `${percent} ${100 - percent}`;
                    const dashOffset = -accumulatedPercent;
                    accumulatedPercent += percent;
                    
                    return (
                      <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={['#ef4444', '#f97316', '#eab308', '#3b82f6'][index]}
                        strokeWidth="10"
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        className="transition-all duration-1000 ease-out"
                        style={{ strokeDashoffset: dashOffset }}
                      />
                    );
                  });
                })()}
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {severityData.labels.map((label, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: severityData.datasets[0].backgroundColor[index] }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
                <span className="ml-auto text-sm font-medium text-gray-800 dark:text-white">
                  {stats.severity[label.toLowerCase()]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Alert Types</h3>
          <div className="h-64">
            {/* Doughnut Chart for Types */}
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {Object.values(stats.types).reduce((a, b) => a + b, 0)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total Types</div>
                </div>
              </div>
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {(() => {
                  const total = Object.values(stats.types).reduce((a, b) => a + b, 0);
                  let accumulatedPercent = 0;
                  
                  return Object.values(stats.types).map((value, index) => {
                    const percent = (value / total) * 100;
                    const dashArray = `${percent} ${100 - percent}`;
                    const dashOffset = -accumulatedPercent;
                    accumulatedPercent += percent;
                    
                    return (
                      <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={typeData.datasets[0].backgroundColor[index]}
                        strokeWidth="10"
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        className="transition-all duration-1000 ease-out"
                        style={{ strokeDashoffset: dashOffset }}
                      />
                    );
                  });
                })()}
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {typeData.labels.map((label, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: typeData.datasets[0].backgroundColor[index] }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
                <span className="ml-auto text-sm font-medium text-gray-800 dark:text-white">
                  {stats.types[label.toLowerCase()]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      {/* Header */}
      <div className="relative py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Emergency Alerts</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Real-time notifications for natural disasters and emergency situations
            </p>
          </motion.div>
        </div>
        
        {/* Animated waves background */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-16" viewBox="0 0 1200 150" preserveAspectRatio="none">
            <path d="M0,100 C150,200 350,0 500,100 C650,200 750,0 1000,100 C1150,200 1200,150 1200,150 L1200,200 L0,200 Z" className="fill-white dark:fill-gray-900"></path>
          </svg>
        </div>
      </div>

      {/* Critical Alert Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="container mx-auto px-4 -mt-10 relative z-20"
      >
        <div className="bg-red-600 text-white rounded-2xl p-6 mb-8 flex items-center justify-between alert-pulse shadow-xl">
          <div className="flex items-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl mr-4"
            >
              <i className="fas fa-circle-exclamation"></i>
            </motion.div>
            <div>
              <h2 className="font-bold text-xl">CRITICAL ALERT: Magnitude 6.2 Earthquake - Indonesia</h2>
              <p className="text-sm opacity-90 mt-1">Tsunami warning issued for coastal areas. Evacuate immediately.</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-red-600 px-6 py-2 rounded-full font-medium hover:bg-red-50 transition shadow-md"
          >
            View Details
          </motion.button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Filter Alerts</h2>
          <div className="flex flex-wrap gap-3">
            <FilterButton type="all" icon="fas fa-layer-group" label="All Alerts" />
            <FilterButton type="wildfire" icon="fas fa-fire" label="Wildfires" />
            <FilterButton type="flood" icon="fas fa-water" label="Floods" />
            <FilterButton type="earthquake" icon="fas fa-mountain" label="Earthquakes" />
            <FilterButton type="cyclone" icon="fas fa-wind" label="Cyclones" />
            <FilterButton type="thunderstorm" icon="fas fa-bolt" label="Thunderstorms" />
            <FilterButton type="heatwave" icon="fas fa-temperature-high" label="Heatwaves" />
          </div>
        </motion.div>
      </div>

      {/* Dashboard Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Alert Feed */}
          <div ref={alertsRef} className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={alertsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                  <i className="fas fa-bell mr-2 text-red-500"></i>Active Alerts
                  <span className="ml-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {alerts.length} Active
                  </span>
                </h2>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">LIVE ALERTS ACTIVE</span>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
                  ></motion.div>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
                  {filteredAlerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                      onClick={() => setSelectedAlert(alert)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-1">
                          <div className={`w-3 h-3 rounded-full bg-${riskLevels[alert.risk].color}-500 mt-1`}></div>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-bold text-${riskLevels[alert.risk].color}-600 dark:text-${riskLevels[alert.risk].color}-400`}>
                              {alert.risk}: {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                            </h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{alert.title}</p>
                          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <i className={`${alert.icon} mr-1 text-${riskLevels[alert.risk].color}-500`}></i>
                            <span>{alert.location}</span>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <button className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">Details</button>
                            <button className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Actions</button>
                            <button className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">Share</button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
                <button className="text-green-600 dark:text-green-400 hover:underline font-medium">
                  View All Alerts <i className="fas fa-arrow-right ml-1"></i>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Stats & Actions */}
          <div ref={statsRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-full"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  <i className="fas fa-chart-pie mr-2 text-green-600"></i>Alert Statistics
                </h2>
              </div>
              <div className="p-6">
                <StatsCharts />
                
                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h3>
                  <div className="space-y-3">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition shadow-md"
                    >
                      <span>Send Emergency Alert</span>
                      <i className="fas fa-bullhorn"></i>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition shadow-md"
                    >
                      <span>Activate Response Team</span>
                      <i className="fas fa-users-gear"></i>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition shadow-md"
                    >
                      <span>Share Safety Information</span>
                      <i className="fas fa-share-nodes"></i>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Alert Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              <i className="fas fa-map-marked-alt mr-2 text-green-600"></i>Alert Heatmap
            </h2>
          </div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
            {/* Placeholder for map - in a real app, you'd use a mapping library like Leaflet or Google Maps */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <i className="fas fa-map text-4xl mb-2"></i>
                <p>Interactive Alert Map</p>
                                <p className="text-sm mt-2">Visual representation of active alerts</p>
              </div>
            </div>
            
<div className="h-96 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" 
    alt="World map" 
    className="w-full h-full object-cover opacity-50"
  />
  
  {/* Simulated markers */}
  {alerts.map((alert, index) => {
    let markerColor;
    switch(alert.risk) {
      case 'CRITICAL': markerColor = 'bg-red-500'; break;
      case 'HIGH': markerColor = 'bg-orange-500'; break;
      case 'MODERATE': markerColor = 'bg-yellow-500'; break;
      case 'ELEVATED': markerColor = 'bg-blue-500'; break;
      default: markerColor = 'bg-gray-500';
    }
    
    // Convert lat/lng to position on placeholder map
    const left = 50 + (alert.coordinates.lng / 360 * 100);
    const top = 50 - (alert.coordinates.lat / 180 * 100);
    
    return (
      <motion.div
        key={alert.id}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 + (index * 0.1) }}
        className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer ${markerColor} ${
          alert.risk === 'CRITICAL' ? 'animate-pulse' : ''
        }`}
        style={{
          left: `${left}%`,
          top: `${top}%`,
          transform: 'translate(-50%, -50%)'
        }}
        onClick={() => setSelectedAlert(alert)}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <i className={`${alert.icon} text-xs text-white`}></i>
        </div>
      </motion.div>
    );
  })}
</div>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">Critical</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-sm">High</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm">Moderate</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Elevated</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alert Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Detailed Alert Overview
            <span className="ml-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {filteredAlerts.length} Alerts
            </span>
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 h-80 animate-pulse">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-6 w-1/2"></div>
                  <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAlerts.map((alert, index) => (
                <AlertCard key={alert.id} alert={alert} index={index} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Emergency Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Emergency Resources</h2>
            <p className="mb-6 opacity-90">Critical information and contacts for emergency situations</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-2xl mb-2">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <h3 className="font-semibold mb-2">Emergency Contacts</h3>
                <p className="text-sm opacity-80">Immediate assistance numbers</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-2xl mb-2">
                  <i className="fas fa-first-aid"></i>
                </div>
                <h3 className="font-semibold mb-2">Safety Procedures</h3>
                <p className="text-sm opacity-80">Emergency response guides</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-2xl mb-2">
                  <i className="fas fa-shelter"></i>
                </div>
                <h3 className="font-semibold mb-2">Evacuation Centers</h3>
                <p className="text-sm opacity-80">Nearest safe locations</p>
              </motion.div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-white text-red-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition shadow-md"
            >
              View All Resources <i className="fas fa-arrow-right ml-2"></i>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Alert Detail Modal */}
      <AlertDetailModal />

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40"
      >
        <i className="fas fa-bell text-xl"></i>
      </motion.button>
    </div>
  );
};

export default Alerts;