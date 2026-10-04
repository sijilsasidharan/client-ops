import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "At least 8 characters"),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  organizationName: z.string().min(1),
});
export type SignupInput = z.infer<typeof signupSchema>;
