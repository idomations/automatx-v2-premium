import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionConfigProvider } from "@/components/shared/motion-config-provider";
import { cn } from "@/lib/cn";
import { buildMarketingMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingMetadata({
    title: "תנאי שימוש",
    description:
      "תנאי השימוש באתר AutomatX, כולל אחריות שימוש, קניין רוחני והגבלות שימוש בתכני האתר.",
    path: "/terms",
    type: "article",
  });
}

export default function TermsPage() {
  return (
    <MotionConfigProvider>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-16">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            <h1
              className={cn(
                "text-3xl md:text-4xl font-bold mb-6",
                "text-light-text dark:text-dark-text"
              )}
            >
              תנאי שימוש
            </h1>

            <div className="space-y-5 text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              <p>
                השימוש באתר מהווה הסכמה לתנאים המפורטים בדף זה. אם אינך מסכים
                לתנאים, יש להימנע משימוש באתר.
              </p>

              <section>
                <h2 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
                  שימוש באתר
                </h2>
                <p>
                  האתר מספק מידע כללי על שירותי AutomatX. אין באמור באתר כדי
                  להוות התחייבות להצעה מסחרית מחייבת או תוצאה עסקית מובטחת.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
                  קניין רוחני
                </h2>
                <p>
                  כלל התכנים באתר, לרבות טקסטים, עיצוב, קוד ותוצרים גרפיים,
                  שייכים ל-AutomatX או לבעלי זכויות מורשים, ואין לעשות בהם שימוש
                  מסחרי ללא אישור מראש.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
                  אחריות
                </h2>
                <p>
                  נעשה מאמץ לשמור על זמינות ודיוק המידע באתר, אך ייתכנו שגיאות
                  או תקלות. השימוש באתר הוא באחריות המשתמש בלבד.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
                  יצירת קשר
                </h2>
                <p>
                  לכל שאלה בנוגע לתנאי השימוש, ניתן לפנות באמצעות דף יצירת הקשר
                  באתר.
                </p>
              </section>

              <p className="text-sm">
                תאריך עדכון אחרון: 24 בפברואר 2026.
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </MotionConfigProvider>
  );
}
