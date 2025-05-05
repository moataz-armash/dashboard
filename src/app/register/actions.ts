"use server";

import { z } from "zod";

const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(4, "Username must be at least 4 charachters")
      .trim(),
    email: z.string().email("Invalid email format").trim(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function registerUser(prevState: any, formData: FormData) {
  const raw = {
    username: String(formData.get("username") || ""),
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
    confirmPassword: String(formData.get("confirmPassword") || ""),
  };

  const parsed = RegisterSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.format(),
      email: formData.get("email"),
      username: formData.get("username"),
      success: false,
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    }
  );

  if (!res.ok) {
    const errorJson = await res.json(); // assuming your API sends a JSON response with `message`
    return {
      errors: {},
      username: raw.username,
      email: raw.email,
      success: false,
      message: errorJson.message || "Registration failed",
    };
  }

  return { data: res.json(), success: true };
}
