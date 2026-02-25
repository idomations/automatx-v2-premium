/**
 * Creates URL-safe slug from free text.
 * Keeps only lowercase english letters, numbers and hyphens.
 */
export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}
