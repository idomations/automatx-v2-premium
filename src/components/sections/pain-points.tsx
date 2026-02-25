"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const PAIN_POINTS = [
  {
    emoji: "⏰",
    title: "שעות על דברים שמחשב יכול לעשות ב-3 שניות",
    description:
      "העובדים שלך מעתיקים נתונים מטבלה לטבלה, שולחים מיילים ידנית, ומכינים דוחות שאף אחד לא קורא — במקום לעשות את מה שבאמת מניע את העסק.",
    metric: "5+ שעות",
    metricLabel: "ממוצע שבועי על עבודה ידנית חוזרת",
  },
  {
    emoji: "💸",
    title: "לקוחות שנעלמים כי לא חזרת בזמן",
    description:
      "פנייה שנשכחה, הצעת מחיר שהתעכבה, follow-up שלא יצא. כל דקה שעוברת — הלקוח מתקרר, והמתחרה מתחמם.",
    metric: "67%",
    metricLabel: "מהלידים הולכים למתחרה שעונה ראשון",
  },
  {
    emoji: "🔥",
    title: "כאוס ששורף אותך — ואתה כבר התרגלת",
    description:
      "הודעות בוואטסאפ, ניירת בתיקיות, חשבוניות בדרכן, הזמנות שנתקעו. אתה יודע שיש דרך טובה יותר — אבל אין לך זמן לחפש אותה.",
    metric: "3 מערכות",
    metricLabel: "שלא מדברות אחת עם השנייה",
  },
];

export function PainPoints() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" aria-hidden="true" />

      <div className="relative container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-4",
              "bg-red-50 text-red-600 border border-red-200/50",
              "dark:bg-red-950/30 dark:text-red-400 dark:border-red-800/30"
            )}
          >
            בעיות שמכירים
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold",
              "text-light-text dark:text-dark-text"
            )}
          >
            מזהה את עצמך?
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {PAIN_POINTS.map((point, index) => (
            <motion.div
              key={point.title}
              className={cn(
                "group relative rounded-2xl p-7 md:p-8",
                "bg-white/70 dark:bg-white/[0.04]",
                "border border-light-border dark:border-dark-border",
                "backdrop-blur-sm",
                "hover-lift",
                "hover:border-brand/20 dark:hover:border-brand-lighter/15"
              )}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-brand/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              {/* Emoji */}
              <div className="text-4xl mb-4">{point.emoji}</div>

              {/* Title */}
              <h3
                className={cn(
                  "text-lg md:text-xl font-bold mb-3 leading-snug",
                  "text-light-text dark:text-dark-text"
                )}
              >
                {point.title}
              </h3>

              {/* Description */}
              <p
                className={cn(
                  "text-sm leading-relaxed mb-5",
                  "text-light-text-secondary dark:text-dark-text-secondary"
                )}
              >
                {point.description}
              </p>

              {/* Metric highlight */}
              <div
                className={cn(
                  "flex items-center gap-3 pt-4",
                  "border-t border-light-border/50 dark:border-dark-border/50"
                )}
              >
                <span className="text-2xl font-black text-brand dark:text-brand-lighter">
                  {point.metric}
                </span>
                <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary leading-tight">
                  {point.metricLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          className={cn(
            "text-center mt-12 text-base md:text-lg max-w-2xl mx-auto leading-relaxed",
            "text-light-text-secondary dark:text-dark-text-secondary"
          )}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          אם זיהית את עצמך — אתה לא לבד.{" "}
          <span className="font-semibold text-light-text dark:text-dark-text">
            רוב בעלי העסקים שפונים אלינו מתחילים בדיוק מפה.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
