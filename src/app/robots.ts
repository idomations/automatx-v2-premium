import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";
import { getSeoRuntimeSettings } from "@/lib/site-settings";

const PRIVATE_PATHS = ["/admin", "/api/"];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getSeoRuntimeSettings();
  const siteUrl = seo.siteUrl || BASE_URL;
  const disallow = seo.disallowPaths.length > 0 ? seo.disallowPaths : PRIVATE_PATHS;

  const aiRules: MetadataRoute.Robots["rules"] = seo.allowAiCrawlers
    ? [
        {
          userAgent: "GPTBot",
          allow: "/",
          disallow,
        },
        {
          userAgent: "OAI-SearchBot",
          allow: "/",
          disallow,
        },
      ]
    : [
        {
          userAgent: "GPTBot",
          disallow: "/",
        },
        {
          userAgent: "OAI-SearchBot",
          disallow: "/",
        },
      ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...aiRules,
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
