import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionConfigProvider } from "@/components/shared/motion-config-provider";
import { cn } from "@/lib/cn";
import { buildMarketingMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingMetadata({
    title: "מדיניות פרטיות",
    description:
      "מדיניות הפרטיות של AutomatX: איזה מידע נאסף, כיצד משתמשים בו, וכיצד ניתן לפנות בנושאי פרטיות.",
    path: "/privacy",
    type: "article",
  });
}

export default function PrivacyPage() {
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
              מדיניות פרטיות
            </h1>

            <div className="space-y-5 text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              <p>
                אנחנו מכבדים את פרטיות המשתמשים באתר ומתחייבים לשקיפות לגבי
                איסוף ושימוש במידע.
              </p>

              <section>
                <h2 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
                  איזה מידע נאסף
                </h2>
                <p>
                  בעת שליחת טפסים באתר ייתכן שנאסוף שם, טלפון, אימייל, ותוכן
                  הודעה. בנוסף, עשוי להיאסף מידע טכני בסיסי לצורכי אבטחה, מדידה
                  ותפעול תקין של האתר.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
                  מטרות השימוש במידע
                </h2>
                <p>
                  המידע משמש למענה לפניות, תיאום פגישות, ניהול קשר עם לקוחות
                  פוטנציאליים, ושיפור השירותים והתוכן באתר.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
                  שמירת מידע ואבטחה
                </h2>
                <p>
                  אנו נוקטים באמצעי הגנה סבירים לשמירה על המידע, אך אין אפשרות
                  להבטיח חסינות מלאה בכל מערכת מקוונת.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
                  זכויות ופנייה
                </h2>
                <p>
                  ניתן לפנות בכל שאלה לגבי פרטיות, עיון/תיקון/מחיקה של מידע,
                  באמצעות דף יצירת הקשר באתר.
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
