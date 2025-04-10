import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
});

// Add PWA install prompt
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Make it available globally
  window.deferredPrompt = deferredPrompt;
});

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider
    clientId="81865697310-626vq6gichnoc7bv3tv4fseu7i2vgavh.apps.googleusercontent.com"
    // clientId="151193059285-r9d8q97is7qo0cgutufq2ndhld5mt78d.apps.googleusercontent.com"
  >
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
);
