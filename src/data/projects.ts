export interface ProjectCaseStudy {
  title: string;
  slug: string;
  industry: string;
  problem: string;
  solution: string;
  result: string;
  size: "medium" | "large";
}

export const FALLBACK_PROJECTS: ProjectCaseStudy[] = [
  {
    title: "מערכת עיבוד מסמכים פיננסיים",
    slug: "financial-document-processing",
    industry: "פיננסים",
    problem:
      "עובדת בכירה ביזבזה 5 שעות בשבוע על קליטת ניירת פיננסית, הצלבת נתונים והזנה ידנית למערכת ה-ERP.",
    solution:
      "מערכת מבוססת AI שמקבלת את כל המסמכים, מחלצת נתונים רלוונטיים, מצליבה מול ה-ERP, ומעדכנת אוטומטית.",
    result:
      "5 שעות בשבוע חזרו לעסק, דיוק גבוה יותר בתהליכים, וצמצום עומס תפעולי.",
    size: "large",
  },
  {
    title: "סוכן AI להצעות מחיר וחוזים",
    slug: "ai-agent-for-quotes-and-contracts",
    industry: "שירותים",
    problem:
      "הכנת הצעות מחיר ידנית, שליחת חוזים ומעקב חתימות גזלו שעות בכל עסקה.",
    solution:
      "סוכן AI שמייצר הצעות מחיר וחוזים, שולח ללקוח, ומבצע מעקב עד חתימה דיגיטלית.",
    result:
      "זמן הכנת הצעה ירד משעות לדקות, עם יותר הצעות שנשלחות ויותר סגירות בפועל.",
    size: "medium",
  },
  {
    title: "מערכת ניהול הזמנות דיגיטלית",
    slug: "digital-order-management",
    industry: "מזון",
    problem:
      "הזמנות נוהלו ידנית דרך טלפונים והודעות, מה שיצר טעויות וחוסר שליטה בזמן אמת.",
    solution:
      "מערכת דיגיטלית לניהול הזמנות מקצה לקצה, מהרגע שהלקוח מזמין ועד אספקה.",
    result:
      "אפס הזמנות שהולכות לאיבוד, שקיפות תפעולית מלאה, ושיפור חוויית הלקוח.",
    size: "medium",
  },
];

