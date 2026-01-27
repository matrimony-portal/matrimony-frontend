import { z } from "zod";

/**
 * Organizer profile edit validation
 * Used in EditOrganizer form
 */
const phoneRegex = /^[+]?[\d\s()-]{10,20}$/;

export const organizerProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .trim(),
  phone: z
    .string()
    .max(20)
    .optional()
    .refine(
      (v) => !v || v.trim() === "" || phoneRegex.test(v.trim()),
      "Please enter a valid phone number (e.g. +91 98765 43210)",
    ),
  city: z.string().max(100).optional().or(z.literal("")),
  state: z.string().max(100).optional().or(z.literal("")),
  aboutMe: z.string().max(2000).optional().or(z.literal("")),
});
