"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        aria-label="ניווט ראשי"
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-light-border/50 dark:border-dark-border/50 shadow-sm shadow-brand/5"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                "bg-brand text-white font-bold text-sm",
                "group-hover:bg-brand-light transition-colors duration-200",
                "shadow-md shadow-brand/25"
              )}>
                A
              </div>
              <span className="text-xl font-bold text-light-text dark:text-dark-text">
                {SITE_CONFIG.nameHe}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200",
                    "text-light-text-secondary dark:text-dark-text-secondary",
                    "hover:text-brand hover:bg-brand-subtle/50",
                    "dark:hover:text-brand-lighter dark:hover:bg-brand-darker/30"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* CTA Button - Desktop */}
              <Link
                href="/booking"
                onClick={() => trackEvent("cta_click", { location: "navbar_desktop" })}
                className={cn(
                  "hidden md:inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl",
                  "bg-brand text-white",
                  "hover:bg-brand-light hover:shadow-lg hover:shadow-brand/20",
                  "transition-all duration-300 hover:-translate-y-0.5"
                )}
              >
                קבע פגישה
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-brand-subtle/50 dark:hover:bg-brand-darker/30 transition-colors"
                aria-label="תפריט ניווט"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {mobileOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
