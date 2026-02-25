import { absoluteUrl, BASE_URL } from "@/lib/seo";
import { getSeoRuntimeSettings } from "@/lib/site-settings";

export async function SiteSchema() {
  const seo = await getSeoRuntimeSettings();
  const siteUrl = seo.siteUrl || BASE_URL;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: seo.orgName || seo.siteName,
        url: siteUrl,
        logo: absoluteUrl(seo.ogImage || "/opengraph-image", siteUrl),
        email: seo.orgEmail,
        telephone: seo.orgPhone || undefined,
        sameAs: seo.sameAs,
        knowsAbout: [
          "אוטומציה עסקית",
          "סוכני AI",
          "ייעול תהליכים עסקיים",
          "אינטגרציה בין מערכות",
        ],
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${siteUrl}/#business`,
        name: seo.orgName || seo.siteName,
        url: siteUrl,
        description: seo.orgDescription || seo.defaultDescription,
        areaServed: {
          "@type": "Place",
          name: seo.areaServed,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "שירותי אוטומציה",
          itemListElement: seo.serviceCatalog.map((serviceName) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: serviceName,
            },
          })),
        },
        sameAs: seo.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: seo.siteName,
        inLanguage: "he-IL",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

