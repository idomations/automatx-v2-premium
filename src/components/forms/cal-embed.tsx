"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";

// Minimal type for the Cal.com embed global
declare global {
  interface Window {
    Cal?: ((...args: unknown[]) => void) & {
      loaded?: boolean;
      ns?: Record<string, unknown>;
      q?: unknown[][];
    };
  }
}

interface CalEmbedProps {
  /** Cal.com event link, e.g. "ido/yeutz-chinam" */
  calLink: string;
  /** URL to redirect to after a successful booking */
  successRedirectUrl?: string;
  className?: string;
}

export function CalEmbed({ calLink, successRedirectUrl, className }: CalEmbedProps) {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const initedRef = useRef(false);

  useEffect(() => {
    if (initedRef.current || !containerRef.current) return;
    initedRef.current = true;

    // Bootstrap the Cal global queue (mirrors the official embed snippet)
    (function (C: Window) {
      if (!C.Cal) {
        const q: unknown[][] = [];
        const cal = ((...args: unknown[]) => {
          q.push(args);
        }) as Window["Cal"];
        cal!.q = q;
        cal!.loaded = false;
        C.Cal = cal;
      }
    })(window);

    // Load embed.js only once per page
    if (!document.querySelector('script[data-calcom-embed]')) {
      const s = document.createElement("script");
      s.src = "https://app.cal.com/embed/embed.js";
      s.async = true;
      s.setAttribute("data-calcom-embed", "1");
      document.head.appendChild(s);
    }

    const theme = resolvedTheme === "dark" ? "dark" : "light";

    window.Cal?.("init", { origin: "https://cal.com" });

    window.Cal?.("inline", {
      elementOrSelector: containerRef.current,
      calLink,
      layout: "month_view",
    });

    window.Cal?.("ui", {
      theme,
      styles: { branding: { brandColor: "#C8A96E" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });

    if (successRedirectUrl) {
      window.Cal?.("on", {
        action: "bookingSuccessful",
        callback: () => {
          window.location.href = successRedirectUrl;
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("w-full min-h-[680px] overflow-auto rounded-xl", className)}
    />
  );
}
