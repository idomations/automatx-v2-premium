"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CTAButton } from "@/components/shared/cta-button";
import { cn } from "@/lib/cn";

export function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/[0.04] to-brand/[0.08] dark:via-brand/[0.06] dark:to-brand/[0.12]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-lighter/[0.03] to-transparent" />
        {/* Decorative orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/[0.06] blur-[120px] dark:bg-brand/[0.1]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={animate ? { opacity: 0, y: 25 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Emoji */}
          <div className="text-5xl mb-6">💡</div>

          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-6",
              "text-light-text dark:text-dark-text"
            )}
          >
            יש לך תהליך שכואב?
            <br />
            <span className="text-gradient-brand">בוא נפתור את זה.</span>
          </h2>

          <p
            className={cn(
              "text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed",
              "text-light-text-secondary dark:text-dark-text-secondary"
            )}
          >
            פגישת היכרות של 30 דקות, בחינם, בלי התחייבות.
            <br className="hidden md:block" />
            נבין ביחד מה הדבר הראשון שכדאי לשפר בעסק שלך.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton href="/booking" variant="primary" size="large">
              קבע פגישה &larr;
            </CTAButton>
            <CTAButton href="/contact" variant="ghost" size="large">
              שלח הודעה
            </CTAButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
