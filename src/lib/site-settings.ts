import { SITE_CONFIG } from "./constants";

export interface SiteSettings {
    siteName: string;
    siteUrl: string;
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string[];
    titleTemplate: string;
    ogImage: string;
    twitterHandle: string;
    robotsIndex: boolean;
    robotsFollow: boolean;
}

const DEFAULT_SETTINGS: SiteSettings = {
    siteName: SITE_CONFIG.nameHe,
    siteUrl: "https://automatx.co.il",
    defaultTitle: `${SITE_CONFIG.nameHe} | אוטומציה עסקית וסוכני AI`,
    defaultDescription: "הופכים את העסק שלך לחכם יותר בעזרת אוטומציות מתקדמות וסוכני AI.",
    defaultKeywords: ["אוטומציה", "AI", "בינה מלאכולית", "ייעול עסקי"],
    titleTemplate: "%s | אוטומטX",
    ogImage: "/opengraph-image",
    twitterHandle: "@automatx",
    robotsIndex: true,
    robotsFollow: true,
};

export async function getSeoRuntimeSettings(): Promise<SiteSettings> {
    return DEFAULT_SETTINGS;
}
