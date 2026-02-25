"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { COOKIE_CONSENT_KEY, hasAnalyticsConsent, trackEvent } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const SCROLL_THRESHOLDS = [25, 50, 75];

export function Analytics() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!GA_ID) {
      return;
    }

    const syncConsent = () => setEnabled(hasAnalyticsConsent());
    syncConsent();

    window.addEventListener("cookie-consent-updated", syncConsent);
    window.addEventListener("storage", syncConsent);

    return () => {
      window.removeEventListener("cookie-consent-updated", syncConsent);
      window.removeEventListener("storage", syncConsent);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !GA_ID) {
      return;
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
      });
    }
  }, [pathname, enabled]);

  useEffect(() => {
    if (!enabled || !GA_ID) {
      return;
    }

    const reached = new Set<number>();

    const handleScrollDepth = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        return;
      }

      const percentage = Math.round((scrollTop / docHeight) * 100);
      for (const threshold of SCROLL_THRESHOLDS) {
        if (percentage >= threshold && !reached.has(threshold)) {
          reached.add(threshold);
          trackEvent("scroll_depth", {
            percent: threshold,
            page_path: pathname,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScrollDepth, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollDepth);
  }, [pathname, enabled]);

  if (!GA_ID || !enabled) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
