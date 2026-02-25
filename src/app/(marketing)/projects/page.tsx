import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionConfigProvider } from "@/components/shared/motion-config-provider";
import { SectionHeader } from "@/components/shared/section-header";
import { Portfolio } from "@/components/sections/portfolio";
import { getPublicProjects } from "@/lib/content";
import { absoluteUrl, buildMarketingMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { getSeoRuntimeSettings } from "@/lib/site-settings";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingMetadata({
    title: "פרויקטים ומקרי בוחן",
    description:
      "דוגמאות אמיתיות לפרויקטי אוטומציה עסקית וסוכני AI עם בעיה, פתרון ותוצאה עסקית מדידה.",
    path: "/projects",
    keywords: [
      "מקרי בוחן אוטומציה עסקית",
      "פרויקטי אוטומציה",
      "case studies automation",
      "תוצאות אוטומציה לעסקים",
    ],
  });
}

export default async function ProjectsPage() {
  const projects = await getPublicProjects();
  const seo = await getSeoRuntimeSettings();
  const siteUrl = seo.siteUrl;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "מקרי בוחן באוטומציה עסקית",
    url: absoluteUrl("/projects", siteUrl),
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        about: project.industry,
        description: `הבעיה: ${project.problem} הפתרון: ${project.solution} התוצאה: ${project.result}`,
      },
    })),
  };

  return (
    <MotionConfigProvider>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />

        <div className="container mx-auto px-4">
          <SectionHeader
            title="מקרי בוחן באוטומציה עסקית"
            subtitle="כל פרויקט כולל את התהליך הידני שהיה, מה האוטומציה שעשינו, ומה התוצאה העסקית בפועל."
          />

          {projects.length > 0 ? (
            <Portfolio projects={projects} title="דוגמאות לפרויקטים שבוצעו" />
          ) : (
            <div
              className={cn(
                "max-w-2xl mx-auto rounded-2xl p-8 text-center",
                "bg-light-bg-secondary/60 dark:bg-white/5",
                "border border-brand/10"
              )}
            >
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                יתווספו כאן מקרי בוחן בקרוב
              </h2>
              <p className="mt-3 text-light-text-secondary dark:text-dark-text-secondary">
                בינתיים אפשר לקבוע שיחה ולקבל כיוון פרקטי לתהליך הראשון שכדאי לאוטמט בעסק שלך.
              </p>
              <Link
                href="/booking"
                className={cn(
                  "mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold",
                  "bg-brand text-white hover:bg-brand-light"
                )}
              >
                קבע פגישת היכרות
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </MotionConfigProvider>
  );
}
