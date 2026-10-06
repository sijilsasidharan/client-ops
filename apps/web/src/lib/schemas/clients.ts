// lib/schemas/client.ts
import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  contactInfo: z.string().optional(),
  notes: z.string().optional(),
});
export type ClientInput = z.infer<typeof clientSchema>;
export interface Client extends ClientInput {
  id: string;
  createdAt: string;
}
