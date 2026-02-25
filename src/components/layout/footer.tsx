import Link from "next/link";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { cn } from "@/lib/cn";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "border-t border-light-border dark:border-dark-border",
      "bg-light-bg-secondary/50 dark:bg-dark-bg-secondary/50"
    )}>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1: Brand + Navigation */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center",
                "bg-brand text-white font-bold text-xs",
                "shadow-md shadow-brand/20"
              )}>
                A
              </div>
              <span className="text-lg font-bold text-light-text dark:text-dark-text">
                {SITE_CONFIG.nameHe}
              </span>
            </div>
            <nav className="flex flex-col gap-2" aria-label="ניווט תחתון">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-light-text-secondary dark:text-dark-text-secondary hover:text-brand dark:hover:text-brand-lighter transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-4">
              צור קשר
            </h3>
            <div className="flex flex-col gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {SITE_CONFIG.email && (
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-brand dark:hover:text-brand-lighter transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              )}
              {SITE_CONFIG.phone && (
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="hover:text-brand dark:hover:text-brand-lighter transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              )}
              {SITE_CONFIG.whatsapp && (
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand dark:hover:text-brand-lighter transition-colors"
                >
                  WhatsApp
                </a>
              )}
              {SITE_CONFIG.linkedin && (
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand dark:hover:text-brand-lighter transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {!SITE_CONFIG.email && !SITE_CONFIG.phone && !SITE_CONFIG.whatsapp && !SITE_CONFIG.linkedin && (
                <p className="text-light-text-secondary/50 dark:text-dark-text-secondary/50">
                  פרטי יצירת קשר יעודכנו בקרוב
                </p>
              )}
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-4">
              הישארו מעודכנים
            </h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
              טיפים, תובנות ועדכונים על אוטומציה עסקית
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-light-border/50 dark:border-dark-border/50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-light-text-secondary dark:text-dark-text-secondary">
          <p>
            {currentYear} {SITE_CONFIG.nameHe}. כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-4" aria-label="קישורים משפטיים">
            <Link
              href="/privacy"
              className="hover:text-brand dark:hover:text-brand-lighter transition-colors"
            >
              מדיניות פרטיות
            </Link>
            <Link
              href="/terms"
              className="hover:text-brand dark:hover:text-brand-lighter transition-colors"
            >
              תנאי שימוש
            </Link>
            <Link
              href="/accessibility"
              className="hover:text-brand dark:hover:text-brand-lighter transition-colors"
            >
              הצהרת נגישות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
