"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const FAQ_ITEMS = [
  {
    question: "כמה זה עולה?",
    answer:
      "כל פרויקט מתומחר בהתאמה אישית. אחרי פגישת ההיכרות אני שולח הצעת מחיר מפורטת \u2013 בלי הפתעות ובלי עלויות נסתרות. עסקים קטנים? אני מתאים את הפתרון לתקציב.",
  },
  {
    question: "כמה זמן זה לוקח?",
    answer:
      "תלוי במורכבות. אוטומציה של תהליך בודד יכולה להיות מוכנה תוך ימים. פרויקט מורכב יותר \u2013 כמה שבועות. בפגישה נגדיר ביחד לוח זמנים ריאלי.",
  },
  {
    question: "זה מתאים לעסק בגודל שלי?",
    answer:
      "אם יש לך תהליך ידני שגונב לך זמן \u2013 זה מתאים לך. לא משנה אם אתה עצמאי עם 2 עובדים או חברה עם 50. הפתרון מותאם לגודל ולצורך.",
  },
  {
    question: "איך זה עובד בפועל?",
    answer:
      "פגישת היכרות קצרה (30 דקות, בחינם) \u2192 אפיון ותוכנית עבודה \u2192 בנייה והטמעה \u2192 אתה רואה תוצאות. אתה מעורב בכל שלב.",
  },
  {
    question: "מה ההבדל בין אוטומציה ל-AI?",
    answer:
      "אוטומציה היא כשתהליך ידני רץ לבד לפי כללים קבועים. AI הוא כשהמערכת גם \u201Cמבינה\u201D \u2013 למשל, קוראת מסמך ויודעת לחלץ ממנו מידע. בפועל, רוב הפתרונות שלי משלבים את שניהם.",
  },
];

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        "transition-all duration-300",
        isOpen
          ? "bg-brand text-white rotate-180"
          : "bg-brand-subtle text-brand dark:bg-brand-darker/40 dark:text-brand-lighter"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 md:py-28">
      {/* Section divider */}
      <div className="section-divider mb-20 md:mb-28" aria-hidden="true" />

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-4",
              "bg-brand-subtle text-brand border border-brand/10",
              "dark:bg-brand-darker/40 dark:text-brand-lighter dark:border-brand-lighter/15"
            )}
          >
            FAQ
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold",
              "text-light-text dark:text-dark-text"
            )}
          >
            שאלות נפוצות (ותשובות ישרות)
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.question}
                className={cn(
                  "rounded-2xl overflow-hidden",
                  "bg-white/70 dark:bg-white/[0.03]",
                  "border transition-all duration-300",
                  isOpen
                    ? "border-brand/20 shadow-lg shadow-brand/5 dark:border-brand-lighter/15"
                    : "border-light-border dark:border-dark-border hover:border-brand/10"
                )}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <button
                  id={`faq-question-${index}`}
                  onClick={() => toggleItem(index)}
                  className={cn(
                    "w-full flex items-center justify-between gap-4 p-5 md:p-6 text-right",
                    "transition-colors duration-200",
                    "hover:bg-brand-subtle/30 dark:hover:bg-brand-darker/20",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-inset"
                  )}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span
                    className={cn(
                      "text-base md:text-lg font-semibold",
                      "text-light-text dark:text-dark-text"
                    )}
                  >
                    {item.question}
                  </span>
                  <ChevronIcon isOpen={isOpen} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className={cn(
                          "px-5 md:px-6 pb-5 md:pb-6",
                          "text-light-text-secondary dark:text-dark-text-secondary",
                          "leading-relaxed"
                        )}
                      >
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
