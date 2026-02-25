import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedSection, StaggerChild } from "@/components/shared/animated-section";
import { SectionHeader } from "@/components/shared/section-header";
import { CTAButton } from "@/components/shared/cta-button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionConfigProvider } from "@/components/shared/motion-config-provider";
import { cn } from "@/lib/cn";
import { buildMarketingMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingMetadata({
    title: "אודות AutomatX",
    description:
      "הכירו את הסיפור מאחורי AutomatX ואת הגישה הפרקטית שלנו לאוטומציה עסקית ולשיפור תהליכים בארגונים.",
    path: "/about",
  });
}

const MILESTONES = [
  {
    title: "תעשייה וניהול",
    description:
      "התחלתי את הדרך שלי בתעשייה. ניהלתי צוותים, תהליכי ייצור, ולמדתי מה זה אומר לנהל מערכת מורכבת עם אנשים אמיתיים.",
    period: "הרקע",
    emoji: "🏭",
  },
  {
    title: "עולם המשחקים והזוגיות",
    description:
      "פתחתי עסק בתחום המשחקים הזוגיים. למדתי מה זה לבנות מוצר מאפס, לשווק אותו, ולגרום ללקוחות לחזור.",
    period: "הדרך",
    emoji: "🎲",
  },
  {
    title: "גילוי האוטומציה",
    description:
      "יום אחד גיליתי שאפשר לחבר בין מערכות, ליצור תהליכים אוטומטיים, ולחסוך שעות של עבודה ידנית. מאז לא הפסקתי.",
    period: "נקודת המפנה",
    emoji: "⚡",
  },
  {
    title: "AutomatX",
    description:
      "הקמתי את AutomatX כדי לעזור לעסקים אחרים לעבוד חכם. אני משלב את הניסיון שלי בניהול עם הטכנולוגיה המתקדמת ביותר.",
    period: "היום",
    emoji: "🚀",
  },
];

const STORY_PARAGRAPHS = [
  "אני עידו. לא מתכנת קלאסי, לא מהנדס תוכנה מלידה. הגעתי לעולם הזה מכיוון אחר לגמרי.",
  "ניהלתי צוותים בתעשייה, הקמתי עסק בתחום המשחקים הזוגיים, ולאורך כל הדרך שאלתי את אותה שאלה: למה אנחנו עושים דברים ידנית כשמחשב יכול לעשות אותם טוב יותר?",
  "יום אחד גיליתי את עולם האוטומציה. לא הקוד, לא הטכנולוגיה \u2013 את הרעיון. שאפשר לקחת תהליך שגוזל שעות ולהפוך אותו למשהו שרץ לבד.",
  "מאז אני חי ונושם את זה. בניתי מאות אוטומציות, לעסקים מכל הגדלים ומכל התחומים. ולמדתי דבר אחד חשוב: הטכנולוגיה לא מעניינת אנשים. מה שמעניין אנשים זה תוצאות.",
  "אני לא מוכר טכנולוגיה. אני מוכר זמן פנוי, פחות טעויות, יותר שליטה. וזה בדיוק מה ש-AutomatX עושה.",
];

export default function AboutPage() {
  return (
    <MotionConfigProvider>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SectionHeader title="הסיפור שלי" badge="אודות" />

          <div className="max-w-4xl mx-auto">
            {/* Avatar + Story */}
            <AnimatedSection className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-16 md:mb-24">
              {/* Avatar */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="relative">
                  <div
                    className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-brand/20 via-brand-lighter/10 to-transparent blur-sm"
                    aria-hidden="true"
                  />
                  <div
                    className={cn(
                      "relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden",
                      "border-2 border-brand/15 dark:border-brand-lighter/10",
                      "shadow-xl shadow-brand/10"
                    )}
                  >
                    <Image
                      src="/images/ido.jpg"
                      alt="עידו - מייסד AutomatX"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 128px, 160px"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Story text */}
              <div className="space-y-4">
                {STORY_PARAGRAPHS.map((paragraph, index) => (
                  <p
                    key={index}
                    className={cn(
                      "text-base md:text-lg leading-relaxed",
                      "text-light-text-secondary dark:text-dark-text-secondary"
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimatedSection>

            {/* Timeline */}
            <AnimatedSection className="mb-16 md:mb-24">
              <h3
                className={cn(
                  "text-2xl md:text-3xl font-bold text-center mb-12",
                  "text-light-text dark:text-dark-text"
                )}
              >
                הדרך שלי
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                {MILESTONES.map((milestone, index) => (
                  <StaggerChild key={milestone.title} index={index}>
                    <div
                      className={cn(
                        "relative rounded-2xl p-6 text-center h-full",
                        "bg-white/70 dark:bg-white/[0.04]",
                        "border border-light-border dark:border-dark-border",
                        "hover-lift hover:border-brand/20 dark:hover:border-brand-lighter/15"
                      )}
                    >
                      {/* Period label */}
                      <span className="text-xs font-bold text-brand dark:text-brand-lighter uppercase tracking-wider">
                        {milestone.period}
                      </span>

                      {/* Emoji */}
                      <div className="text-4xl my-3">{milestone.emoji}</div>

                      {/* Title */}
                      <h4
                        className={cn(
                          "text-lg font-bold mb-2",
                          "text-light-text dark:text-dark-text"
                        )}
                      >
                        {milestone.title}
                      </h4>

                      {/* Description */}
                      <p
                        className={cn(
                          "text-sm leading-relaxed",
                          "text-light-text-secondary dark:text-dark-text-secondary"
                        )}
                      >
                        {milestone.description}
                      </p>
                    </div>
                  </StaggerChild>
                ))}
              </div>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection className="text-center">
              <p
                className={cn(
                  "text-lg md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed",
                  "text-light-text-secondary dark:text-dark-text-secondary"
                )}
              >
                רוצה לשמוע איך אני יכול לעזור לעסק שלך?
              </p>
              <CTAButton href="/booking" variant="primary" size="large">
                קבע פגישת היכרות
              </CTAButton>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </MotionConfigProvider>
  );
}
