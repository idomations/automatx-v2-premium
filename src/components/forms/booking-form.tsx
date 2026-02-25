"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { bookingSchema } from "@/lib/validations";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  timeSlot?: string;
}

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export function BookingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  // Calculate minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const result = bookingSchema.safeParse(formData);
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
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "שגיאה בשליחה" }));
        throw new Error(data.error || "שגיאה בקביעת הפגישה");
      }

      const data = await res.json();
      setStatus("success");
      trackEvent("booking_created", { source: "booking_page" });
      router.push(`/questionnaire?bookingId=${data.bookingId}`);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "שגיאה בקביעת הפגישה, נסו שוב"
      );
    }
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
        <label htmlFor="booking-name" className={labelClasses}>
          שם מלא <span className="text-red-500">*</span>
        </label>
        <input
          id="booking-name"
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
        <label htmlFor="booking-email" className={labelClasses}>
          אימייל <span className="text-red-500">*</span>
        </label>
        <input
          id="booking-email"
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
        <label htmlFor="booking-phone" className={labelClasses}>
          טלפון <span className="text-red-500">*</span>
        </label>
        <input
          id="booking-phone"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-date" className={labelClasses}>
            תאריך <span className="text-red-500">*</span>
          </label>
          <input
            id="booking-date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            min={minDate}
            required
            dir="ltr"
            className={cn(inputClasses, errors.date && "border-red-500")}
          />
          {errors.date && <p className={errorClasses}>{errors.date}</p>}
        </div>

        <div>
          <label htmlFor="booking-timeSlot" className={labelClasses}>
            שעה <span className="text-red-500">*</span>
          </label>
          <select
            id="booking-timeSlot"
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            required
            className={cn(inputClasses, errors.timeSlot && "border-red-500")}
          >
            <option value="" disabled>
              בחר שעה
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.timeSlot && (
            <p className={errorClasses}>{errors.timeSlot}</p>
          )}
        </div>
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
        {status === "loading" ? "קובע פגישה..." : "קבע פגישה"}
      </button>
    </form>
  );
}
