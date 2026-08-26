import { z } from "zod";

export const contactSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().max(30).optional().default(""),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000)
});

export const quoteSchema = z.object({
  full_name: z.string().trim().min(2),
  company: z.string().trim().max(200).optional().default(""),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(5).max(30),
  whatsapp: z.string().trim().max(30).optional().default(""),
  service_id: z.coerce.number().int().positive().nullable().optional(),
  project_location: z.string().trim().min(2),
  project_type: z.string().trim().max(100).optional().default(""),
  project_size: z.string().trim().max(100).optional().default(""),
  budget_range: z.string().trim().max(100).optional().default(""),
  desired_timeline: z.string().trim().max(100).optional().default(""),
  description: z.string().trim().min(10).max(5000),
  attachment_url: z.string().trim().url().optional().or(z.literal(""))
});

export const consultationSchema = z.object({
  full_name: z.string().trim().min(2),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(5).max(30),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date"),
  preferred_time: z.string().trim().max(50).optional().default(""),
  consultation_type: z.enum(["on_site", "office", "virtual"]).default("on_site"),
  project_details: z.string().trim().max(2000).optional().default(""),
  message: z.string().trim().max(5000).optional().default("")
});

export const applicationSchema = z.object({
  job_id: z.coerce.number().int().positive(),
  full_name: z.string().trim().min(2),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(5).max(30),
  cover_letter: z.string().trim().max(8000).optional().default(""),
  resume_url: z.string().trim().min(1, "Resume is required")
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
export type ConsultationInput = z.infer<typeof consultationSchema>;
export type ApplicationInput = z.infer<typeof applicationSchema>;
