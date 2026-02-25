"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  className,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", "mb-12 md:mb-16", className)}>
      {badge && (
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide",
              "bg-brand-subtle text-brand border border-brand/10",
              "dark:bg-brand-darker/40 dark:text-brand-lighter dark:border-brand-lighter/15"
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" aria-hidden="true" />
            {badge}
          </span>
        </motion.div>
      )}
      <motion.h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
          "text-light-text dark:text-dark-text"
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className={cn(
            "mt-5 text-lg md:text-xl max-w-3xl leading-relaxed",
            centered && "mx-auto",
            "text-light-text-secondary dark:text-dark-text-secondary"
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
