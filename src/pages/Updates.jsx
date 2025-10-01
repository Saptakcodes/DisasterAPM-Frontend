// src/pages/Updates.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useTransform, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';

const Updates = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [stats, setStats] = useState({
    categories: { news: 12, advisory: 8, weather: 15, statistics: 5, tips: 10, community: 7 }
  });
  
  const updatesRef = useRef(null);
  const statsRef = useRef(null);
  
  const updatesInView = useInView(updatesRef, { margin: "-20%" });
  const statsInView = useInView(statsRef, { margin: "-20%" });

  // Simulate loading updates data
  useEffect(() => {
    const loadUpdates = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockUpdates = [
          {
            id: 1,
            type: 'news',
            category: 'Latest News',
            title: 'Hurricane Elena Downgraded to Category 3',
            description: 'Hurricane Elena has been downgraded to Category 3 as it moves northeast away from coastal areas. Residents can return home but should remain cautious of residual flooding.',
            content: 'The National Hurricane Center has downgraded Hurricane Elena to a Category 3 storm as it continues to move northeast, further away from populated coastal areas. While the immediate threat has diminished, residents returning home should exercise caution due to potential residual flooding, downed power lines, and damaged infrastructure. Emergency services are working to restore power and clear roads in affected areas. The storm is expected to continue weakening over the next 24 hours as it moves into cooler waters.',
            time: '15 minutes ago',
            icon: 'fas fa-newspaper',
            borderColor: 'border-blue-500',
            location: 'Gulf of Mexico',
            severity: 6.5,
            source: 'National Weather Service',
            attachments: ['storm-track.pdf', 'safety-guidelines.pdf'],
            relatedUpdates: [2, 3],
            tags: ['hurricane', 'weather', 'coastal']
          },
          {
            id: 2,
            type: 'advisory',
            category: 'Government Advisory',
            title: 'Evacuation Orders Lifted for Coastal Counties',
            description: 'Evacuation orders have been lifted for counties affected by Hurricane Elena. Check local guidelines before returning home.',
            content: 'Local authorities have lifted evacuation orders for all coastal counties previously affected by Hurricane Elena. Residents can now return to their homes, but are advised to exercise caution when traveling. Be aware that some areas may still have flooding, downed power lines, or debris on roads. If you encounter flooded roads, do not attempt to drive through them. Check with local authorities for specific information about your community before returning.',
            time: '45 minutes ago',
            icon: 'fas fa-building-shield',
            borderColor: 'border-purple-500',
            location: 'Florida, USA',
            severity: 4.2,
            source: 'Department of Emergency Management',
            attachments: ['return-guidelines.pdf'],
            relatedUpdates: [1, 5],
            tags: ['evacuation', 'safety', 'government']
          },
          {
            id: 3,
            type: 'weather',
            category: 'Weather Update',
            title: 'Flood Watch Issued for Northern Regions',
            description: 'Heavy rainfall expected to continue for next 24 hours. Flood watch issued for low-lying areas near river basins.',
            content: 'The National Weather Service has issued a flood watch for northern regions as heavy rainfall is expected to continue over the next 24 hours. River levels are rising rapidly, and low-lying areas near river basins are at risk of flooding. Residents in these areas should monitor water levels closely and be prepared to move to higher ground if necessary. Avoid driving through flooded areas and do not attempt to cross flowing water. Emergency services are on standby to assist if needed.',
            time: '2 hours ago',
            icon: 'fas fa-cloud-rain',
            borderColor: 'border-cyan-500',
            location: 'Mississippi River Basin',
            severity: 7.1,
            source: 'National Weather Service',
            attachments: ['rainfall-map.png', 'river-levels.pdf'],
            relatedUpdates: [1, 4],
            tags: ['flood', 'rain', 'river']
          },
          {
            id: 4,
            type: 'statistics',
            category: 'Disaster Statistics',
            title: '2023 Wildfire Season Impact Report',
            description: 'Comprehensive report on wildfire impacts across western states. Acreage burned increased 15% compared to previous year.',
            content: 'The 2023 wildfire season has been one of the most severe on record, with over 7.5 million acres burned across western states—a 15% increase compared to the previous year. This report details the economic, environmental, and social impacts of these fires, including air quality issues, property damage estimates, and emergency response efforts. Key findings indicate that climate change continues to exacerbate fire conditions, with longer fire seasons and more intense burning patterns. The report includes recommendations for community preparedness and policy changes.',
            time: '5 hours ago',
            icon: 'fas fa-chart-line',
            borderColor: 'border-green-500',
            location: 'Western USA',
            severity: 8.3,
            source: 'Forest Service & DOI',
            attachments: ['wildfire-report-2023.pdf', 'data-summary.xlsx'],
            relatedUpdates: [6, 10],
            tags: ['wildfire', 'statistics', 'climate']
          },
          {
            id: 5,
            type: 'tips',
            category: 'Safety Tips',
            title: 'Post-Storm Safety Guidelines',
            description: 'Important safety information for residents returning after Hurricane Elena. Beware of hazards and follow official guidance.',
            content: 'As residents return to areas affected by Hurricane Elena, it is crucial to follow these safety guidelines: 1. Avoid downed power lines - assume all lines are live and dangerous. 2. Be cautious when entering buildings - check for structural damage. 3. Do not use generators indoors - carbon monoxide poisoning is a serious risk. 4. Boil water until authorities confirm it is safe. 5. Document any property damage with photographs for insurance claims. 6. Wear protective clothing during cleanup. 7. Watch for displaced wildlife, especially snakes and other animals. 8. Check on neighbors, particularly elderly or disabled individuals.',
            time: '6 hours ago',
            icon: 'fas fa-lightbulb',
            borderColor: 'border-yellow-500',
            location: 'Affected Areas',
            severity: 3.8,
            source: 'Red Cross & FEMA',
            attachments: ['safety-checklist.pdf', 'emergency-contacts.pdf'],
            relatedUpdates: [2, 7],
            tags: ['safety', 'recovery', 'guidelines']
          },
          {
            id: 6,
            type: 'community',
            category: 'Community Report',
            title: 'Local Volunteers Organize Cleanup Efforts',
            description: 'Community groups coordinating debris removal and assistance for affected residents. Sign up to volunteer or request help.',
            content: 'In the aftermath of the recent storms, local community organizations have mobilized to coordinate cleanup efforts and assistance for affected residents. Volunteer teams are being organized to help with debris removal, tree cutting, and minor repairs. If you need assistance or would like to volunteer, please contact the Community Response Network at 555-HELP or visit their website at crn.example.com. Donations of water, non-perishable food, and cleaning supplies are also being accepted at designated locations throughout the community. Together, we can recover and rebuild stronger than before.',
            time: '1 day ago',
            icon: 'fas fa-people-group',
            borderColor: 'border-pink-500',
            location: 'Coastal Communities',
            severity: 2.5,
            source: 'Community Response Network',
            attachments: ['volunteer-signup.pdf', 'donation-locations.pdf'],
            relatedUpdates: [2, 5],
            tags: ['community', 'volunteer', 'recovery']
          }
        ];
        setUpdates(mockUpdates);
        setIsLoading(false);
      }, 1500);
    };

    loadUpdates();
  }, []);

  const filteredUpdates = activeFilter === 'all' 
    ? updates 
    : updates.filter(update => update.type === activeFilter);

  const categoryStyles = {
    news: { color: 'blue', text: 'text-blue-700', bg: 'bg-blue-100' },
    advisory: { color: 'purple', text: 'text-purple-700', bg: 'bg-purple-100' },
    weather: { color: 'cyan', text: 'text-cyan-700', bg: 'bg-cyan-100' },
    statistics: { color: 'green', text: 'text-green-700', bg: 'bg-green-100' },
    tips: { color: 'yellow', text: 'text-yellow-700', bg: 'bg-yellow-100' },
    community: { color: 'pink', text: 'text-pink-700', bg: 'bg-pink-100' }
  };

  const UpdateCard = ({ update, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-l-4 ${update.borderColor} cursor-pointer`}
      onClick={() => setSelectedUpdate(update)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${categoryStyles[update.type].bg} ${categoryStyles[update.type].text}`}>
              {update.category}
            </span>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{update.title}</h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <i className="fas fa-map-marker-alt mr-2"></i>
              {update.location}
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            className={`text-3xl text-${categoryStyles[update.type].color}-500`}
          >
            <i className={update.icon}></i>
          </motion.div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {update.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <i className="fas fa-clock mr-2"></i>
            {update.time}
          </div>
          <div className="text-sm font-semibold flex items-center">
            <i className="fas fa-source mr-1"></i>
            {update.source}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {update.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        
        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
          <i className="fas fa-envelope-open-text mr-2"></i>
          Read Full Update
        </Button>
      </div>
    </motion.div>
  );

  const UpdateDetailModal = () => (
    <AnimatePresence>
      {selectedUpdate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedUpdate(null)}
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
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${categoryStyles[selectedUpdate.type].bg} ${categoryStyles[selectedUpdate.type].text}`}>
                    {selectedUpdate.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {selectedUpdate.title}
                  </h2>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    {selectedUpdate.location}
                    <span className="mx-3">•</span>
                    <i className="fas fa-clock mr-2"></i>
                    {selectedUpdate.time}
                    <span className="mx-3">•</span>
                    <i className="fas fa-source mr-2"></i>
                    {selectedUpdate.source}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedUpdate(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                    <i className="fas fa-align-left mr-2 text-green-500"></i>
                    Update Details
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 whitespace-pre-line">
                    {selectedUpdate.content}
                  </p>

                  {selectedUpdate.attachments && selectedUpdate.attachments.length > 0 && (
                    <>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                        <i className="fas fa-paperclip mr-2 text-blue-500"></i>
                        Attachments
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {selectedUpdate.attachments.map((attachment, index) => (
                          <motion.div 
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer"
                          >
                            <i className="fas fa-file-pdf text-red-500 text-xl mr-3"></i>
                            <span className="text-gray-600 dark:text-gray-300">{attachment}</span>
                            <i className="fas fa-download ml-auto text-gray-400"></i>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                    <i className="fas fa-tags mr-2 text-purple-500"></i>
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedUpdate.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                    <i className="fas fa-share-alt mr-2 text-orange-500"></i>
                    Share This Update
                  </h3>
                  <div className="flex gap-3 mb-6">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      <i className="fab fa-facebook-f"></i>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center">
                      <i className="fab fa-twitter"></i>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                      <i className="fab fa-whatsapp"></i>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center">
                      <i className="fas fa-envelope"></i>
                    </motion.button>
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                    <i className="fas fa-bell mr-2 text-red-500"></i>
                    Get Notifications
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Stay informed about similar updates
                  </p>
                  <Button 
                    onClick={() => {
                      setSelectedUpdate(null);
                      setSubscriptionModal(true);
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <i className="fas fa-bell mr-2"></i>
                    Subscribe to Alerts
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedUpdate(null)}
                  className="border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  Close
                </Button>
                <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  <i className="fas fa-download mr-2"></i>
                  Download Report
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

  const SubscriptionModal = () => (
    <AnimatePresence>
      {subscriptionModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSubscriptionModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Subscribe to Updates
                </h2>
                <button 
                  onClick={() => setSubscriptionModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Stay informed with the latest disaster management updates and alerts.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notification Types
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(categoryStyles).map(([type, style]) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`type-${type}`}
                          checked={selectedTypes.includes(type)}
                          onChange={() => {
                            if (selectedTypes.includes(type)) {
                              setSelectedTypes(selectedTypes.filter(t => t !== type));
                            } else {
                              setSelectedTypes([...selectedTypes, type]);
                            }
                          }}
                          className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`type-${type}`} className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="push-notifications"
                    name="push-notifications"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mr-2"
                  />
                  <label htmlFor="push-notifications" className="text-sm text-gray-700 dark:text-gray-300">
                    Enable push notifications
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="sms-notifications"
                    name="sms-notifications"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mr-2"
                  />
                  <label htmlFor="sms-notifications" className="text-sm text-gray-700 dark:text-gray-300">
                    Enable SMS notifications
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setSubscriptionModal(false)}
                  className="border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    // Here you would typically send the subscription data to your backend
                    alert(`Subscribed with email: ${email} for types: ${selectedTypes.join(', ')}`);
                    setSubscriptionModal(false);
                  }}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Stats Charts Component
  const StatsCharts = () => {
    const categoryData = {
      labels: ['News', 'Advisories', 'Weather', 'Statistics', 'Tips', 'Community'],
      datasets: [
        {
          data: [
            stats.categories.news,
            stats.categories.advisory,
            stats.categories.weather,
            stats.categories.statistics,
            stats.categories.tips,
            stats.categories.community
          ],
          backgroundColor: [
            '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#eab308', '#ec4899'
          ],
          hoverBackgroundColor: [
            '#2563eb', '#7c3aed', '#0891b2', '#059669', '#ca8a04', '#db2777'
          ],
          borderWidth: 0,
        }
      ]
    };

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Update Categories</h3>
        <div className="h-64">
          {/* Doughnut Chart for Categories */}
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  {Object.values(stats.categories).reduce((a, b) => a + b, 0)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Updates</div>
              </div>
            </div>
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {(() => {
                const total = Object.values(stats.categories).reduce((a, b) => a + b, 0);
                let accumulatedPercent = 0;
                
                return Object.values(stats.categories).map((value, index) => {
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
                      stroke={categoryData.datasets[0].backgroundColor[index]}
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
          {categoryData.labels.map((label, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: categoryData.datasets[0].backgroundColor[index] }}
              ></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
              <span className="ml-auto text-sm font-medium text-gray-800 dark:text-white">
                {stats.categories[label.toLowerCase()]}
              </span>
            </div>
          ))}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Updates & News</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Latest information, advisories, and resources for disaster management
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

      {/* Breaking News Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="container mx-auto px-4 -mt-10 relative z-20"
      >
        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 flex items-center justify-between shadow-xl">
          <div className="flex items-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl mr-4"
            >
              <i className="fas fa-bullhorn"></i>
            </motion.div>
            <div>
              <h2 className="font-bold text-xl">BREAKING: New Evacuation Guidelines Published</h2>
              <p className="text-sm opacity-90 mt-1">Updated protocols for hurricane season now available for all coastal regions.</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition shadow-md"
          >
            View Guidelines
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
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Filter Updates</h2>
          <div className="flex flex-wrap gap-3">
            <FilterButton type="all" icon="fas fa-layer-group" label="All Updates" />
            <FilterButton type="news" icon="fas fa-newspaper" label="News" />
            <FilterButton type="advisory" icon="fas fa-building-shield" label="Advisories" />
            <FilterButton type="weather" icon="fas fa-cloud-rain" label="Weather" />
            <FilterButton type="statistics" icon="fas fa-chart-line" label="Statistics" />
            <FilterButton type="tips" icon="fas fa-lightbulb" label="Safety Tips" />
            <FilterButton type="community" icon="fas fa-people-group" label="Community" />
          </div>
        </motion.div>
      </div>

      {/* Dashboard Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Updates Feed */}
          <div ref={updatesRef} className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={updatesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                  <i className="fas fa-bell mr-2 text-green-500"></i>Recent Updates
                  <span className="ml-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {updates.length} Total
                  </span>
                </h2>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">LATEST UPDATES</span>
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
                  {filteredUpdates.map((update, index) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                      onClick={() => setSelectedUpdate(update)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-1">
                          <div className={`w-3 h-3 rounded-full bg-${categoryStyles[update.type].color}-500 mt-1`}></div>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-bold text-${categoryStyles[update.type].color}-600 dark:text-${categoryStyles[update.type].color}-400`}>
                              {update.category}
                            </h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{update.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{update.title}</p>
                          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <i className={`${update.icon} mr-1 text-${categoryStyles[update.type].color}-500`}></i>
                            <span>{update.location}</span>
                            <span className="mx-2">•</span>
                            <i className="fas fa-source mr-1"></i>
                            <span>{update.source}</span>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <button className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Read</button>
                            <button className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">Share</button>
                            <button className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">Save</button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
                <button className="text-green-600 dark:text-green-400 hover:underline font-medium">
                  View Archive <i className="fas fa-arrow-right ml-1"></i>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Stats & Subscription */}
          <div ref={statsRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-full"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  <i className="fas fa-chart-pie mr-2 text-green-600"></i>Update Statistics
                </h2>
              </div>
              <div className="p-6">
                <StatsCharts />
                
                {/* Subscription Box */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-2xl mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Stay Informed</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                    Get the latest updates delivered to your inbox or phone
                  </p>
                  <Button 
                    onClick={() => setSubscriptionModal(true)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <i className="fas fa-bell mr-2"></i>
                    Subscribe to Updates
                  </Button>
                </div>
                
                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Links</h3>
                  <div className="space-y-3">
                    <motion.a 
                      whileHover={{ scale: 1.02 }}
                      href="#"
                      className="w-full flex items-center justify-between px-4 py-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition shadow-md"
                    >
                      <span>Emergency Contacts</span>
                      <i className="fas fa-phone-alt"></i>
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.02 }}
                      href="#"
                      className="w-full flex items-center justify-between px-4 py-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition shadow-md"
                    >
                      <span>Safety Guidelines</span>
                      <i className="fas fa-file-alt"></i>
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.02 }}
                      href="#"
                      className="w-full flex items-center justify-between px-4 py-3 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition shadow-md"
                    >
                      <span>Community Forum</span>
                      <i className="fas fa-comments"></i>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Social Media Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              <i className="fas fa-hashtag mr-2 text-green-600"></i>Social Media Updates
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Twitter Feed */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 h-64 overflow-y-auto"
              >
                <div className="flex items-center mb-4">
                  <i className="fab fa-twitter text-blue-400 text-xl mr-2"></i>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Twitter Updates</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-blue-200 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">NWS</span>
                      <span className="text-xs text-gray-500 dark:text-gray-300 ml-2">@NWS · 2h</span>
                    </div>
                    <p className="text-sm">Flash Flood Warning including Cityville, Townsburg until 4:00 PM EDT. Avoid flood waters.</p>
                  </div>
                  <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-red-200 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">RedCross</span>
                      <span className="text-xs text-gray-500 dark:text-gray-300 ml-2">@RedCross · 4h</span>
                    </div>
                    <p className="text-sm">Emergency shelters are open in Countyville for those affected by the storms. Find locations at redcross.org/shelter</p>
                  </div>
                  <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-green-200 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">ReadyGov</span>
                      <span className="text-xs text-gray-500 dark:text-gray-300 ml-2">@ReadyGov · 6h</span>
                    </div>
                    <p className="text-sm">Do you have an emergency kit? Make sure to include water, non-perishable food, flashlight, batteries, and first aid supplies.</p>
                  </div>
                </div>
              </motion.div>

              {/* Facebook Feed */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 h-64 overflow-y-auto"
              >
                <div className="flex items-center mb-4">
                  <i className="fab fa-facebook text-blue-600 text-xl mr-2"></i>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Facebook Updates</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">FEMA</span>
                      <span className="text-xs text-gray-500 dark:text-gray-300 ml-2">5h ago</span>
                    </div>
                    <p className="text-sm">FEMA assistance is available for residents affected by severe storms in Statename. Apply at DisasterAssistance.gov</p>
                    <div className="mt-2 text-xs text-blue-500 dark:text-blue-300">243 shares · 589 comments</div>
                  </div>
                  <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">Local Emergency Management</span>
                      <span className="text-xs text-gray-500 dark:text-gray-300 ml-2">8h ago</span>
                    </div>
                    <p className="text-sm">Power has been restored to most areas affected by last night's storms. Crews are working to restore remaining outages.</p>
                    <div className="mt-2 text-xs text-blue-500 dark:text-blue-300">87 shares · 142 comments</div>
                  </div>
                </div>
              </motion.div>

              {/* Community Forum */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 h-64 overflow-y-auto"
              >
                <div className="flex items-center mb-4">
                  <i className="fas fa-comments text-green-500 text-xl mr-2"></i>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Community Reports</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">User123</span>
                      <span className="text-xs text-gray-500 dark:text-gray-300 ml-2">1h ago</span>
                    </div>
                    <p className="text-sm">Tree down on Oak Street blocking both lanes. Police are on scene directing traffic.</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-300">
                      <i className="fas fa-thumbs-up mr-1"></i> 12
                      <i className="fas fa-comment ml-3 mr-1"></i> 3
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">PreparedParent</span>
                      <span className="text-xs text-gray-500 dark:text-gray-300 ml-2">3h ago</span>
                    </div>
                    <p className="text-sm">The community center on 5th Ave is distributing free sandbags for anyone needing flood protection.</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-300">
                      <i className="fas fa-thumbs-up mr-1"></i> 28
                      <i className="fas fa-comment ml-3 mr-1"></i> 7
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">WeatherWatcher</span>
                      <span className="text-xs text-gray-500 dark:text-gray-300 ml-2">5h ago</span>
                    </div>
                    <p className="text-sm">Just measured 3.2 inches of rain in the past hour in Middletown. Creek levels rising rapidly.</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-300">
                      <i className="fas fa-thumbs-up mr-1"></i> 15
                      <i className="fas fa-comment ml-3 mr-1"></i> 4
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Update Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Detailed Update Overview
            <span className="ml-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {filteredUpdates.length} Updates
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
              {filteredUpdates.map((update, index) => (
                <UpdateCard key={update.id} update={update} index={index} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Historical Archive Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Historical Archive</h2>
            <p className="mb-6 opacity-90">Access past disaster reports, records, and analysis</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-2xl mb-2">
                  <i className="fas fa-book"></i>
                </div>
                <h3 className="font-semibold mb-2">Annual Reports</h3>
                <p className="text-sm opacity-80">Comprehensive yearly disaster summaries</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-2xl mb-2">
                  <i className="fas fa-chart-bar"></i>
                </div>
                <h3 className="font-semibold mb-2">Statistical Analysis</h3>
                <p className="text-sm opacity-80">Trends and patterns in disaster data</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-2xl mb-2">
                  <i className="fas fa-download"></i>
                </div>
                <h3 className="font-semibold mb-2">Downloadable Resources</h3>
                <p className="text-sm opacity-80">PDFs, datasets, and research materials</p>
              </motion.div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition shadow-md"
            >
              Access Archive <i className="fas fa-arrow-right ml-2"></i>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Update Detail Modal */}
      <UpdateDetailModal />

      {/* Subscription Modal */}
      <SubscriptionModal />

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40"
        onClick={() => setSubscriptionModal(true)}
      >
        <i className="fas fa-bell text-xl"></i>
      </motion.button>
    </div>
  );
};

export default Updates;