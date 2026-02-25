export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage: string | null;
  tags: string[];
  status: "draft" | "published";
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "seed-post-1",
    title: "המדריך המלא לאוטומציה עסקית ב-2026",
    slug: "complete-guide-business-automation",
    excerpt:
      "כל מה שצריך לדעת על אוטומציה עסקית: מה זה, למה זה קריטי, ואיך מתחילים. מדריך מקיף לבעלי עסקים קטנים ובינוניים שרוצים לעבוד חכם.",
    content: `<h2>מה זה אוטומציה עסקית?</h2>
<p>אוטומציה עסקית היא השימוש בטכנולוגיה כדי לבצע משימות חוזרות באופן אוטומטי, בלי התערבות אנושית. במקום שתשב ותעדכן טבלאות, תשלח מיילים ידנית, או תסנכרן בין מערכות \u2013 המערכת עושה את זה בשבילך.</p>

<h2>למה דווקא עכשיו?</h2>
<p>ב-2026, הכלים לאוטומציה הפכו נגישים יותר מאי פעם. אם פעם היית צריך צוות מפתחים כדי לבנות אינטגרציה בין שתי מערכות, היום אפשר לעשות את זה עם כלי no-code כמו N8N, Make, או Zapier.</p>

<h3>היתרונות העיקריים:</h3>
<ul>
<li>חיסכון של שעות עבודה שבועיות</li>
<li>הפחתת טעויות אנושיות</li>
<li>שיפור חווית הלקוח</li>
<li>יכולת להתמקד במה שבאמת חשוב</li>
</ul>

<h2>5 צעדים להתחלה</h2>
<ol>
<li><strong>מיפוי תהליכים:</strong> רשום את כל המשימות החוזרות שאתה עושה כל שבוע.</li>
<li><strong>תעדוף:</strong> בחר את התהליך שגוזל הכי הרבה זמן או הכי מועד לטעויות.</li>
<li><strong>בחירת כלי:</strong> התאם את הכלי לרמת המורכבות \u2013 Zapier לפשוט, N8N למורכב.</li>
<li><strong>בנייה ובדיקה:</strong> התחל עם אוטומציה אחת, בדוק אותה לעומק.</li>
<li><strong>הרחבה:</strong> אחרי שזה עובד, הוסף עוד תהליכים בהדרגה.</li>
</ol>

<blockquote>
<p>"הדבר הכי יקר בעסק הוא הזמן שלך. אוטומציה מחזירה לך את הזמן הזה."</p>
</blockquote>

<h2>סיכום</h2>
<p>אוטומציה עסקית היא לא מותרות \u2013 היא הכרח. עסקים שלא יאמצו אוטומציה ב-2026 ימצאו את עצמם מפסידים לעסקים שכן עשו את הצעד. ההשקעה קטנה, התוצאות \u2013 משמעותיות.</p>`,
    tags: ["אוטומציה", "מדריכים", "עסקים"],
    status: "published",
    publishedAt: "2026-01-15T08:00:00.000Z",
    featuredImage: null,
    createdAt: "2026-01-15T08:00:00.000Z",
    updatedAt: "2026-01-15T08:00:00.000Z",
  },
  {
    id: "seed-post-2",
    title: "3 תהליכים שכל עסק קטן יכול לאוטמט היום",
    slug: "3-processes-to-automate-today",
    excerpt:
      "לא צריך להיות מומחה טכנולוגי. הנה 3 תהליכים פשוטים שאפשר לאוטמט עוד היום ולחסוך שעות עבודה כל שבוע.",
    content: `<h2>לא צריך להמתין \u2013 אפשר להתחיל עוד היום</h2>
<p>הרבה בעלי עסקים חושבים שאוטומציה זה משהו גדול ומסובך. האמת? יש תהליכים שאפשר לאוטמט תוך שעה, ולהתחיל ליהנות מהתוצאות מיד.</p>

<h2>1. מענה אוטומטי ללידים חדשים</h2>
<p>כשמישהו משאיר פרטים באתר שלך, הוא מצפה לתגובה מהירה. אם אתה מגיב אחרי שעתיים \u2013 כבר הלך למתחרה.</p>
<h3>הפתרון:</h3>
<p>אוטומציה שמזהה ליד חדש ומיד שולחת:</p>
<ul>
<li>הודעת וואטסאפ אישית עם השם של הפונה</li>
<li>אימייל עם מידע נוסף על השירות</li>
<li>התראה לטלפון שלך שנכנס ליד חדש</li>
</ul>

<h2>2. סנכרון בין CRM לטבלאות</h2>
<p>עובד עם Google Sheets ו-Monday? או אולי Trello ו-HubSpot? אין סיבה לעדכן ידנית בשני מקומות.</p>
<h3>הפתרון:</h3>
<p>חיבור אוטומטי שמסנכרן נתונים בין המערכות \u2013 כל שינוי במקום אחד מתעדכן אוטומטית בכל השאר.</p>

<h2>3. דוחות שבועיים אוטומטיים</h2>
<p>במקום לשבת כל יום ראשון ולהכין דוח \u2013 תן למערכת לעשות את זה בשבילך.</p>
<h3>הפתרון:</h3>
<p>אוטומציה שאוספת נתונים ממערכות שונות, מרכיבה דוח, ושולחת אותו ישירות לאינבוקס שלך כל יום ראשון בבוקר.</p>

<blockquote>
<p>"לא צריך לאוטמט הכל בבת אחת. תתחיל עם דבר אחד, תראה את התוצאות, ותתמכר."</p>
</blockquote>

<h2>מה הצעד הבא?</h2>
<p>בחר את התהליך שהכי כואב לך ותתחיל ממנו. לא בטוח מאיפה להתחיל? אני יכול לעזור לך למפות את התהליכים ולבנות אוטומציה שמתאימה בדיוק לעסק שלך.</p>`,
    tags: ["אוטומציה", "טיפים", "עסקים קטנים"],
    status: "published",
    publishedAt: "2026-02-01T08:00:00.000Z",
    featuredImage: null,
    createdAt: "2026-02-01T08:00:00.000Z",
    updatedAt: "2026-02-01T08:00:00.000Z",
  },
  {
    id: "seed-post-3",
    title: "איך בחרתי לעבור מ-Wix לאוטומציה מלאה \u2013 הסיפור האישי שלי",
    slug: "from-wix-to-full-automation-personal-story",
    excerpt:
      "מאתר Wix סטטי לתשתית אוטומטית מלאה: הסיפור של איך העסק שלי השתנה כשהפסקתי לעבוד קשה והתחלתי לעבוד חכם.",
    content: `<h2>ההתחלה: אתר Wix ותחושה שמשהו חסר</h2>
<p>כמו הרבה בעלי עסקים, התחלתי עם אתר ב-Wix. זה היה קל, מהיר, ועשה את העבודה. אבל ככל שהעסק גדל, הרגשתי שאני מבזבז יותר ויותר זמן על דברים שלא מייצרים ערך.</p>

<p>כל יום הייתי:</p>
<ul>
<li>מעדכן טבלאות ידנית</li>
<li>שולח מיילים חוזרים ללקוחות</li>
<li>מסנכרן בין 4 מערכות שונות</li>
<li>מכין דוחות שעה שלמה כל שבוע</li>
</ul>

<h2>נקודת המפנה</h2>
<p>יום אחד ספרתי: ביליתי 12 שעות בשבוע על "ניהול" \u2013 דברים שלא מייצרים כסף, לא מייצרים ערך ללקוחות, ולא מקדמים את העסק. 12 שעות. כל שבוע.</p>

<h3>ההחלטה</h3>
<p>החלטתי לבנות את התשתית מחדש. לא רק אתר \u2013 אלא מערכת שלמה שעובדת בשבילי. זה כלל:</p>
<ol>
<li><strong>אתר חדש</strong> עם Next.js \u2013 מהיר, גמיש, ומותאם ל-SEO</li>
<li><strong>מערכת אוטומציות</strong> עם N8N \u2013 כל תהליך שהיה ידני הפך אוטומטי</li>
<li><strong>סוכן AI</strong> שעונה לשאלות נפוצות ומטפל בלידים ראשוניים</li>
<li><strong>דשבורד אדמין</strong> שמרכז הכל במקום אחד</li>
</ol>

<h2>התוצאות אחרי 3 חודשים</h2>
<p>המספרים מדברים בעד עצמם:</p>
<ul>
<li>מ-12 שעות ניהול שבועיות לפחות מ-2</li>
<li>זמן תגובה ללידים: מ-3 שעות ל-3 דקות</li>
<li>אפס טעויות בסנכרון בין מערכות</li>
<li>דוחות מגיעים לבד כל יום ראשון בבוקר</li>
</ul>

<blockquote>
<p>"ההשקעה הכי טובה שעשיתי בעסק שלי היא לא כלי חדש או עובד נוסף \u2013 אלא אוטומציה של מה שכבר היה קיים."</p>
</blockquote>

<h2>מה למדתי?</h2>
<p>שלא צריך לאוטמט הכל ביום אחד. התחלתי עם דבר אחד, ראיתי שזה עובד, והמשכתי. הגישה ההדרגתית הזו היא בדיוק מה שאני מציע גם ללקוחות שלי: תתחיל קטן, תראה תוצאות, ותגדיל.</p>

<p>אם אתה מרגיש שאתה עובד כפול \u2013 פעם על העסק ופעם על הניהול \u2013 אתה לא לבד. וזה אפשרי לשנות את זה.</p>`,
    tags: ["סיפור אישי", "אוטומציה", "טרנספורמציה דיגיטלית"],
    status: "published",
    publishedAt: "2026-02-15T08:00:00.000Z",
    featuredImage: null,
    createdAt: "2026-02-15T08:00:00.000Z",
    updatedAt: "2026-02-15T08:00:00.000Z",
  },
];

/**
 * Helper to get all unique tags from published posts
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  for (const post of BLOG_POSTS) {
    if (post.status === "published") {
      for (const tag of post.tags) {
        tagSet.add(tag);
      }
    }
  }
  return Array.from(tagSet);
}

/**
 * Helper to find a post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(
    (p) => p.slug === slug && p.status === "published"
  );
}

/**
 * Helper to get published posts with optional tag filtering and pagination
 */
export function getPublishedPosts(options?: {
  tag?: string | null;
  page?: number;
  limit?: number;
}): { posts: BlogPost[]; total: number; pages: number } {
  const { tag = null, page = 1, limit = 9 } = options || {};

  let filtered = BLOG_POSTS.filter((p) => p.status === "published");

  if (tag) {
    filtered = filtered.filter((p) => p.tags.includes(tag));
  }

  // Sort by publishedAt descending
  filtered.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const total = filtered.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const posts = filtered.slice(start, start + limit);

  return { posts, total, pages };
}
