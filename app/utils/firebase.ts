"use client";

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCUzZ7UIBkSWiS8HGOvOGJU_neEJftyyy4",
  appId: "1:635139009990:web:936b1cd8582998e00056c7",
  authDomain: "roastfestival.firebaseapp.com",
  measurementId: "G-RGNDY5N337",
  messagingSenderId: "635139009990",
  projectId: "roastfestival",
  storageBucket: "roastfestival.appspot.com",
};

// Initialize Firebase only once
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

/**
 * Get the Google Analytics instance (if initialized and cookies accepted)
 */
let analyticsInstance: Analytics | null = null;
export const getAnalyticsInstance = (): Analytics | null => analyticsInstance;

// Initialize App Check with reCAPTCHA Enterprise (only when cookies are accepted)
const RECAPTCHA_SITE_KEY = "6LeQq18sAAAAAEbwUGnt9vdMjesm24tJrLFZ-f8l";

let appCheckInitialized = false;

const initializeAppCheckIfConsented = (firebaseApp: FirebaseApp) => {
  if (appCheckInitialized) return;

  const consent = localStorage.getItem("cookie-consent");
  if (consent !== "accepted") return;

  // Enable debug token for local development
  if (process.env.NODE_ENV === "development") {
    // @ts-expect-error - Firebase debug token for local development
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  initializeAppCheck(firebaseApp, {
    isTokenAutoRefreshEnabled: true,
    provider: new ReCaptchaEnterpriseProvider(RECAPTCHA_SITE_KEY),
  });

  appCheckInitialized = true;
};

const initializeAnalyticsIfConsented = (firebaseApp: FirebaseApp) => {
  if (analyticsInstance) return;

  const consent = localStorage.getItem("cookie-consent");
  if (consent !== "accepted") return;

  analyticsInstance = getAnalytics(firebaseApp);
};

if (typeof window !== "undefined") {
  const initOnReady = () => {
    initializeAppCheckIfConsented(app);
    initializeAnalyticsIfConsented(app);
  };

  // Defer initialization until DOM is fully loaded to avoid
  // "reCAPTCHA placeholder element must be an element or id" errors
  if (document.readyState === "complete") {
    initOnReady();
  } else {
    window.addEventListener("load", initOnReady, { once: true });
  }

  // Listen for consent changes
  window.addEventListener("cookie-consent-changed", (event) => {
    const detail = (event as CustomEvent).detail;
    if (detail === "accepted") {
      initializeAppCheckIfConsented(app);
      initializeAnalyticsIfConsented(app);
    }
  });
}

// Initialize Functions
const functions = getFunctions(app);

// Connect to emulator in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

// Callable function for form submission
export const subscribe = httpsCallable<
  Record<string, unknown>,
  { message: string; success: boolean }
>(functions, "subscribe");
