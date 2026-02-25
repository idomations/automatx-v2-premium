"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            id="mobile-navigation"
            className={cn(
              "fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden",
              "bg-light-bg-secondary dark:bg-dark-bg-secondary",
              "border-l border-light-border dark:border-dark-border"
            )}
          >
            <div className="flex flex-col h-full pt-20 px-6">
              <nav className="flex flex-col gap-1" aria-label="תפריט מובייל">
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "block px-4 py-3 text-lg font-medium rounded-xl transition-colors",
                        "text-light-text-secondary dark:text-dark-text-secondary",
                        "hover:text-brand hover:bg-brand-subtle/50",
                        "dark:hover:text-brand-lighter dark:hover:bg-brand-darker/30"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="mt-8 px-4">
                <Link
                  href="/booking"
                  onClick={() => {
                    trackEvent("cta_click", { location: "navbar_mobile" });
                    onClose();
                  }}
                  className={cn(
                    "block w-full text-center px-5 py-3 text-base font-semibold rounded-xl transition-colors",
                    "bg-brand text-white hover:bg-brand-light"
                  )}
                >
                  קבע פגישה
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
