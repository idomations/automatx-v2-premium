import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { heebo } from "@/styles/fonts";
import { WhatsAppFAB } from "@/components/shared/whatsapp-fab";
import { PageTransition } from "@/components/shared/page-transition";
import { CookieBanner } from "@/components/shared/cookie-banner";
import { SiteSchema } from "@/components/seo/site-schema";
import { Analytics } from "@/components/shared/analytics";
import { BASE_URL, absoluteUrl } from "@/lib/seo";
import { getSeoRuntimeSettings } from "@/lib/site-settings";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoRuntimeSettings();
  const metadataBase = new URL(seo.siteUrl || BASE_URL);
  const image = seo.ogImage || "/opengraph-image";
  const imageValue = /^https?:\/\//i.test(image)
    ? image
    : image.startsWith("/")
      ? image
      : `/${image}`;

  return {
    metadataBase,
    title: {
      default: seo.defaultTitle,
      template: seo.titleTemplate || `%s | ${seo.siteName}`,
    },
    description: seo.defaultDescription,
    keywords: seo.defaultKeywords,
    robots: {
      index: seo.robotsIndex,
      follow: seo.robotsFollow,
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      locale: "he_IL",
      type: "website",
      siteName: seo.siteName,
      url: absoluteUrl("/", metadataBase.toString()),
      images: [
        {
          url: imageValue,
          width: 1200,
          height: 630,
          alt: `${seo.siteName} - ${seo.defaultDescription}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      images: [imageValue],
      ...(seo.twitterHandle ? { creator: seo.twitterHandle } : {}),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={heebo.variable}
      suppressHydrationWarning
    >
      <body className="font-[family-name:var(--font-heebo)] antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <SiteSchema />
          <Analytics />
          <a href="#main-content" className="skip-link">
            דלג לתוכן הראשי
          </a>
          <div id="main-content" tabIndex={-1}>
            <PageTransition>{children}</PageTransition>
          </div>
          <CookieBanner />
          <WhatsAppFAB />
        </ThemeProvider>
      </body>
    </html>
  );
}
