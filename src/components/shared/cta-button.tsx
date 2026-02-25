"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "large";
  className?: string;
  onClick?: () => void;
  trackingLabel?: string;
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "default",
  className,
  onClick,
  trackingLabel,
}: CTAButtonProps) {
  const baseClasses =
    "btn-shine inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none cursor-pointer";

  const sizeClasses = {
    default: "px-6 py-3 text-sm gap-2",
    large: "px-8 py-4 text-base md:text-lg gap-2.5",
  };

  const variantClasses = {
    primary: cn(
      "bg-brand text-white",
      "hover:bg-brand-light hover:shadow-lg hover:shadow-brand/25",
      "dark:bg-brand-light dark:text-white",
      "dark:hover:bg-brand-lighter dark:hover:shadow-brand-lighter/20"
    ),
    secondary: cn(
      "border-2 border-brand/20 text-brand bg-brand-subtle/50",
      "hover:bg-brand/10 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/10",
      "dark:border-brand-lighter/20 dark:text-brand-lighter dark:bg-brand-darker/30",
      "dark:hover:bg-brand/15 dark:hover:border-brand-lighter/30"
    ),
    ghost: cn(
      "text-brand bg-transparent",
      "hover:bg-brand-subtle hover:text-brand-dark",
      "dark:text-brand-lighter",
      "dark:hover:bg-brand-darker/30"
    ),
  };

  const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);
  const ctaLabel = trackingLabel || href;

  function handleClick() {
    trackEvent("cta_click", { location: ctaLabel });
    onClick?.();
  }

  // Use native <a> for hash-only links to avoid Next.js router interception
  if (href.startsWith("#")) {
    return (
      <a href={href} onClick={handleClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={classes}>
      {children}
    </Link>
  );
}
