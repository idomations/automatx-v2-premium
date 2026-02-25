import type { Metadata } from "next";
import { getSeoRuntimeSettings } from "@/lib/site-settings";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://automatx.co.il";

function normalizePath(path: string): string {
  if (!path) return "/";
  if (path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

function isAbsoluteHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value.trim());
}

function buildFullTitle(
  pageTitle: string,
  titleTemplate: string,
  siteName: string
): string {
  const trimmedTemplate = titleTemplate.trim();
  if (trimmedTemplate.includes("%s")) {
    return trimmedTemplate.replace("%s", pageTitle);
  }
  if (trimmedTemplate) {
    return `${pageTitle} | ${trimmedTemplate}`;
  }
  return `${pageTitle} | ${siteName}`;
}

export function absoluteUrl(path: string, baseUrl = BASE_URL): string {
  const safePath = normalizePath(path);
  const safeBaseUrl = baseUrl.replace(/\/+$/, "");
  return safePath === "/" ? safeBaseUrl : `${safeBaseUrl}${safePath}`;
}

interface MarketingMetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
}

export async function buildMarketingMetadata({
  title,
  description,
  path,
  type = "website",
  keywords,
  noIndex = false,
}: MarketingMetadataOptions): Promise<Metadata> {
  const seo = await getSeoRuntimeSettings();
  const canonicalPath = normalizePath(path);
  const metadataBase = new URL(seo.siteUrl || BASE_URL);
  const url = absoluteUrl(canonicalPath, metadataBase.toString());
  const fullTitle = buildFullTitle(title, seo.titleTemplate, seo.siteName);
  const image = seo.ogImage || "/opengraph-image";
  const imageValue = isAbsoluteHttpUrl(image) ? image : normalizePath(image);
  const resolvedKeywords =
    keywords && keywords.length > 0 ? keywords : seo.defaultKeywords;

  return {
    metadataBase,
    title,
    description,
    ...(resolvedKeywords?.length ? { keywords: resolvedKeywords } : {}),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: fullTitle,
      description,
      locale: "he_IL",
      type,
      siteName: seo.siteName,
      url,
      images: [
        {
          url: imageValue,
          width: 1200,
          height: 630,
          alt: `${seo.siteName} - ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageValue],
      ...(seo.twitterHandle ? { creator: seo.twitterHandle } : {}),
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: seo.robotsIndex,
          follow: seo.robotsFollow,
        },
  };
}

