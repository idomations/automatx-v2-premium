"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CTAButton } from "@/components/shared/cta-button";
import { cn } from "@/lib/cn";

/* ============================================================
   Floating Orbs — large blurred circles that drift behind content
   ============================================================ */
function FloatingOrbs({ animate }: { animate: boolean }) {
  const orbs = [
    {
      className: "top-[10%] right-[15%] w-[420px] h-[420px]",
      gradient: "radial-gradient(circle, rgb(79 70 229 / 0.3), transparent 70%)",
      motion: { x: [0, 40, -20, 0], y: [0, -30, 15, 0], scale: [1, 1.15, 0.95, 1] },
      duration: 16,
    },
    {
      className: "bottom-[20%] left-[10%] w-[360px] h-[360px]",
      gradient: "radial-gradient(circle, rgb(99 102 241 / 0.25), transparent 70%)",
      motion: { x: [0, -35, 25, 0], y: [0, 25, -40, 0], scale: [1, 0.85, 1.1, 1] },
      duration: 19,
    },
    {
      className: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]",
      gradient: "radial-gradient(circle, rgb(129 140 248 / 0.15), transparent 70%)",
      motion: { scale: [1, 1.25, 1] },
      duration: 13,
    },
    {
      className: "bottom-[5%] right-[25%] w-[200px] h-[200px]",
      gradient: "radial-gradient(circle, rgb(245 158 11 / 0.12), transparent 70%)",
      motion: { x: [0, 20, -15, 0], y: [0, -20, 10, 0] },
      duration: 10,
    },
  ];

  return (
    <>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={cn("absolute rounded-full blur-[100px]", orb.className)}
          style={{ background: orb.gradient }}
          animate={animate ? orb.motion : { opacity: 0.3 }}
          transition={
            animate
              ? { duration: orb.duration, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 }
          }
        />
      ))}
    </>
  );
}

/* ============================================================
   Grid pattern background with fade
   ============================================================ */
function GridPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgb(79 70 229 / 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgb(79 70 229 / 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial fade to hide grid edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-light-bg dark:to-dark-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-light-bg)_80%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-dark-bg)_80%)]" />
    </div>
  );
}

/* ============================================================
   Orbiting particles (small dots circling a center point)
   ============================================================ */
function OrbitingDots({ animate }: { animate: boolean }) {
  if (!animate) return null;
  const dots = [
    { size: 4, radius: 140, duration: 18, delay: 0, opacity: 0.5 },
    { size: 3, radius: 200, duration: 24, delay: 2, opacity: 0.3 },
    { size: 5, radius: 100, duration: 14, delay: 5, opacity: 0.4 },
    { size: 3, radius: 260, duration: 30, delay: 8, opacity: 0.25 },
  ];

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-brand"
          style={{
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
          }}
          animate={{
            rotate: [0, 360],
            x: [dot.radius, dot.radius],
          }}
          transition={{
            rotate: { duration: dot.duration, repeat: Infinity, ease: "linear", delay: dot.delay },
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   Stats counter row
   ============================================================ */
const STATS = [
  { value: "200+", label: "תהליכים אוטומטיים" },
  { value: "5K+", label: "שעות נחסכו" },
  { value: "98%", label: "שביעות רצון" },
];

function StatsRow({ animate }: { animate: boolean }) {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mt-14 md:mt-16"
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
    >
      {STATS.map((stat, i) => (
        <div key={i} className="text-center">
          <div className={cn(
            "text-3xl md:text-4xl font-black",
            "text-gradient-brand"
          )}>
            {stat.value}
          </div>
          <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ============================================================
   Hero component
   ============================================================ */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-subtle via-light-bg to-light-bg dark:from-dark-bg-secondary dark:via-dark-bg dark:to-dark-bg" />
        {/* Grid pattern */}
        <GridPattern />
        {/* Floating orbs */}
        <FloatingOrbs animate={animate} />
        {/* Orbiting particles */}
        <OrbitingDots animate={animate} />
        {/* Noise overlay */}
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 text-center">
        {/* Badge */}
        <motion.div
          className="mb-6"
          initial={animate ? { opacity: 0, scale: 0.9 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
              "bg-brand-subtle/80 text-brand border border-brand/10 backdrop-blur-sm",
              "dark:bg-brand-darker/40 dark:text-brand-lighter dark:border-brand-lighter/15"
            )}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
            </span>
            מחברים טכנולוגיה לתוצאות עסקיות
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className={cn(
            "text-4xl md:text-6xl lg:text-7xl font-black leading-[1.15] tracking-tight",
            "text-light-text dark:text-dark-text"
          )}
          initial={animate ? { opacity: 0, y: 30 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <span className="block">התהליכים שלך</span>
          <span className="block mt-2">
            יכולים לעבוד{" "}
            <span className="text-gradient-shine">בלעדיך.</span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className={cn(
            "mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed",
            "text-light-text-secondary dark:text-dark-text-secondary"
          )}
          initial={animate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          אנחנו בונים אוטומציות וסוכני AI שמחליפים עבודה ידנית
          <br className="hidden md:block" />
          בתהליכים שעובדים לבד — ומשחררים לך זמן לצמיחה.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={animate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        >
          <CTAButton href="/booking" variant="primary" size="large">
            בוא נדבר — 30 דקות, בחינם
          </CTAButton>
          <CTAButton href="#process" variant="secondary" size="large">
            איך זה עובד?
          </CTAButton>
        </motion.div>

        {/* Stats */}
        <StatsRow animate={animate} />
      </div>

      {/* Scroll indicator */}
      {animate && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-7 h-11 rounded-full border-2 border-brand/30 flex items-start justify-center p-2"
            aria-hidden="true"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-brand"
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
