import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/section-header";
import { GlassCard } from "@/components/shared/glass-card";
import { CalEmbed } from "@/components/forms/cal-embed";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionConfigProvider } from "@/components/shared/motion-config-provider";
import { AnimatedSection } from "@/components/shared/animated-section";
import { cn } from "@/lib/cn";
import { buildMarketingMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingMetadata({
    title: "קביעת פגישת אוטומציה",
    description:
      "קבעו פגישת היכרות קצרה וחינמית כדי למפות את תהליכי האוטומציה הכי חשובים לעסק שלכם.",
    path: "/booking",
  });
}

const BENEFITS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
    ),
    text: "30 דקות בלבד",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
    ),
    text: "לגמרי בחינם",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
    ),
    text: "בלי התחייבות",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
    ),
    text: "מסונכרן עם היומן שלי",
  },
];

// Fallback when NEXT_PUBLIC_CALCOM_LINK is not yet configured
function CalNotConfigured() {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[300px] rounded-xl p-8 text-center",
        "bg-brand/5 border border-brand/20"
      )}
    >
      <div className="text-4xl mb-4">📅</div>
      <p className={cn("font-semibold mb-2", "text-light-text dark:text-dark-text")}>
        הקביעה עדיין לא פעילה
      </p>
      <p className={cn("text-sm", "text-light-text-secondary dark:text-dark-text-secondary")}>
        הוסף את <code className="bg-brand/10 px-1 rounded">NEXT_PUBLIC_CALCOM_LINK</code> כדי להפעיל את לוח הקביעה.
      </p>
    </div>
  );
}

export default function BookingPage() {
  const calLink = process.env.NEXT_PUBLIC_CALCOM_LINK;

  return (
    <MotionConfigProvider>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="קבע פגישת היכרות – 30 דקות, בחינם"
            subtitle="בחר תאריך ושעה שנוחים לך. הזמן הנבחר מסונכרן אוטומטית עם היומן שלי."
          />

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
            {/* Calendar embed */}
            <div className="md:col-span-4">
              <AnimatedSection>
                <GlassCard className="p-2 md:p-4" hoverEffect={false}>
                  {calLink ? (
                    <CalEmbed
                      calLink={calLink}
                      successRedirectUrl="/questionnaire"
                    />
                  ) : (
                    <CalNotConfigured />
                  )}
                </GlassCard>
              </AnimatedSection>
            </div>

            {/* Benefits sidebar */}
            <div className="md:col-span-1">
              <AnimatedSection delay={0.15}>
                <div className="space-y-4">
                  <h3
                    className={cn(
                      "text-sm font-bold mb-4",
                      "text-light-text dark:text-dark-text"
                    )}
                  >
                    בפגישה:
                  </h3>

                  {BENEFITS.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                        {benefit.icon}
                      </div>
                      <span
                        className={cn(
                          "text-sm font-medium leading-tight pt-1",
                          "text-light-text dark:text-dark-text"
                        )}
                      >
                        {benefit.text}
                      </span>
                    </div>
                  ))}

                  <div
                    className={cn(
                      "mt-6 p-3 rounded-xl",
                      "bg-brand/5 border border-brand/10"
                    )}
                  >
                    <p
                      className={cn(
                        "text-xs leading-relaxed",
                        "text-light-text-secondary dark:text-dark-text-secondary"
                      )}
                    >
                      אחרי הקביעה תועבר לשאלון הכנה קצר.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </MotionConfigProvider>
  );
}
