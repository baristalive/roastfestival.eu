"use client";

import { useState, useEffect, useSyncExternalStore, useCallback } from "react";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";

const COOKIE_CONSENT_KEY = "cookie-consent";

export type ConsentStatus = "accepted" | "declined" | null;

export const getConsentStatus = (): ConsentStatus => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (stored === "accepted" || stored === "declined") return stored;
  return null;
};

export const showCookieConsentPopup = () => {
  window.dispatchEvent(new CustomEvent("show-cookie-consent"));
};

export const resetCookieConsent = () => {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.dispatchEvent(
    new CustomEvent("cookie-consent-changed", { detail: null }),
  );
};

export const acceptCookieConsent = () => {
  localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
  window.dispatchEvent(
    new CustomEvent("cookie-consent-changed", { detail: "accepted" }),
  );
};

// Subscribe to consent changes via custom events
export const subscribeToConsent = (callback: () => void) => {
  window.addEventListener("cookie-consent-changed", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("cookie-consent-changed", callback);
    window.removeEventListener("storage", callback);
  };
};

export const CookieConsent = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  // Use useSyncExternalStore to read consent status safely
  const consentStatus = useSyncExternalStore(
    subscribeToConsent,
    getConsentStatus,
    () => null, // Server snapshot - always null
  );

  // Track if popup should be shown (separate from consent status for manual show)
  const [forceShow, setForceShow] = useState(false);
  // Track if user has scrolled past the header
  const [hasScrolledPastHeader, setHasScrolledPastHeader] = useState(false);

  // Listen for scroll to show consent after header
  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 80% of viewport height (header)
      const scrollThreshold = window.innerHeight * 0.8;
      if (window.scrollY > scrollThreshold) {
        setHasScrolledPastHeader(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for requests to show the consent popup (force show bypasses scroll check)
  useEffect(() => {
    const handleShowConsent = () => {
      setForceShow(true);
    };

    window.addEventListener("show-cookie-consent", handleShowConsent);
    return () =>
      window.removeEventListener("show-cookie-consent", handleShowConsent);
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setForceShow(false);
    // Dispatch event to notify other components (like Firebase)
    window.dispatchEvent(
      new CustomEvent("cookie-consent-changed", { detail: "accepted" }),
    );
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setForceShow(false);
    window.dispatchEvent(
      new CustomEvent("cookie-consent-changed", { detail: "declined" }),
    );
  }, []);

  // Show if: (no consent given AND scrolled past header) OR forced to show
  const shouldShow =
    (consentStatus === null && hasScrolledPastHeader) || forceShow;

  if (!shouldShow) return null;

  const cookieConsent = lang?.cookieConsent || {
    accept: "Accept",
    decline: "Decline",
    message: "We use cookies for analytics and to protect our forms from spam.",
  };

  return (
    <div className="fixed right-0 bottom-0 z-50 p-4 md:p-6">
      <div className="punk-border pop-shadow mx-auto flex max-w-2xl flex-col items-center gap-4 bg-white p-4 md:gap-6">
        <p className="text-sm text-black md:text-base">
          {cookieConsent.message}
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="font-display cursor-pointer px-4 py-2 text-sm font-bold tracking-wider text-black uppercase transition-colors hover:bg-black/10"
          >
            {cookieConsent.decline}
          </button>
          <button
            onClick={handleAccept}
            className="font-display bg-primary hover:bg-primary/90 cursor-pointer px-4 py-2 text-sm font-bold tracking-wider text-white uppercase transition-colors"
          >
            {cookieConsent.accept}
          </button>
        </div>
      </div>
    </div>
  );
};
