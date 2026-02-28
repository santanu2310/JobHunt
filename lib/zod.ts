import { object, string, boolean } from "zod";

export const signInSchema = object({
  email: string({ error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const createAdminSchema = object({
  email: string({
    error: "Email is required",
  })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  name: string().optional(),
});

export const signUpSchema = object({
  name: string().optional(),
  email: string({ error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const createJobSchema = object({
  title: string({ error: "Title is required" }).min(
    1,
    "Title is required",
  ),
  designation: string({ error: "Designation is required" }).min(
    1,
    "Designation is required",
  ),
  salary: string().optional(),
  category: string().optional(),
  jobType: string().optional(),
  location: string().optional(),
  deadline: string().optional(),
  image: string().optional(),
  skills: string().optional(),
  details: string().optional(),
  isActive: boolean().optional(),
});

export const createSliderSchema = object({
  name: string({ error: "Slider name is required" }).min(
    1,
    "Slider name is required",
  ),
  imageUrl: string({ error: "Slider image is required" }).min(
    1,
    "Slider image is required",
  ),
});
