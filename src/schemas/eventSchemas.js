import { z } from "zod";

/**
 * Event Validation Schemas using Zod
 * For event organizer forms
 */

// Create/Update Event Schema
export const eventSchema = z
  .object({
    title: z
      .string()
      .min(1, "Event title is required")
      .min(5, "Title must be at least 5 characters")
      .max(100, "Title must be less than 100 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .min(20, "Description must be at least 20 characters")
      .max(1000, "Description must be less than 1000 characters"),
    eventDate: z
      .string()
      .min(1, "Event date is required")
      .refine(
        (val) => {
          const eventDate = new Date(val);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return eventDate >= today;
        },
        {
          message: "Event date must be today or in the future",
        },
      ),
    eventTime: z
      .string()
      .min(1, "Event time is required")
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Please enter a valid time (HH:MM)",
      ),
    venue: z
      .string()
      .min(1, "Venue is required")
      .min(5, "Venue must be at least 5 characters")
      .max(200, "Venue must be less than 200 characters"),
    city: z
      .string()
      .min(1, "City is required")
      .min(2, "City must be at least 2 characters")
      .max(50, "City must be less than 50 characters"),
    state: z
      .string()
      .min(1, "State is required")
      .min(2, "State must be at least 2 characters")
      .max(50, "State must be less than 50 characters"),
    maxParticipants: z
      .number()
      .min(1, "Maximum participants must be at least 1")
      .max(10000, "Maximum participants cannot exceed 10000")
      .or(z.string().transform((val) => parseInt(val, 10))),
    registrationFee: z
      .number()
      .min(0, "Registration fee cannot be negative")
      .max(100000, "Registration fee is too high")
      .or(z.string().transform((val) => parseFloat(val))),
    status: z
      .enum(["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"])
      .optional(),
  })
  .refine(
    (data) => {
      // Combine date and time
      const eventDateTime = new Date(`${data.eventDate}T${data.eventTime}`);
      const now = new Date();
      return eventDateTime > now;
    },
    {
      message: "Event date and time must be in the future",
      path: ["eventTime"],
    },
  );

// Event Filter Schema
export const eventFilterSchema = z.object({
  search: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  eventDate: z.string().optional(),
  status: z.enum(["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"]).optional(),
  page: z.number().min(1).optional(),
  size: z.number().min(1).max(100).optional(),
});
