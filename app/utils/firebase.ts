"use client";

import { initializeApp, getApps } from "firebase/app";
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

// Initialize App Check with reCAPTCHA Enterprise
const RECAPTCHA_SITE_KEY = "6LeQq18sAAAAAEbwUGnt9vdMjesm24tJrLFZ-f8l";

if (typeof window !== "undefined") {
  // Enable debug token for local development
  if (process.env.NODE_ENV === "development") {
    // @ts-expect-error - Firebase debug token for local development
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  initializeAppCheck(app, {
    isTokenAutoRefreshEnabled: true,
    provider: new ReCaptchaEnterpriseProvider(RECAPTCHA_SITE_KEY),
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
