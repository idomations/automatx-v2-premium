import type { Metadata } from "next";
import { AnimatedSection, StaggerChild } from "@/components/shared/animated-section";
import { SectionHeader } from "@/components/shared/section-header";
import { GlassCard } from "@/components/shared/glass-card";
import { CTAButton } from "@/components/shared/cta-button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionConfigProvider } from "@/components/shared/motion-config-provider";
import { cn } from "@/lib/cn";
import { buildMarketingMetadata } from "@/lib/seo";
import Link from "next/link";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingMetadata({
    title: "שירותי אוטומציה עסקית ו-AI",
    description:
      "אפיון והטמעת אוטומציה עסקית, אינטגרציות בין מערכות, וסוכני AI מותאמים אישית לעסקים שרוצים לעבוד חכם יותר.",
    path: "/services",
    keywords: [
      "שירותי אוטומציה עסקית",
      "אינטגרציה בין מערכות",
      "סוכן AI לעסק",
      "ייעול תהליכים עסקיים",
    ],
  });
}

export const SERVICES_DATA = [
  {
    id: "automation",
    title: "התהליך שגונב לך שעות? הוא יכול לרוץ לבד.",
    subtitle: "אוטומציה של תהליכים עסקיים",
    description:
      "אני לוקח תהליכים שאתה עושה ידנית \u2013 שליחת מיילים, עדכון טבלאות, סנכרון בין מערכות, תזכורות ללקוחות \u2013 ובונה להם מסלול אוטומטי שרץ לבד. בלי שתצטרך לגעת.",
    features: [
      "חיבור בין כל המערכות שלך (CRM, Google Sheets, וואטסאפ, מיילים)",
      "תהליכים שעובדים 24/7 בלי התערבות",
      "התראות חכמות כשמשהו דורש תשומת לב",
      "דוחות אוטומטיים שמגיעים ישר לאינבוקס",
      "חיסכון של שעות עבודה שבועיות",
    ],
    targetAudience:
      "לעסקים קטנים ובינוניים שמרגישים שהם עובדים כפול \u2013 פעם על העסק ופעם על הניהול.",
    ctaText: "רוצה לראות איך זה עובד?",
    icon: "automation",
  },
  {
    id: "ai-agents",
    title: "עובד דיגיטלי שעובד 24/7, לא מתלונן, ולא שוכח.",
    subtitle: "סוכני AI מותאמים אישית",
    description:
      "סוכן AI הוא לא צ\u05F3אטבוט. זה עובד דיגיטלי שיודע לקרוא מסמכים, לענות ללקוחות, לסכם פגישות, לכתוב תוכן, ולעשות כמעט כל דבר שדורש מחשבה \u2013 רק בלי לישון.",
    features: [
      "סוכן שירות לקוחות שעונה לשאלות 24/7",
      "סוכן שמסכם פגישות וכותב פרוטוקולים",
      "סוכן שמנתח מסמכים ומפיק תובנות",
      "סוכן שכותב תוכן מותאם לעסק שלך",
      "סוכן שמנהל לידים ומעדכן CRM",
    ],
    targetAudience:
      "לעסקים שרוצים להגדיל את הצוות בלי להגדיל את ההוצאות. עובד דיגיטלי שעולה פחות מעובד אנושי ועובד יותר.",
    ctaText: "רוצה להכיר את העובד החדש שלך?",
    icon: "ai",
  },
];

function ServiceIcon({ type }: { type: string }) {
  if (type === "automation") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-brand dark:text-brand-lighter"
        aria-hidden="true"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-brand dark:text-brand-lighter"
      aria-hidden="true"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <MotionConfigProvider>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="שירותים"
            title="לא צריך לעבוד יותר קשה. צריך לעבוד יותר חכם."
            subtitle="אני מציע שני סוגי שירותים שמשלימים אחד את השני. כל אחד מהם יכול לשנות לך את העסק."
          />

          <div className="max-w-4xl mx-auto mb-10">
            <p
              className={cn(
                "text-sm md:text-base text-center",
                "text-light-text-secondary dark:text-dark-text-secondary"
              )}
            >
              מחפש מידע ממוקד על{" "}
              <Link
                href="/business-automation"
                className="text-brand dark:text-brand-lighter hover:underline underline-offset-2"
              >
                אוטומציה עסקית
              </Link>
              ? יצרנו מדריך קצר עם צעדים פרקטיים.
            </p>
          </div>

          <div className="space-y-16 md:space-y-24 max-w-4xl mx-auto">
            {SERVICES_DATA.map((service, index) => (
              <StaggerChild key={service.id} index={index} delayBase={0.2}>
                <GlassCard className="p-8 md:p-10" variant="brand">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={cn(
                        "flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center",
                        "bg-brand-subtle dark:bg-brand-darker/40"
                      )}
                    >
                      <ServiceIcon type={service.icon} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand dark:text-brand-lighter mb-1">
                        {service.subtitle}
                      </p>
                      <h3
                        className={cn(
                          "text-2xl md:text-3xl font-bold",
                          "text-light-text dark:text-dark-text"
                        )}
                      >
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    className={cn(
                      "text-base leading-relaxed mb-6",
                      "text-light-text-secondary dark:text-dark-text-secondary"
                    )}
                  >
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4
                      className={cn(
                        "text-sm font-bold mb-3",
                        "text-light-text dark:text-dark-text"
                      )}
                    >
                      מה כולל:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-brand/15 flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-brand dark:text-brand-lighter"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                          <span
                            className={cn(
                              "text-sm",
                              "text-light-text-secondary dark:text-dark-text-secondary"
                            )}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={cn(
                      "p-4 rounded-xl mb-6",
                      "bg-brand-subtle/50 dark:bg-brand-darker/30",
                      "border border-brand/10"
                    )}
                  >
                    <p className="text-sm font-medium text-brand dark:text-brand-lighter mb-1">
                      למי זה מתאים?
                    </p>
                    <p
                      className={cn(
                        "text-sm leading-relaxed",
                        "text-light-text-secondary dark:text-dark-text-secondary"
                      )}
                    >
                      {service.targetAudience}
                    </p>
                  </div>

                  <CTAButton href="/booking" variant="primary" size="large">
                    {service.ctaText}
                  </CTAButton>
                </GlassCard>
              </StaggerChild>
            ))}
          </div>

          <AnimatedSection className="text-center mt-16 md:mt-24">
            <p
              className={cn(
                "text-lg max-w-3xl mx-auto leading-relaxed",
                "text-light-text-secondary dark:text-dark-text-secondary"
              )}
            >
              לא בטוח מה מתאים לך? בוא נדבר. פגישת ההיכרות היא בחינם,
              ואחריה תדע בדיוק מה אפשר לעשות עם העסק שלך.
            </p>
            <div className="mt-6">
              <CTAButton href="/booking" variant="secondary">
                קבע פגישת היכרות
              </CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </MotionConfigProvider>
  );
}
