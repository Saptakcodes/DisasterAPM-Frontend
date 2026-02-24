import React, { useState, useEffect } from 'react';

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is already installed (runs in standalone mode)
    const checkStandalone = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.navigator.standalone || 
                        document.referrer.includes('android-app://');
      setIsStandalone(standalone);
      return standalone;
    };

    // Check if iOS device
    const checkIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isIOS);
      return isIOS;
    };

    const standalone = checkStandalone();
    const ios = checkIOS();

    // Don't show button if already installed
    if (standalone) {
      console.log('App already installed - hiding button');
      return;
    }

    // For Chrome/Android/Desktop - listen for install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log('✅ Install prompt available - showing button');
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS - always show button with instructions
    if (ios) {
      console.log('📱 iOS detected - showing install button with instructions');
      setShowButton(true);
    }

    // Fallback: Show button after 3 seconds if no prompt (for testing)
    const timer = setTimeout(() => {
      if (!showButton && !standalone) {
        console.log('⚠️ No install prompt detected - showing fallback button');
        setShowButton(true);
      }
    }, 3000);

    // Handle successful install
    const handleAppInstalled = () => {
      console.log('✅ App installed successfully');
      setShowButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timer);
    };
  }, [showButton]);

  const handleInstallClick = async () => {
    // For Android/Chrome with proper prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response: ${outcome}`);
      
      if (outcome === 'accepted') {
        setShowButton(false);
      }
      setDeferredPrompt(null);
      return;
    }

    // For iOS - show instructions
    if (isIOS) {
      alert('📱 To install on iPhone:\n\n1. Tap Share button (box with arrow)\n2. Scroll down\n3. Tap "Add to Home Screen"\n4. Tap "Add" in top right');
      return;
    }

    // For other browsers - show general instructions
    alert('📱 To install the app:\n\n1. Tap browser menu (3 dots)\n2. Tap "Add to Home screen"\n3. Tap "Install" or "Add"');
  };

  if (!showButton || isStandalone) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-20 right-6 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-bounce"
      style={{ zIndex: 9999 }}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
      </svg>
      Install App
    </button>
  );
};

export default InstallButton;