import type { MetadataRoute } from "next";
import {
  getBlogLastModifiedMap,
  getPublishedBlogSlugs,
} from "@/lib/content";
import { BASE_URL } from "@/lib/seo";
import { getSeoRuntimeSettings } from "@/lib/site-settings";

const STATIC_PAGES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/business-automation", changeFrequency: "weekly", priority: 0.95 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.85 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/booking", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.4 },
  { path: "/accessibility", changeFrequency: "yearly", priority: 0.4 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [blogSlugs, blogUpdatedBySlug, seo] = await Promise.all([
    getPublishedBlogSlugs(),
    getBlogLastModifiedMap(),
    getSeoRuntimeSettings(),
  ]);
  const baseUrl = seo.siteUrl || BASE_URL;

  const staticPages: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(blogUpdatedBySlug[slug] || now),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
