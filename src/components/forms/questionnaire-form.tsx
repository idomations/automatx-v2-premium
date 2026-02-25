"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type FormStatus = "idle" | "loading" | "success" | "error";

interface QuestionnaireFormProps {
  bookingId: string;
}

const TEAM_SIZE_OPTIONS = [
  { value: "", label: "בחר..." },
  { value: "solo", label: "רק אני" },
  { value: "2-5", label: "2-5" },
  { value: "6-20", label: "6-20" },
  { value: "20+", label: "20+" },
];

const TIME_WASTE_OPTIONS = [
  { value: "", label: "בחר..." },
  { value: "less-than-1h", label: "פחות משעה" },
  { value: "1-3h", label: "1-3 שעות" },
  { value: "3-5h", label: "3-5 שעות" },
  { value: "5h+", label: "יותר מ-5 שעות" },
  { value: "a-lot", label: "הרבה" },
];

export function QuestionnaireForm({ bookingId }: QuestionnaireFormProps) {
  const [formData, setFormData] = useState({
    businessDescription: "",
    teamSize: "",
    painfulProcess: "",
    currentHandling: "",
    weeklyTimeWaste: "",
    existingSystems: "",
    additionalNotes: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    setStatus("loading");

    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          ...formData,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "שגיאה בשליחה" }));
        throw new Error(data.error || "שגיאה בשליחת השאלון");
      }

      setStatus("success");
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
          תודה! נתראה בפגישה
        </h3>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          קיבלתי את התשובות שלך. נשתמש בהן כדי להכין פגישה ממוקדת ואפקטיבית.
        </p>
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Q1 */}
      <div>
        <label htmlFor="q-businessDescription" className={labelClasses}>
          מה העסק שלך עושה?
        </label>
        <textarea
          id="q-businessDescription"
          name="businessDescription"
          value={formData.businessDescription}
          onChange={handleChange}
          placeholder="תאר בקצרה את העסק שלך..."
          rows={3}
          className={cn(inputClasses, "resize-none")}
        />
      </div>

      {/* Q2 */}
      <div>
        <label htmlFor="q-teamSize" className={labelClasses}>
          כמה אנשים עובדים בעסק?
        </label>
        <select
          id="q-teamSize"
          name="teamSize"
          value={formData.teamSize}
          onChange={handleChange}
          className={inputClasses}
        >
          {TEAM_SIZE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Q3 */}
      <div>
        <label htmlFor="q-painfulProcess" className={labelClasses}>
          מה התהליך שהכי כואב לך היום?
        </label>
        <textarea
          id="q-painfulProcess"
          name="painfulProcess"
          value={formData.painfulProcess}
          onChange={handleChange}
          placeholder="תאר את התהליך..."
          rows={3}
          className={cn(inputClasses, "resize-none")}
        />
      </div>

      {/* Q4 */}
      <div>
        <label htmlFor="q-currentHandling" className={labelClasses}>
          מה קורה היום עם התהליך הזה?
        </label>
        <textarea
          id="q-currentHandling"
          name="currentHandling"
          value={formData.currentHandling}
          onChange={handleChange}
          placeholder="איך מטפלים בזה כרגע..."
          rows={3}
          className={cn(inputClasses, "resize-none")}
        />
      </div>

      {/* Q5 */}
      <div>
        <label htmlFor="q-weeklyTimeWaste" className={labelClasses}>
          כמה זמן בערך מתבזבז בשבוע?
        </label>
        <select
          id="q-weeklyTimeWaste"
          name="weeklyTimeWaste"
          value={formData.weeklyTimeWaste}
          onChange={handleChange}
          className={inputClasses}
        >
          {TIME_WASTE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Q6 */}
      <div>
        <label htmlFor="q-existingSystems" className={labelClasses}>
          יש מערכות שהעסק כבר משתמש בהן?
        </label>
        <textarea
          id="q-existingSystems"
          name="existingSystems"
          value={formData.existingSystems}
          onChange={handleChange}
          placeholder="למשל: CRM, Google Sheets, Monday..."
          rows={3}
          className={cn(inputClasses, "resize-none")}
        />
      </div>

      {/* Q7 */}
      <div>
        <label htmlFor="q-additionalNotes" className={labelClasses}>
          עוד משהו שחשוב לך שאדע?
        </label>
        <textarea
          id="q-additionalNotes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          placeholder="כל מידע נוסף שיעזור..."
          rows={3}
          className={cn(inputClasses, "resize-none")}
        />
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
        {status === "loading" ? "שולח..." : "שלח שאלון"}
      </button>
    </form>
  );
}
