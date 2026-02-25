import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/section-header";
import { GlassCard } from "@/components/shared/glass-card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionConfigProvider } from "@/components/shared/motion-config-provider";
import { AnimatedSection } from "@/components/shared/animated-section";
import { QuestionnairePageContent } from "@/components/forms/questionnaire-page-content";
import { buildMarketingMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingMetadata({
    title: "שאלון הכנה לפגישה",
    description:
      "שאלון הכנה קצר לפני פגישת אפיון אוטומציה, כדי שנגיע ממוקדים ונפיק ערך כבר מהשיחה הראשונה.",
    path: "/questionnaire",
    noIndex: true,
  });
}

export default function QuestionnairePage() {
  return (
    <MotionConfigProvider>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="כמה שאלות קצרות לפני שנפגש"
            subtitle="השאלות האלה יעזרו לי להגיע לפגישה מוכן ולתת לך ערך אמיתי כבר מהרגע הראשון. לוקח פחות מ-3 דקות."
          />

          <div className="max-w-2xl mx-auto">
            <AnimatedSection>
              <GlassCard className="p-6 md:p-8" hoverEffect={false}>
                <QuestionnairePageContent />
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </MotionConfigProvider>
  );
}
