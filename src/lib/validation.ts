import { z } from "zod";

const passwordSchema = z
  .string()
  .min(12, "Use at least 12 characters.")
  .max(128, "Password is too long.")
  .regex(/[a-z]/, "Add at least one lowercase letter.")
  .regex(/[A-Z]/, "Add at least one uppercase letter.")
  .regex(/[0-9]/, "Add at least one number.");

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(254),
  password: z.string().min(1, "Password is required.")
});

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, "Full name is required.").max(120),
    email: z.string().trim().email("Enter a valid email address.").max(254),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password.")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });

export const profileEnsureSchema = z.object({
  fullName: z.string().trim().min(2).max(120).optional(),
  email: z.string().trim().email().max(254).optional()
});

export const BOOKING_TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"] as const;

export const bookingSchema = z.object({
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Select a valid date."),
  bookingTime: z.enum(BOOKING_TIME_SLOTS, { message: "Select an available time." }),
  notes: z.string().trim().max(1000, "Notes must be 1000 characters or less.").optional()
});

export const aiAdvisorRequestSchema = z.object({
  question: z.string().trim().min(1).max(1000).optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(1000)
      })
    )
    .max(8)
    .optional()
});

export function dateInSarajevo(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Europe/Sarajevo"
  }).format(date);
}

export function isBookingWeekday(dateValue: string) {
  const day = new Date(`${dateValue}T12:00:00Z`).getUTCDay();
  return day >= 1 && day <= 5;
}
