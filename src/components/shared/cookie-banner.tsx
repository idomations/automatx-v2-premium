"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { COOKIE_CONSENT_KEY } from "@/lib/analytics";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const storedConsent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!storedConsent) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function handleConsent(value: "accepted" | "declined") {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
      window.dispatchEvent(new Event("cookie-consent-updated"));
    } catch {
      // Ignore storage errors and hide banner to avoid blocking UX.
    }
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="העדפות עוגיות"
      className={cn(
        "fixed bottom-4 inset-x-4 md:inset-x-auto md:start-4 md:max-w-lg z-[70]",
        "rounded-2xl border border-brand/20 p-4 shadow-xl backdrop-blur-md",
        "bg-light-bg-secondary/95 dark:bg-dark-bg-secondary/95"
      )}
    >
      <p className="text-sm text-light-text dark:text-dark-text leading-relaxed">
        האתר משתמש בעוגיות חיוניות לשיפור חוויית הגלישה ומדידה בסיסית. המשך
        שימוש מהווה הסכמה בהתאם ל{" "}
        <Link href="/privacy" className="text-brand underline underline-offset-2">
          מדיניות הפרטיות
        </Link>{" "}
        ול{" "}
        <Link href="/terms" className="text-brand underline underline-offset-2">
          תנאי השימוש
        </Link>
        .
      </p>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleConsent("accepted")}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-semibold",
            "bg-brand text-white hover:bg-brand-light transition-colors"
          )}
        >
          מאשר
        </button>
        <button
          type="button"
          onClick={() => handleConsent("declined")}
          className={cn(
            "px-4 py-2 rounded-xl text-sm",
            "border border-brand/30 text-light-text dark:text-dark-text",
            "hover:bg-brand/10 transition-colors"
          )}
        >
          דוחה
        </button>
      </div>
    </div>
  );
}
