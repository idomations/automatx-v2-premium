"use client";

import { motion, useReducedMotion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  id,
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

interface StaggerChildProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  delayBase?: number;
}

export function StaggerChild({
  children,
  className,
  index,
  delayBase = 0.15,
}: StaggerChildProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.5,
        delay: prefersReducedMotion ? 0 : index * delayBase,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
