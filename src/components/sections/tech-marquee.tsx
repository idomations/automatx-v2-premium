"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

// SVG logos as inline components
const TECHNOLOGIES: { name: string; logo: React.ReactNode }[] = [
  {
    name: "N8N",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="8" cy="20" r="6" fill="#EA4B71" />
        <circle cx="32" cy="20" r="6" fill="#EA4B71" />
        <circle cx="20" cy="20" r="6" fill="#EA4B71" />
        <line x1="14" y1="20" x2="26" y2="20" stroke="#EA4B71" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Make",
    logo: (
      <svg viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="0" y="4" width="8" height="16" rx="2" fill="#6D00CC" />
        <rect x="11" y="0" width="8" height="24" rx="2" fill="#8B00FF" />
        <rect x="22" y="4" width="8" height="16" rx="2" fill="#6D00CC" />
        <rect x="33" y="8" width="7" height="8" rx="2" fill="#9933FF" />
      </svg>
    ),
  },
  {
    name: "Zapier",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20 4L36 14V26L20 36L4 26V14L20 4Z" fill="#FF4A00" />
        <path d="M13 17H27M20 10V17M20 23V30M13 23H27" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M37.5 16.6c.9-2.5.6-5.2-.9-7.4-2.2-3.3-6.1-5-9.9-4.3C25 3 23 2 20.9 2c-3.8 0-7.2 2.4-8.4 6-2.6.5-4.8 2.1-6.1 4.4-1.9 3.3-1.4 7.4 1.1 10.2-.9 2.5-.6 5.2.9 7.4 2.2 3.3 6.1 5 9.9 4.3.7.9 1.6 1.6 2.7 2.1 1 .5 2.1.7 3.2.7 3.8 0 7.2-2.4 8.4-6 2.6-.5 4.8-2.1 6.1-4.4 1.9-3.3 1.4-7.4-1.2-10.1zm-17.4 15c-1.5 0-2.9-.5-4.1-1.4.1 0 .2-.1.2-.1l6.8-3.9c.2-.1.3-.3.3-.5v-9.6l2.9 1.7v7.7c0 3.4-2.7 6.1-6.1 6.1zm-13.1-5.6c-.7-1.3-.9-2.7-.6-4.1 0 .1.1.1.2.2l6.8 3.9c.2.1.4.1.6 0l8.3-4.8v3.4l-6.9 4c-2.9 1.7-6.7.7-8.4-2.6zm-1.7-13.2c.7-1.3 1.9-2.3 3.3-2.8v8c0 .2.1.4.3.5l8.3 4.8-2.9 1.7-6.8-3.9c-3-1.7-4-5.4-2.2-8.3zm22.5 10.3L19.5 18l-2.9-1.7v-3.4l8.3 4.8c.2.1.4.1.6 0l6.8-3.9c.1 2.7-1.3 5.2-3.5 6.7zm1.5-6.7c0-.1-.1-.1-.2-.2l-6.8-3.9c-.2-.1-.4-.1-.6 0l-8.3 4.8v-3.4l6.9-4c2.9-1.7 6.7-.7 8.4 2.6.7 1.3.9 2.8.6 4.1z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Monday",
    logo: (
      <svg viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="8" cy="12" rx="7" ry="7" fill="#FF3D57" />
        <ellipse cx="30" cy="12" rx="7" ry="7" fill="#FFCB00" />
        <ellipse cx="52" cy="12" rx="7" ry="7" fill="#00CA72" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="#25D366" />
        <path
          d="M29 23.8c-.4-.2-2.4-1.2-2.8-1.3-.4-.2-.7-.2-.9.2-.3.4-1.1 1.3-1.3 1.6-.2.3-.5.3-.9.1-.4-.2-1.7-.6-3.3-2-1.2-1.1-2-2.5-2.3-2.9-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.6.1-.2 0-.5-.1-.7-.1-.2-.9-2.2-1.2-3-.3-.7-.7-.6-.9-.6h-.8c-.3 0-.7.1-1.1.5-.4.4-1.4 1.3-1.4 3.3 0 2 1.4 3.8 1.6 4.1.2.3 2.8 4.2 6.8 5.9 4 1.7 4 1.1 4.7 1 .7-.1 2.4-.9 2.7-1.8.3-.9.3-1.6.2-1.8z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "Google Sheets",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="8" y="2" width="24" height="36" rx="2" fill="#0F9D58" />
        <rect x="8" y="2" width="14" height="12" rx="2" fill="#27A668" />
        <rect x="22" y="2" width="10" height="10" rx="1" fill="#F1F1F1" />
        <rect x="12" y="18" width="16" height="2" rx="1" fill="white" opacity="0.8" />
        <rect x="12" y="23" width="16" height="2" rx="1" fill="white" opacity="0.8" />
        <rect x="12" y="28" width="10" height="2" rx="1" fill="white" opacity="0.8" />
        <line x1="20" y1="18" x2="20" y2="32" stroke="white" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M21.5 4L6 23.5H22.5V36L37 16.5H20.5V4H21.5Z"
          fill="url(#supabase-gradient)"
          stroke="#3ECF8E"
          strokeWidth="1"
        />
        <defs>
          <linearGradient id="supabase-gradient" x1="6" y1="4" x2="37" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3ECF8E" />
            <stop offset="1" stopColor="#1C7A4A" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Python",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M20 3C12 3 12.5 6.5 12.5 6.5V10H20.1H27.5V11.5C27.5 11.5 32 11 32 17.5C32 24 27.5 23.5 27.5 23.5H12.5V27.5C12.5 27.5 12 37 20 37C28 37 27.5 33.5 27.5 33.5V30H20H12.5V28.5C12.5 28.5 8 29 8 22.5C8 16 12.5 16.5 12.5 16.5H27.5V12.5C27.5 12.5 28 3 20 3Z"
          fill="#3776AB"
        />
        <path
          d="M20 37C28 37 27.5 33.5 27.5 33.5V30H20"
          fill="#FFD43B"
        />
        <circle cx="16.5" cy="7.5" r="1.5" fill="white" />
        <circle cx="23.5" cy="32.5" r="1.5" fill="#3776AB" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20 6L36 34H4L20 6Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Airtable",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="4" y="4" width="32" height="14" rx="3" fill="#FCB400" />
        <rect x="4" y="22" width="14" height="14" rx="3" fill="#18BFFF" />
        <rect x="22" y="22" width="14" height="14" rx="3" fill="#F82B60" />
        <path d="M16 10H28" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 10H14" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="20" cy="12" rx="14" ry="8" fill="#336791" />
        <path d="M6 12V28C6 32.4 12.3 36 20 36C27.7 36 34 32.4 34 28V12" stroke="#336791" strokeWidth="2.5" />
        <ellipse cx="20" cy="12" rx="14" ry="8" fill="#336791" />
        <ellipse cx="20" cy="12" rx="11" ry="5" fill="#5B9BD5" opacity="0.5" />
        <path d="M27 8C27 8 30 16 28 20C26 24 24 22 24 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
];

function TechBadge({ name, logo }: { name: string; logo: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 px-5 py-3 mx-3 rounded-2xl font-semibold whitespace-nowrap",
        "bg-white/70 dark:bg-white/[0.04]",
        "border border-light-border dark:border-dark-border",
        "text-light-text dark:text-dark-text",
        "transition-all duration-300 cursor-default",
        "hover:border-brand/30 hover:bg-brand-subtle/50 hover:shadow-md hover:shadow-brand/8",
        "dark:hover:border-brand-lighter/20 dark:hover:bg-brand-darker/30",
        "hover:-translate-y-0.5"
      )}
    >
      <span className="w-7 h-7 flex-shrink-0">
        {logo}
      </span>
      <span className="text-base">{name}</span>
    </span>
  );
}

export function TechMarquee() {
  const items = [...TECHNOLOGIES, ...TECHNOLOGIES];
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          className="text-center"
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
            Tech Stack
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold",
              "text-light-text dark:text-dark-text"
            )}
          >
            הכלים שעושים את העבודה
          </h2>
        </motion.div>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-light-bg dark:from-dark-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-light-bg dark:from-dark-bg to-transparent z-10 pointer-events-none" />

        <div className="flex marquee-track" role="marquee" aria-label="טכנולוגיות שאנחנו עובדים איתן">
          <div className="flex animate-marquee">
            {items.map((tech, index) => (
              <TechBadge key={`${tech.name}-${index}`} name={tech.name} logo={tech.logo} />
            ))}
          </div>
          <div className="flex animate-marquee" aria-hidden="true">
            {items.map((tech, index) => (
              <TechBadge key={`${tech.name}-dup-${index}`} name={tech.name} logo={tech.logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
