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
    disallowPaths: string[];
    allowAiCrawlers: boolean;
    // Organization / LocalBusiness Schema properties
    orgName?: string;
    orgEmail?: string;
    orgPhone?: string;
    orgDescription?: string;
    areaServed?: string;
    serviceCatalog: string[];
    sameAs: string[];
}

const DEFAULT_SETTINGS: SiteSettings = {
    siteName: SITE_CONFIG.nameHe,
    siteUrl: "https://automatx.co.il",
    defaultTitle: `${SITE_CONFIG.nameHe} | אוטומציה עסקית וסוכני AI`,
    defaultDescription: "הופכים את העסק שלך לחכם יותר בעזרת אוטומציות מתקדמות וסוכני AI.",
    defaultKeywords: ["אוטומציה", "AI", "בינה מלאכותית", "ייעול עסקי"],
    titleTemplate: "%s | אוטומטX",
    ogImage: "/opengraph-image",
    twitterHandle: "@automatx",
    robotsIndex: true,
    robotsFollow: true,
    disallowPaths: ["/admin", "/api/"],
    allowAiCrawlers: true,
    orgName: SITE_CONFIG.nameHe,
    orgEmail: "office@automatx.co.il",
    orgPhone: "054-0000000",
    orgDescription: "הופכים את העסק שלך לחכם יותר בעזרת אוטומציות מתקדמות וסוכני AI.",
    areaServed: "ישראל",
    serviceCatalog: ["אוטומציה עסקית", "סוכני AI", "אינטגרציות"],
    sameAs: [],
};

export async function getSeoRuntimeSettings(): Promise<SiteSettings> {
    return DEFAULT_SETTINGS;
}
