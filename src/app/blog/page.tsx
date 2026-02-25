import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionConfigProvider } from "@/components/shared/motion-config-provider";
import { SectionHeader } from "@/components/shared/section-header";
import { BlogFeedClient } from "@/components/blog/blog-feed-client";
import { getPublishedBlogPosts } from "@/lib/content";
import { buildMarketingMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingMetadata({
    title: "בלוג אוטומציה עסקית",
    description:
      "מדריכים, דוגמאות ותובנות פרקטיות על אוטומציה עסקית, סוכני AI, ותהליכים שחוסכים זמן וכסף.",
    path: "/blog",
    keywords: [
      "בלוג אוטומציה עסקית",
      "מדריך אוטומציה",
      "סוכן AI לעסק",
      "ייעול תהליכים עסקיים",
    ],
  });
}

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <MotionConfigProvider>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="בלוג"
            subtitle="מדריכים, טיפים ותובנות על אוטומציה עסקית, סוכני AI ועבודה חכמה."
          />
          <BlogFeedClient posts={posts} />
        </div>
      </main>
      <Footer />
    </MotionConfigProvider>
  );
}
