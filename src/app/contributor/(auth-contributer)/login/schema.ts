import { z } from "zod";

export const ContributorLoginSch = z.object({
  email: z.string().email("Invalid email format").trim(),
  password: z.string().min(6, "Password must be at least 6 charachters").trim(),
});

export type ContributorLoginType = z.infer<typeof ContributorLoginSch>;
