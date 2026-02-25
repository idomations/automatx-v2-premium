import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionConfigProvider } from "@/components/shared/motion-config-provider";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { buildMarketingMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingMetadata({
    title: "הצהרת נגישות",
    description:
      "הצהרת הנגישות של אתר AutomatX, כולל אמצעי נגישות, תמיכה ודרכי יצירת קשר במקרה של קושי.",
    path: "/accessibility",
    type: "article",
  });
}

export default function AccessibilityPage() {
  const contactEmail = SITE_CONFIG.email || "hello@automatx.co.il";

  return (
    <MotionConfigProvider>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1
              className={cn(
                "text-3xl md:text-4xl font-bold mb-6",
                "text-light-text dark:text-dark-text"
              )}
            >
              הצהרת נגישות
            </h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 leading-relaxed">
              אנחנו ב-AutomatX פועלים להנגשת האתר עבור כלל המשתמשים, כולל אנשים
              עם מוגבלות, בהתאם לעקרונות תקן WCAG 2.1 ברמת AA.
            </p>

            <section className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                מה בוצע באתר
              </h2>
              <ul className="list-disc pe-6 space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                <li>תמיכה מלאה בניווט מקלדת ופוקוס ברור לכל רכיב אינטראקטיבי.</li>
                <li>שמירה על ניגודיות צבעים טובה במצב בהיר ובמצב כהה.</li>
                <li>מבנה סמנטי ברור עם כותרות, אזורי תוכן ותיוג ניווט.</li>
                <li>תמיכה ב-RTL מלא לכל דפי האתר.</li>
                <li>התאמות להעדפת `reduced motion` למניעת עומס תנועתי.</li>
              </ul>
            </section>

            <section className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                בעיות נגישות ידועות
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                ייתכנו חריגות נקודתיות בדפדפנים ישנים או בתוספים חיצוניים. אם
                נתקלת בבעיה, נשמח לקבל דיווח כדי לתקן במהירות.
              </p>
            </section>

            <section className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                יצירת קשר בנושא נגישות
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                אפשר לפנות אלינו במייל{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-brand hover:text-brand-light underline underline-offset-2"
                >
                  {contactEmail}
                </a>{" "}
                ולפרט את הבעיה, העמוד הרלוונטי, וטכנולוגיית העזר שבה השתמשת.
              </p>
            </section>

            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary/90">
              תאריך עדכון אחרון: 24 בפברואר 2026.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </MotionConfigProvider>
  );
}
