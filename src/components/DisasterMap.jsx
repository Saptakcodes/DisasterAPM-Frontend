import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DisasterMap = ({ activeTab, isDarkMode }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const layerGroup = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Sample disaster data (in a real app, this would come from an API)
  const disasterData = {
    wildfires: [
      { lat: 34.0522, lng: -118.2437, intensity: 'high', name: 'Los Angeles Wildfire' },
      { lat: 38.5816, lng: -121.4944, intensity: 'medium', name: 'Sacramento Brush Fire' },
      { lat: 45.5231, lng: -122.6765, intensity: 'extreme', name: 'Oregon Forest Fire' },
      { lat: 49.2827, lng: -123.1207, intensity: 'medium', name: 'British Columbia Wildfire' },
    ],
    floods: [
      { lat: 29.7604, lng: -95.3698, intensity: 'high', name: 'Houston Flooding' },
      { lat: 25.7617, lng: -80.1918, intensity: 'medium', name: 'Miami Coastal Flood' },
      { lat: 35.2271, lng: -80.8431, intensity: 'low', name: 'Charlotte River Overflow' },
      { lat: 39.9526, lng: -75.1652, intensity: 'high', name: 'Philadelphia Flash Flood' },
    ],
    hurricanes: [
      { lat: 25.7617, lng: -80.1918, intensity: 'extreme', name: 'Hurricane Elena' },
      { lat: 30.3322, lng: -81.6557, intensity: 'high', name: 'Hurricane Michael' },
      { lat: 27.9506, lng: -82.4572, intensity: 'medium', name: 'Tropical Storm Grace' },
    ],
    earthquakes: [
      { lat: 34.0522, lng: -118.2437, intensity: 'medium', name: 'LA Tremor', magnitude: 4.2 },
      { lat: 37.7749, lng: -122.4194, intensity: 'low', name: 'San Francisco Quake', magnitude: 3.1 },
      { lat: 47.6062, lng: -122.3321, intensity: 'high', name: 'Seattle Earthquake', magnitude: 5.4 },
      { lat: 40.7128, lng: -74.0060, intensity: 'medium', name: 'New York Tremor', magnitude: 3.8 },
    ],
    thunderstorm: [
      { lat: 39.7392, lng: -104.9903, intensity: 'medium', name: 'Denver Thunderstorms' },
      { lat: 41.8781, lng: -87.6298, intensity: 'high', name: 'Chicago Severe Storm' },
      { lat: 32.7767, lng: -96.7970, intensity: 'low', name: 'Dallas Thunderstorm' },
    ],
    heatwaves: [
      { lat: 33.4484, lng: -112.0740, intensity: 'extreme', name: 'Phoenix Heatwave' },
      { lat: 32.7157, lng: -117.1611, intensity: 'high', name: 'San Diego Excessive Heat' },
      { lat: 29.4241, lng: -98.4936, intensity: 'medium', name: 'San Antonio Heat Advisory' },
    ]
  };

  // Define custom icons for different disaster types and intensities
  const createCustomIcon = (disasterType, intensity) => {
    const intensityColors = {
      low: 'green',
      medium: 'orange',
      high: 'red',
      extreme: 'purple'
    };

    const disasterIcons = {
      wildfires: 'fire',
      floods: 'tint',
      hurricanes: 'wind',
      earthquakes: 'circle',
      thunderstorm: 'bolt',
      heatwaves: 'sun'
    };

    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${intensityColors[intensity]}; 
                         width: 30px; 
                         height: 30px; 
                         border-radius: 50% 50% 50% 0; 
                         transform: rotate(-45deg); 
                         display: flex; 
                         align-items: center; 
                         justify-content: center;">
                <i class="fas fa-${disasterIcons[disasterType]}" 
                   style="color: white; transform: rotate(45deg); font-size: 12px;"></i>
             </div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map
    mapInstance.current = L.map(mapRef.current).setView([39.8283, -98.5795], 4);
    
    // Add tile layer (map background)
    const tileLayer = isDarkMode 
      ? L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20
        })
      : L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
    
    tileLayer.addTo(mapInstance.current);
    
    // Create layer group for markers
    layerGroup.current = L.layerGroup().addTo(mapInstance.current);
    
    setMapLoaded(true);
    
    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [isDarkMode]);

  // Update markers when activeTab changes
  useEffect(() => {
    if (!mapInstance.current || !layerGroup.current) return;

    // Clear existing markers
    layerGroup.current.clearLayers();

    // Add markers for the active tab
    disasterData[activeTab].forEach(disaster => {
      const marker = L.marker([disaster.lat, disaster.lng], {
        icon: createCustomIcon(activeTab, disaster.intensity)
      });
      
      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold text-lg">${disaster.name}</h3>
          <p>Type: ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</p>
          <p>Intensity: ${disaster.intensity.charAt(0).toUpperCase() + disaster.intensity.slice(1)}</p>
          ${disaster.magnitude ? `<p>Magnitude: ${disaster.magnitude}</p>` : ''}
        </div>
      `);
      
      marker.addTo(layerGroup.current);
    });

    // Fit map to show all markers
    if (disasterData[activeTab].length > 0) {
      const group = new L.featureGroup(disasterData[activeTab].map(d => 
        L.marker([d.lat, d.lng])
      ));
      mapInstance.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [activeTab, mapLoaded]);

  return (
    <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
        <h4 className="text-gray-800 dark:text-white font-semibold mb-2">Live Disaster Tracking</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Extreme</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">High</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Low</span>
          </div>
        </div>
      </div>
      
      {/* Map container */}
      <div 
        ref={mapRef} 
        className="absolute inset-0 z-0 rounded-xl"
        style={{ height: '100%', width: '100%' }}
      />
      
      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <button 
          className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => mapInstance.current && mapInstance.current.zoomIn()}
        >
          <i className="fas fa-plus"></i>
        </button>
        <button 
          className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => mapInstance.current && mapInstance.current.zoomOut()}
        >
          <i className="fas fa-minus"></i>
        </button>
        <button 
          className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => {
            if (disasterData[activeTab].length > 0) {
              const group = new L.featureGroup(disasterData[activeTab].map(d => 
                L.marker([d.lat, d.lng])
              ));
              mapInstance.current.fitBounds(group.getBounds().pad(0.1));
            }
          }}
        >
          <i className="fas fa-location-arrow"></i>
        </button>
      </div>
    </div>
  );
};

export default DisasterMap;