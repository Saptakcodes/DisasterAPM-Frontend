// src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import logo from '../assets/images/logo.png';


// Import videos (adjust paths as needed)
import floodVideo from '../assets/videos/flood_features.mp4';
import forestFireVideo from '../assets/videos/forestfire_features2.mp4';
import earthquakeVideo from '../assets/videos/earthquake_features2.mp4';
import cycloneVideo from '../assets/videos/cyclone_features.mp4';
import thunderstormVideo from '../assets/videos/thunderstorm_features2.mp4';
import heatwaveVideo from '../assets/videos/heatwave.mp4';
import homepgbackgroundvideo from '../assets/videos/disaster_video3.mp4'
import heroimg from '../assets/images/first-img1.webp'



const Home = () => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const featuresRef = useRef(null);
  const alertsRef = useRef(null);
  const analysisRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { margin: "-50%" });
  const introInView = useInView(introRef, { margin: "-50%" });
  const featuresInView = useInView(featuresRef, { margin: "-50%" });
  const alertsInView = useInView(alertsRef, { margin: "-50%" });
  const analysisInView = useInView(analysisRef, { margin: "-50%" });
  const ctaInView = useInView(ctaRef, { margin: "-50%" });

  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const features = [
    {
      icon: 'fas fa-satellite',
      title: 'Real-time Satellite Monitoring',
      description: 'Advanced environmental surveillance via satellite networks'
    },
    {
      icon: 'fas fa-brain',
      title: 'AI-Powered Predictions',
      description: 'Deep learning models trained on decades of historical disaster data'
    },
    {
      icon: 'fas fa-bell',
      title: 'Instant Multi-Channel Alerts',
      description: 'Get notified via SMS, email, mobile push, and emergency broadcast systems'
    },
    {
      icon: 'fas fa-map-marked-alt',
      title: '3D Risk Mapping',
      description: 'Interactive 3D maps showing vulnerable zones and impact projections'
    },
    {
      icon: 'fas fa-cloud-sun-rain',
      title: 'Weather Integration',
      description: 'Real-time weather data integration for dynamic disaster forecasting'
    },
    {
      icon: 'fas fa-hands-helping',
      title: 'Smart Relief Coordination',
      description: 'AI-optimized resource allocation and emergency response planning'
    }
  ];

  const services = [
    {
      title: 'Flood Prediction',
      description: 'Advanced flood risk assessment using rainfall patterns, river levels, and terrain analysis',
      path: '/flood',
      video: floodVideo,
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      icon: 'fas fa-water'
    },
    {
      title: 'Wildfire Detection',
      description: 'Early fire detection using thermal imaging, humidity sensors, and vegetation analysis',
      path: '/fire',
      video: forestFireVideo,
      bgColor: 'bg-red-100 dark:bg-red-900',
      icon: 'fas fa-fire'
    },
    {
      title: 'Earthquake Early Warning',
      description: 'Seismic activity monitoring with advanced prediction algorithms',
      path: '/earthquake',
      video: earthquakeVideo,
      bgColor: 'bg-gray-200 dark:bg-gray-800',
      icon: 'fas fa-mountain'
    },
    {
      title: 'Cyclone Tracking',
      description: 'Real-time cyclone path prediction and intensity forecasting',
      path: '/cyclone',
      video: cycloneVideo,
      bgColor: 'bg-blue-200 dark:bg-blue-800',
      icon: 'fas fa-wind'
    },
    {
      title: 'Thunderstorm Alert',
      description: 'Lightning prediction and storm severity assessment',
      path: '/thunderstorm',
      video: thunderstormVideo,
      bgColor: 'bg-purple-100 dark:bg-purple-900',
      icon: 'fas fa-bolt'
    },
    {
      title: 'Heatwave Monitoring',
      description: 'Extreme temperature forecasting and health risk assessment',
      path: '/heatwave',
      video: heatwaveVideo,
      bgColor: 'bg-red-100 dark:bg-red-800',
      icon: 'fas fa-temperature-high'
    }
  ];

  const alerts = [
    {
      risk: 'CRITICAL',
      title: 'Wildfire Emergency',
      description: 'Northern California region showing extreme fire risk due to drought conditions and high winds',
      time: '12 minutes ago',
      icon: 'fas fa-fire',
      borderColor: 'border-red-500',
      location: 'California, USA',
      severity: 9.2
    },
    {
      risk: 'HIGH',
      title: 'Flood Warning',
      description: 'Mississippi River basin expected to reach flood stage within 36 hours',
      time: '45 minutes ago',
      icon: 'fas fa-water',
      borderColor: 'border-orange-500',
      location: 'Mississippi Basin',
      severity: 7.8
    },
    {
      risk: 'MODERATE',
      title: 'Heatwave Advisory',
      description: 'Southwest US facing extreme heatwave with temperatures exceeding 115°F',
      time: '2 hours ago',
      icon: 'fas fa-temperature-high',
      borderColor: 'border-yellow-500',
      location: 'Southwest USA',
      severity: 6.5
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      alert(`Thank you for subscribing with ${email}! You'll receive critical alerts soon.`);
      setEmail('');
    }, 500);
  };

  const FloatingParticle = ({ style, delay }) => (
    <motion.div
      className="absolute w-2 h-2 bg-green-400 rounded-full opacity-60"
      initial={{ y: 0, x: 0 }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
      style={style}
    />
  );

  const StatsCounter = ({ end, duration, label }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
      if (inView) {
        let startTime = null;
        const animateCount = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) {
            requestAnimationFrame(animateCount);
          }
        };
        requestAnimationFrame(animateCount);
      }
    }, [inView, end, duration]);

    return (
      <div ref={ref} className="text-center">
        <motion.div 
          className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        >
          {count}+
        </motion.div>
        <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
      </div>
    );
  };

  return (
    <div className="overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.3}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>


<section 
  id="hero" 
  ref={heroRef}
  className="relative h-screen flex items-center justify-center text-white overflow-hidden"
>
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
      <source src={homepgbackgroundvideo} type="video/mp4" />
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

  <motion.div 
    className="container mx-auto px-2 text-center relative z-10"
    style={{ opacity, scale, y }}
  >
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mb-8"
    >
<div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-2xl flex items-center justify-center transform rotate-12">
  <img
    src={logo}
    alt="Logo"
    className="w-full h-full p-0.5 object-contain animate-pulse"
  />
</div>




    </motion.div>

    <motion.h1 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
    >
      DisasterAPM
    </motion.h1>
    
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-xl md:text-3xl mb-8 font-light text-gray-200"
    >
      AI-Powered Early Warning System
    </motion.p>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
    >
      <Button 
        as={Link} 
        to="#features" 
        className="px-8 py-4 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
      >
        <i className="fas fa-rocket mr-2"></i>
        Explore Services
      </Button>
<Link to="/alerts">
  <Button 
    variant="outline" 
    className="px-8 py-4 text-lg border-white text-white hover:from-green-500 to-green-600 hover:text-black"
  >
    <i className="fas fa-bell mr-2"></i>
    View Alerts
  </Button>
</Link>
    </motion.div>
  </motion.div>

  {/* Animated scroll indicator */}
  <motion.div 
    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
    animate={{ y: [0, 15, 0] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
  >
    <div className="w-8 h-12 border-2 border-green-400 rounded-full flex justify-center">
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-1 h-3 bg-green-400 rounded-full mt-2"
      />
    </div>
  </motion.div>

  {/* Animated gradient overlay */}
  <motion.div 
    className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-green-700/20 z-0"
    animate={{ opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 4, repeat: Infinity }}
  />
</section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <StatsCounter end={127} duration={2000} label="Lives Saved" />
            <StatsCounter end={356} duration={2500} label="Early Warnings" />
            <StatsCounter end={98} duration={3000} label="Disasters Predicted" />
            <StatsCounter end={24} duration={3500} label="Countries Covered" />
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="intro" ref={introRef} className="py-20 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-green-700 dark:text-green-400"
          >
            <span className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
              Next-Gen Disaster Prevention
            </span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.p 
                className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our <span className="font-semibold text-green-600 dark:text-green-300">AI-Powered Disaster Prediction System</span> leverages cutting-edge technology to provide early warnings for natural disasters, empowering communities worldwide.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      y: -5,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="flex items-start gap-4 bg-white/80 dark:bg-gray-700/80 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-green-100 dark:border-gray-600"
                  >
                    <motion.div 
                      className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <i className={`${feature.icon} text-white text-lg`}></i>
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                whileHover={{ rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-3xl shadow-2xl border border-green-100 dark:border-gray-600"
              >
                <img 
                  src={heroimg} 
                  alt="Disaster prediction technology" 
                  className="w-full rounded-2xl object-cover shadow-md"
                />
              </motion.div>
              
              {/* Floating elements around the image */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <i className="fas fa-chart-line text-white text-xl"></i>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <i className="fas fa-database text-white text-lg"></i>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section id="features" ref={featuresRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
              Advanced Prediction Services
            </span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden shadow-xl border border-green-100 dark:border-gray-600"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 ${service.bgColor} flex items-center justify-center`}>
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    >
                      <source src={service.video} type="video/mp4" />
                    </video>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 dark:bg-gray-800/90 rounded-xl flex items-center justify-center shadow-lg">
                    <i className={`${service.icon} text-green-600 dark:text-green-400 text-lg`}></i>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <Button 
                    as={Link} 
                    to={service.path} 
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 group-hover:shadow-lg transition-all"
                  >
                    <i className="fas fa-arrow-right mr-2 transform group-hover:translate-x-1 transition-transform"></i>
                    Analyze Now
                  </Button>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-400/30 transition-all duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Alerts Section */}
      <section id="alerts-preview" ref={alertsRef} className="py-20 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-green-600 to-red-600 dark:from-green-400 dark:to-red-400 bg-clip-text text-transparent">
              Live Emergency Alerts
            </span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-l-4 ${alert.borderColor} transform transition-all duration-300`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                        alert.risk === 'CRITICAL' ? 'bg-red-100 text-red-800 animate-pulse' : 
                        alert.risk === 'HIGH' ? 'bg-orange-100 text-orange-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
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
                      className={`text-3xl ${
                        alert.risk === 'CRITICAL' ? 'text-red-500' : 
                        alert.risk === 'HIGH' ? 'text-orange-500' : 
                        'text-yellow-500'
                      }`}
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
                      className={`h-2 rounded-full ${
                        alert.risk === 'CRITICAL' ? 'bg-red-500' : 
                        alert.risk === 'HIGH' ? 'bg-orange-500' : 
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${alert.severity * 10}%` }}
                    ></div>
                  </div>
                  
                  <Button 
                    as={Link} 
                    to="/alerts" 
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <i className="fas fa-info-circle mr-2"></i>
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button 
              as={Link} 
              to="/alerts" 
              className="px-8 py-4 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg"
            >
              <i className="fas fa-list mr-2"></i>
              View All Emergency Alerts
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Interactive Analysis Preview */}
      <section id="analysis-preview" ref={analysisRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
              Interactive Data Analytics
            </span>
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-3xl shadow-xl border border-green-100 dark:border-gray-600"
            >
              <h3 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400 flex items-center">
                <i className="fas fa-chart-bar mr-3"></i>
                Flood Frequency Analysis
              </h3>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-inner h-64 flex flex-col justify-center items-center">
                <div className="w-full h-48 relative">
                  {/* Simulated chart bars */}
                  {[30, 50, 70, 90, 120, 150, 180, 160, 130, 100, 70, 40].map((height, index) => (
                    <motion.div
                      key={index}
                      className="absolute bottom-0 bg-gradient-to-t from-green-400 to-blue-400 rounded-t-md"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}px` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      style={{
                        width: '7%',
                        left: `${index * 8}%`,
                      }}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Monthly flood events analysis (2020-2023)
                </div>
              </div>
              
              <div className="mt-6 text-right">
                <Button 
                  as={Link} 
                  to="/analysis" 
                  variant="outline" 
                  className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
                >
                  <i className="fas fa-expand mr-2"></i>
                  Explore Full Analysis
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-3xl shadow-xl border border-orange-100 dark:border-gray-600"
            >
              <h3 className="text-2xl font-bold mb-6 text-orange-700 dark:text-orange-400 flex items-center">
                <i className="fas fa-fire mr-3"></i>
                Fire Risk Correlation
              </h3>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-inner h-64 flex flex-col justify-center items-center">
                <div className="w-full h-48 relative">
                  {/* Simulated scatter plot */}
                  {[...Array(50)].map((_, i) => {
                    const x = Math.random() * 100;
                    const y = Math.random() * 100;
                    const size = 5 + Math.random() * 8;
                    const opacity = 0.6 + Math.random() * 0.4;
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-br from-orange-400 to-red-500"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity }}
                        transition={{ duration: 0.5, delay: i * 0.02 }}
                        viewport={{ once: true }}
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          left: `${x}%`,
                          bottom: `${y}%`,
                        }}
                      />
                    );
                  })}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Temperature vs. Fire Risk Correlation
                </div>
              </div>
              
              <div className="mt-6 text-right">
                <Button 
                  as={Link} 
                  to="/analysis" 
                  variant="outline" 
                  className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
                >
                  <i className="fas fa-expand mr-2"></i>
                  Explore Full Analysis
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                width: `${10 + Math.random() * 40}px`,
                height: `${10 + Math.random() * 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Stay Protected, Stay Informed
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-10 max-w-3xl mx-auto text-white/90"
          >
            Join thousands of users who receive life-saving alerts and stay one step ahead of natural disasters.
          </motion.p>
          
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            onSubmit={handleSubscribe}
            className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-grow relative">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-lg"
                required
              />
              <i className="fas fa-envelope absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <Button variant="secondary" type="submit" className="px-8 py-4 text-lg">
            <i className="fas fa-paper-plane mr-2"></i>
            Subscribe Now
            </Button>

          </motion.form>

        </div>
      </section>
    </div>
  );
};

export default Home;
          