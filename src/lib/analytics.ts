declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const COOKIE_CONSENT_KEY = "automatx_cookie_consent_v1";

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}
