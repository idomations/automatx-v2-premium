"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  FALLBACK_PROJECTS,
  type ProjectCaseStudy,
} from "@/data/projects";

function ProjectCard({
  project,
  index,
}: {
  project: ProjectCaseStudy;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "group relative rounded-2xl overflow-hidden",
        "bg-white/70 dark:bg-white/[0.04]",
        "border border-light-border dark:border-dark-border",
        "backdrop-blur-sm",
        "hover-lift",
        "hover:border-brand/20 dark:hover:border-brand-lighter/15",
        project.size === "large"
          ? "md:col-span-2 md:row-span-2"
          : "md:col-span-1"
      )}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      {/* Top accent gradient */}
      <div
        className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand via-brand-light to-brand-lighter opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      />

      <div className="p-7 md:p-8 h-full flex flex-col">
        {/* Industry tag */}
        <span
          className={cn(
            "inline-block self-start px-3 py-1 text-xs font-semibold rounded-full mb-5",
            "bg-brand-subtle text-brand",
            "dark:bg-brand-darker/40 dark:text-brand-lighter"
          )}
        >
          {project.industry}
        </span>

        <h3
          className={cn(
            "text-xl md:text-2xl font-bold mb-5",
            "text-light-text dark:text-dark-text"
          )}
        >
          {project.title}
        </h3>

        <div className="space-y-4 flex-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-red-500 dark:text-red-400 mb-1">
              הבעיה
            </p>
            <p
              className={cn(
                "text-sm leading-relaxed",
                "text-light-text-secondary dark:text-dark-text-secondary"
              )}
            >
              {project.problem}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-lighter mb-1">
              הפתרון
            </p>
            <p
              className={cn(
                "text-sm leading-relaxed",
                "text-light-text-secondary dark:text-dark-text-secondary"
              )}
            >
              {project.solution}
            </p>
          </div>

          <div
            className={cn(
              "p-4 rounded-xl mt-2",
              "bg-green-50/80 dark:bg-green-950/20",
              "border border-green-200/50 dark:border-green-800/30"
            )}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-1">
              התוצאה
            </p>
            <p className="text-sm font-medium text-green-700 dark:text-green-300 leading-relaxed">
              {project.result}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface PortfolioProps {
  projects?: ProjectCaseStudy[];
  title?: string;
}

export function Portfolio({
  projects = FALLBACK_PROJECTS,
  title = "פרויקטים שהפכו עסקים לחכמים יותר",
}: PortfolioProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-28 relative">
      {/* Dot pattern background */}
      <div className="absolute inset-0 bg-dots pointer-events-none" aria-hidden="true" />

      <div className="relative container mx-auto px-4">
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
            Case Studies
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold",
              "text-light-text dark:text-dark-text"
            )}
          >
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
