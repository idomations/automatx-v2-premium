import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionConfigProvider } from "@/components/shared/motion-config-provider";
import { AnimatedSection } from "@/components/shared/animated-section";
import { PostContent } from "@/components/blog/post-content";
import { ShareButtons } from "@/components/blog/share-buttons";
import {
  getPublishedBlogPostBySlug,
  getPublishedBlogSlugs,
} from "@/lib/content";
import { cn } from "@/lib/cn";
import { absoluteUrl } from "@/lib/seo";
import { getSeoRuntimeSettings } from "@/lib/site-settings";
export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    return { title: "פוסט לא נמצא" };
  }

  const seo = await getSeoRuntimeSettings();
  const postPath = `/blog/${post.slug}`;
  const postUrl = absoluteUrl(postPath, seo.siteUrl);
  const ogImage = post.featuredImage || "/opengraph-image";

  return {
    metadataBase: new URL(seo.siteUrl),
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: postPath,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      locale: "he_IL",
      type: "article",
      siteName: seo.siteName,
      url: postUrl,
      publishedTime: post.publishedAt,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [ogImage],
      ...(seo.twitterHandle ? { creator: seo.twitterHandle } : {}),
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  const seo = await getSeoRuntimeSettings();

  if (!post) {
    notFound();
  }

  const postUrl = absoluteUrl(`/blog/${post.slug}`, seo.siteUrl);

  // Article JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: "עידו",
      url: absoluteUrl("/about", seo.siteUrl),
    },
    publisher: {
      "@type": "Organization",
      name: seo.siteName,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    ...(post.featuredImage && {
      image: post.featuredImage,
    }),
  };

  return (
    <MotionConfigProvider>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className="container mx-auto px-4 max-w-3xl">
          {/* Back link */}
          <AnimatedSection>
            <Link
              href="/blog"
              className={cn(
                "inline-flex items-center gap-2 text-sm mb-8",
                "text-brand hover:text-brand-light",
                "transition-colors duration-200",
                "focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none focus-visible:rounded"
              )}
            >
              <span aria-hidden="true">&larr;</span>
              חזרה לבלוג
            </Link>
          </AnimatedSection>

          {/* Featured image */}
          {post.featuredImage && (
            <AnimatedSection>
              <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-brand/5">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={1200}
                  height={675}
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          )}

          {/* Header */}
          <AnimatedSection>
            <header className="mb-10">
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4" aria-label="תגיות">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "text-xs px-2.5 py-0.5 rounded-full",
                        "bg-brand/10 text-brand",
                        "border border-brand/20"
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1
                className={cn(
                  "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4",
                  "text-light-text dark:text-dark-text"
                )}
              >
                {post.title}
              </h1>

              <time
                dateTime={post.publishedAt}
                className={cn(
                  "text-sm",
                  "text-light-text-secondary dark:text-dark-text-secondary"
                )}
              >
                {formatDate(post.publishedAt)}
              </time>
            </header>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={0.1}>
            <PostContent content={post.content} />
          </AnimatedSection>

          {/* Share buttons */}
          <AnimatedSection delay={0.2}>
            <div
              className={cn(
                "mt-12 pt-8 border-t",
                "border-brand/10"
              )}
            >
              <p
                className={cn(
                  "text-sm font-medium mb-4",
                  "text-light-text dark:text-dark-text"
                )}
              >
                שתף את הפוסט:
              </p>
              <ShareButtons url={postUrl} title={post.title} />
            </div>
          </AnimatedSection>

          {/* Back to blog (bottom) */}
          <AnimatedSection delay={0.3}>
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium",
                  "bg-light-bg-secondary/60 dark:bg-white/5",
                  "text-light-text dark:text-dark-text",
                  "border border-brand/10",
                  "hover:bg-brand/10 hover:text-brand",
                  "transition-all duration-200",
                  "focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                )}
              >
                <span aria-hidden="true">&larr;</span>
                חזרה לבלוג
              </Link>
            </div>
          </AnimatedSection>
        </article>
      </main>
      <Footer />
    </MotionConfigProvider>
  );
}
