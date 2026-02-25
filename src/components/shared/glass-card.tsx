"use client";

import { cn } from "@/lib/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  variant?: "default" | "brand" | "subtle";
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  variant = "default",
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "backdrop-blur-md",
        variant === "default" && [
          "bg-white/70 dark:bg-white/[0.04]",
          "border border-light-border dark:border-dark-border",
        ],
        variant === "brand" && [
          "bg-gradient-to-br from-brand-subtle/80 to-white/60",
          "dark:from-brand-darker/30 dark:to-white/[0.03]",
          "border border-brand/10 dark:border-brand-lighter/10",
        ],
        variant === "subtle" && [
          "bg-light-bg-secondary/60 dark:bg-white/[0.03]",
          "border border-light-border/50 dark:border-dark-border/50",
        ],
        hoverEffect && [
          "hover-lift",
          "hover:border-brand/25 dark:hover:border-brand-lighter/20",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}
