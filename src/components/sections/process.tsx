"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const STEPS = [
  {
    number: 1,
    emoji: "☕",
    title: "שיחה קצרה, ממוקדת",
    subtitle: "30 דקות, בחינם",
    description:
      "נשב ביחד, אשמע על העסק שלך, ונאתר את התהליך שהכי כואב לך. לפני השיחה תמלא שאלון קצר כדי שנגיע ממוקדים.",
  },
  {
    number: 2,
    emoji: "📋",
    title: "תוכנית עבודה ברורה",
    subtitle: "בלי אותיות קטנות",
    description:
      "אחזור אליך עם אפיון מדויק — מה נעשה, כמה זמן ייקח, וכמה יעלה. שקוף לגמרי.",
  },
  {
    number: 3,
    emoji: "🔧",
    title: "בונים ומטמיעים",
    subtitle: "אתה מעורב בכל שלב",
    description:
      "אני בונה את הפתרון ומטמיע אותו בעסק שלך. אתה רואה, מעיר, מאשר — שום הפתעות.",
  },
  {
    number: 4,
    emoji: "🚀",
    title: "אתה רואה תוצאות",
    subtitle: "מהיום הראשון",
    description:
      "התהליך שגנב לך שעות — עובד לבד. אתה רואה את השינוי מיד ומחליט אם ואיך להמשיך.",
  },
];

export function Process() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <section id="process" className="py-20 md:py-28 relative">
      {/* Section divider top */}
      <div className="section-divider mb-20 md:mb-28" aria-hidden="true" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={animate ? { opacity: 0, y: 20 } : false}
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
            תהליך פשוט
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold",
              "text-light-text dark:text-dark-text"
            )}
          >
            ארבעה צעדים, אפס כאבי ראש
          </h2>
        </motion.div>

        {/* Steps grid — horizontal on desktop */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              className={cn(
                "relative group rounded-2xl p-6 text-center",
                "bg-white/70 dark:bg-white/[0.04]",
                "border border-light-border dark:border-dark-border",
                "backdrop-blur-sm",
                "hover-lift hover:border-brand/20 dark:hover:border-brand-lighter/15"
              )}
              initial={animate ? { opacity: 0, y: 25 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Step number badge */}
              <div
                className={cn(
                  "absolute -top-3 right-5",
                  "w-7 h-7 rounded-full flex items-center justify-center",
                  "bg-brand text-white text-xs font-bold",
                  "shadow-md shadow-brand/25"
                )}
              >
                {step.number}
              </div>

              {/* Emoji */}
              <div className="text-4xl mt-2 mb-4">{step.emoji}</div>

              {/* Title */}
              <h3
                className={cn(
                  "text-lg font-bold mb-1",
                  "text-light-text dark:text-dark-text"
                )}
              >
                {step.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xs font-medium text-brand dark:text-brand-lighter mb-3">
                {step.subtitle}
              </p>

              {/* Description */}
              <p
                className={cn(
                  "text-sm leading-relaxed",
                  "text-light-text-secondary dark:text-dark-text-secondary"
                )}
              >
                {step.description}
              </p>

              {/* Connector arrow (hidden on last item and mobile) */}
              {index < STEPS.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 -left-3 -translate-y-1/2 text-brand/30"
                  aria-hidden="true"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M0 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          className="text-center mt-14 md:mt-16"
          initial={animate ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p
            className={cn(
              "text-base md:text-lg max-w-3xl mx-auto leading-relaxed",
              "text-light-text-secondary dark:text-dark-text-secondary"
            )}
          >
            אני מאמין שאתה צריך לראות תוצאות אמיתיות{" "}
            <span className="font-semibold text-light-text dark:text-dark-text">
              לפני שאתה מתחייב.
            </span>{" "}
            בלי חבילות ענק, בלי עסקאות מסובכות. תהליך אחד, תוצאה אחת.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
