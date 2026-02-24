import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; 

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('✅ PWA Service Worker registered successfully');
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('📦 New service worker installing...');
        });
      })
      .catch(error => {
        console.log('❌ PWA Service Worker registration failed:', error);
      });
  });
}

// Add beforeinstallprompt event listener
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('📱 App can be installed');
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);