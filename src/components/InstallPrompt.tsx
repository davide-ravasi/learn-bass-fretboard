import { useState, useEffect } from "react";

/** Chromium `beforeinstallprompt` event (not in all TS DOM libs). */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for browser install prompt event (Android/Desktop only)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
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
