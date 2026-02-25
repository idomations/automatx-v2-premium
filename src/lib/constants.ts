export const NAV_ITEMS = [
  { label: "בית", href: "/" },
  { label: "אוטומציה עסקית", href: "/business-automation" },
  { label: "שירותים", href: "/services" },
  { label: "עבודות", href: "/projects" },
  { label: "אודות", href: "/about" },
  { label: "בלוג", href: "/blog" },
  { label: "צור קשר", href: "/contact" },
] as const;

export const SITE_CONFIG = {
  name: "AutomatX",
  nameHe: "אוטומטX",
  tagline: "הופך עסקים לנבונים",
  phone: "",
  email: "",
  whatsapp: "",
  linkedin: "",
} as const;
