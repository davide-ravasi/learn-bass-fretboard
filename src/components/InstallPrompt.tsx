import { useState, useEffect } from "react";

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for browser install prompt event (Android/Desktop only)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    // Only add listener on non-iOS devices
    if (!iOS) {
      window.addEventListener("beforeinstallprompt", handler);
    }

    return () => {
      if (!iOS) {
        window.removeEventListener("beforeinstallprompt", handler);
      }
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowInstallButton(false);
        setDeferredPrompt(null);
      }
    }
  };

  // Don't show anything on iOS - users need to use Share button
  if (isIOS) {
    return null;
  }

  // Show install button for Android/Desktop
  if (!showInstallButton) {
    return null;
  }

  return (
    <div className="install-prompt">
      <div className="install-content">
        <span className="install-icon">📱</span>
        <span className="install-text">Install App</span>
      </div>
      <button onClick={handleInstallClick} className="install-button">
        Install
      </button>
    </div>
  );
};
