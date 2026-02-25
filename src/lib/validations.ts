import { z } from "zod";

export const leadSchema = z.object({
    name: z.string().min(2, "שם חייב להכיל לפחות 2 תווים"),
    phone: z.string().optional(),
    email: z.string().email("כתובת אימייל לא תקינה"),
    message: z.string().optional(),
    source: z
        .enum(["contact_form", "whatsapp", "booking"])
        .default("contact_form"),
});

export const bookingSchema = z.object({
    name: z.string().min(2, "שם חייב להכיל לפחות 2 תווים"),
    email: z.string().email("כתובת אימייל לא תקינה"),
    phone: z.string().optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "תאריך חייב להיות בפורמט YYYY-MM-DD"),
    timeSlot: z.string().regex(/^\d{2}:\d{2}$/, "שעה חייבת להיות בפורמט HH:MM"),
});

export const subscriberSchema = z.object({
    email: z.string().email("כתובת אימייל לא תקינה"),
});

export const projectSchema = z.object({
    title: z.string().min(1, "כותרת חובה"),
    slug: z.string().min(1, "slug חובה"),
    industry: z.string().optional(),
    problem: z.string().optional(),
    solution: z.string().optional(),
    result: z.string().optional(),
});
