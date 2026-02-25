import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionConfigProvider } from "@/components/shared/motion-config-provider";
import { SectionHeader } from "@/components/shared/section-header";
import { buildMarketingMetadata, absoluteUrl } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { getSeoRuntimeSettings } from "@/lib/site-settings";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingMetadata({
    title: "אוטומציה עסקית לעסקים קטנים ובינוניים",
    description:
      "מהי אוטומציה עסקית, מה אפשר לאוטמט כבר השבוע, ואיך מיישמים תהליך אוטומציה עם ROI ברור בעסק.",
    path: "/business-automation",
    keywords: [
      "אוטומציה עסקית",
      "ייעול תהליכים עסקיים",
      "אוטומציה לעסק קטן",
      "business automation israel",
      "סוכני AI לעסקים",
    ],
  });
}

const FAQ_ITEMS = [
  {
    question: "מה זה אוטומציה עסקית?",
    answer:
      "אוטומציה עסקית היא הפעלה אוטומטית של תהליכים שחוזרים על עצמם בעסק: טיפול בלידים, עדכון CRM, הפקת מסמכים, דיווחים ותזכורות. המטרה היא לחסוך זמן, לצמצם טעויות ולשפר שירות.",
  },
  {
    question: "איזה תהליך כדאי לאוטמט ראשון?",
    answer:
      "התחילו בתהליך שיש בו גם נפח עבודה גבוה וגם טעויות חוזרות. ברוב העסקים זה טיפול בלידים, סנכרון נתונים בין מערכות, או הכנת מסמכים ידנית.",
  },
  {
    question: "תוך כמה זמן רואים תוצאות?",
    answer:
      "בדרך כלל תהליך ראשון נותן תוצאה בתוך ימים עד שבועות, בהתאם למורכבות המערכות הקיימות ולכמות ההתאמות הנדרשת.",
  },
  {
    question: "האם אוטומציה מחליפה עובדים?",
    answer:
      "המטרה היא לא להחליף אנשים, אלא להוריד עבודה שחוקה וחזרתית כדי שהצוות יתמקד במשימות עם ערך עסקי גבוה יותר.",
  },
];

const FIRST_STEPS = [
  "מיפוי: מזהים משימות שחוזרות כל יום/שבוע וגוזלות זמן.",
  "תעדוף: בוחרים תהליך אחד עם ROI מהיר וברור.",
  "תכנון: מגדירים טריגרים, תנאים, ויעד עסקי מדיד.",
  "הטמעה: מחברים בין המערכות ומבצעים בדיקות קצה-לקצה.",
  "שיפור: מודדים ביצועים ומוסיפים אוטומציות נוספות בהדרגה.",
];

export default async function BusinessAutomationPage() {
  const seo = await getSeoRuntimeSettings();
  const siteUrl = seo.siteUrl;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "אוטומציה עסקית",
        provider: {
          "@type": "Organization",
          name: seo.siteName,
          url: absoluteUrl("/", siteUrl),
        },
        areaServed: "IL",
        serviceType: "Business Process Automation",
        url: absoluteUrl("/business-automation", siteUrl),
        description:
          "שירותי אפיון והטמעה של אוטומציה עסקית, אינטגרציות וסוכני AI לעסקים.",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "בית",
            item: absoluteUrl("/", siteUrl),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "אוטומציה עסקית",
            item: absoluteUrl("/business-automation", siteUrl),
          },
        ],
      },
    ],
  };

  return (
    <MotionConfigProvider>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <div className="container mx-auto px-4">
          <SectionHeader
            title="אוטומציה עסקית: תשובה קצרה, תוצאה גדולה"
            subtitle="אוטומציה עסקית מפחיתה עומס ידני, מצמצמת טעויות, ומשפרת מהירות תגובה ללקוחות. מתחילים מתהליך אחד, מודדים תוצאה, ומרחיבים."
          />

          <section
            className={cn(
              "max-w-4xl mx-auto rounded-2xl p-6 md:p-8",
              "bg-light-bg-secondary/60 dark:bg-white/5",
              "border border-brand/10"
            )}
          >
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
              מה אפשר לאוטמט כבר עכשיו בעסק?
            </h2>
            <ul className="mt-4 space-y-3 text-light-text-secondary dark:text-dark-text-secondary">
              <li>מענה ראשוני ללידים חדשים בוואטסאפ/מייל תוך דקות.</li>
              <li>עדכון אוטומטי בין CRM, טפסים, Google Sheets ומערכות נוספות.</li>
              <li>הפקת הצעות מחיר, מסמכים ודוחות ללא הזנה כפולה.</li>
              <li>תזכורות ונוטיפיקציות פנימיות לצוות בזמן אמת.</li>
            </ul>
          </section>

          <section className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
              איך מיישמים אוטומציה עסקית נכון?
            </h2>
            <ol className="mt-4 space-y-3 text-light-text-secondary dark:text-dark-text-secondary">
              {FIRST_STEPS.map((step) => (
                <li
                  key={step}
                  className={cn(
                    "rounded-xl px-4 py-3",
                    "bg-light-bg-secondary/40 dark:bg-white/[0.03]",
                    "border border-brand/10"
                  )}
                >
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
              שאלות נפוצות על אוטומציה עסקית
            </h2>
            <div className="mt-4 space-y-4">
              {FAQ_ITEMS.map((item) => (
                <article
                  key={item.question}
                  className={cn(
                    "rounded-xl p-5",
                    "bg-light-bg-secondary/50 dark:bg-white/[0.04]",
                    "border border-brand/10"
                  )}
                >
                  <h3 className="font-bold text-light-text dark:text-dark-text">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto mt-12 text-center">
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
              רוצים לראות דוגמאות אמיתיות? עברו ל-
              <Link href="/projects" className="text-brand hover:underline ms-1">
                פרויקטים
              </Link>
              .
            </p>
            <Link
              href="/booking"
              className={cn(
                "mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold",
                "bg-brand text-white hover:bg-brand-light"
              )}
            >
              קבעו פגישת היכרות
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </MotionConfigProvider>
  );
}
