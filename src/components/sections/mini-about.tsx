"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CTAButton } from "@/components/shared/cta-button";
import { cn } from "@/lib/cn";

export function MiniAbout() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-subtle/30 to-transparent dark:via-brand-darker/10 pointer-events-none" aria-hidden="true" />

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
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
            קצת עליי
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold",
              "text-light-text dark:text-dark-text"
            )}
          >
            מי עומד מאחורי אוטומטX?
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Photo */}
          <motion.div
            className="order-2 md:order-1 flex justify-center"
            initial={animate ? { opacity: 0, scale: 0.95 } : false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Decorative ring */}
              <div
                className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-brand/20 via-brand-lighter/10 to-transparent blur-sm"
                aria-hidden="true"
              />
              <div
                className={cn(
                  "relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden",
                  "border-2 border-brand/15 dark:border-brand-lighter/10",
                  "shadow-xl shadow-brand/10"
                )}
              >
                <Image
                  src="/images/ido.jpg"
                  alt="עידו - מייסד AutomatX"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="order-1 md:order-2"
            initial={animate ? { opacity: 0, x: 30 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              className={cn(
                "text-lg leading-relaxed mb-4",
                "text-light-text-secondary dark:text-dark-text-secondary"
              )}
            >
              שלום, אני <span className="font-bold text-light-text dark:text-dark-text">עידו</span>. הדרך שלי לעולם האוטומציה התחילה כשהקמתי מיזם
              התנדבותי שצמח ל-50 סניפים בכל הארץ.
            </p>
            <p
              className={cn(
                "text-lg leading-relaxed mb-6",
                "text-light-text-secondary dark:text-dark-text-secondary"
              )}
            >
              הבנתי שהמפתח לצמיחה הוא לא
              עוד שעות עבודה &ndash; אלא{" "}
              <span className="font-bold text-brand dark:text-brand-lighter">תהליכים חכמים</span>.
              היום אני עוזר לבעלי עסקים לעשות בדיוק את זה.
            </p>

            <CTAButton href="/about" variant="secondary">
              הסיפור המלא &larr;
            </CTAButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
