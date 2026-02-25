"use client";

import { useState } from "react";
import { leadSchema } from "@/lib/validations";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError("");

    // Client-side validation
    const result = leadSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "שגיאה בשליחה" }));
        throw new Error(data.error || "שגיאה בשליחה");
      }

      setStatus("success");
      setFormData({ name: "", phone: "", email: "", message: "" });
      trackEvent("contact_form_submit", { source: "contact_page" });
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "שגיאה בשליחה, נסו שוב"
      );
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div
          className={cn(
            "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center",
            "bg-green-100 dark:bg-green-900/30"
          )}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600 dark:text-green-400"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className={cn(
            "text-2xl font-bold mb-2",
            "text-light-text dark:text-dark-text"
          )}
        >
          הודעתך נשלחה בהצלחה!
        </h3>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          אחזור אליך בהקדם.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className={cn(
            "mt-6 px-6 py-2 text-sm font-medium rounded-xl",
            "text-brand border border-brand/30",
            "hover:bg-brand/10 transition-colors",
            "focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          )}
        >
          שלח הודעה נוספת
        </button>
      </div>
    );
  }

  const inputClasses = cn(
    "w-full px-4 py-3 text-sm rounded-xl",
    "bg-light-bg-secondary dark:bg-dark-bg-secondary",
    "border border-brand/10",
    "text-light-text dark:text-dark-text",
    "placeholder:text-light-text-secondary/50 dark:placeholder:text-dark-text-secondary/50",
    "focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/30",
    "transition-colors"
  );

  const labelClasses = cn(
    "block text-sm font-medium mb-1.5",
    "text-light-text dark:text-dark-text"
  );

  const errorClasses = "text-xs text-red-500 dark:text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="contact-name" className={labelClasses}>
          שם מלא <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="השם שלך"
          required
          className={cn(inputClasses, errors.name && "border-red-500")}
        />
        {errors.name && <p className={errorClasses}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-phone" className={labelClasses}>
          טלפון <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="050-1234567"
          dir="ltr"
          required
          className={cn(inputClasses, errors.phone && "border-red-500")}
        />
        {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClasses}>
          אימייל <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
          dir="ltr"
          required
          className={cn(inputClasses, errors.email && "border-red-500")}
        />
        {errors.email && <p className={errorClasses}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          הודעה
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="ספר לי במה אוכל לעזור..."
          rows={4}
          className={cn(inputClasses, "resize-none")}
        />
        {errors.message && <p className={errorClasses}>{errors.message}</p>}
      </div>

      {status === "error" && serverError && (
        <div
          className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          role="alert"
        >
          <p className="text-sm text-red-600 dark:text-red-400">
            {serverError}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "w-full py-3.5 text-base font-semibold rounded-xl",
          "bg-brand text-white",
          "hover:bg-brand-light hover:shadow-lg hover:shadow-brand/25",
          "hover:-translate-y-0.5",
          "transition-all duration-300",
          "focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        )}
      >
        {status === "loading" ? "שולח..." : "שלח הודעה"}
      </button>
    </form>
  );
}
