"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        // Handle 404 (endpoint not yet deployed) gracefully
        if (res.status === 404) {
          throw new Error("שירות ההרשמה אינו זמין כרגע, נסו שוב מאוחר יותר");
        }
        const data = await res.json().catch(() => ({ error: "שגיאה בהרשמה" }));
        throw new Error(data.error || "שגיאה בהרשמה");
      }

      setStatus("success");
      setEmail("");
      trackEvent("newsletter_subscribe", { source: "footer" });
    } catch (err) {
      setStatus("error");
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        // Network error / endpoint doesn't exist
        setErrorMessage("שירות ההרשמה אינו זמין כרגע, נסו שוב מאוחר יותר");
      } else {
        setErrorMessage(
          err instanceof Error ? err.message : "שגיאה בהרשמה, נסו שוב"
        );
      }
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-brand font-medium">
        נרשמת בהצלחה! תודה.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="כתובת אימייל"
          required
          dir="ltr"
          className="flex-1 px-4 py-2.5 text-sm bg-light-bg-secondary dark:bg-dark-bg-secondary border border-brand/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/30 placeholder:text-light-text-secondary/50 dark:placeholder:text-dark-text-secondary/50 text-light-text dark:text-dark-text"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2.5 text-sm font-semibold bg-brand text-white rounded-xl hover:bg-brand-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "..." : "הרשמה"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-400">{errorMessage}</p>
      )}
    </form>
  );
}
