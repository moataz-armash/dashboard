import { z } from "zod";

export const ContributorSchema = z.object({
  email: z.string().email("Invalid email format").trim(),
  password: z.string().min(6, "It must be at least 6 charachter").trim(),
});

export type ContributorType = z.infer<typeof ContributorSchema>;
