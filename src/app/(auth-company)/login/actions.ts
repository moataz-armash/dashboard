"use server";

import { cookies } from "next/headers";
import { z } from "zod";

const LoginSchema = z
  .object({
    identifier: z.string().trim().min(1, "Username or email is required"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .trim(),
  })
  .refine(
    (data) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.identifier) ||
      data.identifier.length >= 4,
    {
      message: "Enter a valid email or a username with at least 4 characters",
      path: ["identifier"],
    }
  );

export async function loginUser(prevState: any, formData: FormData) {
  const raw = {
    identifier: String(formData.get("identifier") || ""),
    password: String(formData.get("password") || ""),
  };

  const parsed = LoginSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.format(),
      identifier: formData.get("identifier"),
      success: false,
    };
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parsed.data.identifier);

  const payload = {
    [isEmail ? "email" : "username"]: parsed.data.identifier,
    password: parsed.data.password,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    let errorJson = { message: "Login failed" }; // assuming your API sends a JSON response with `message`
    try {
      const text = await res.text();
      if (text) errorJson = JSON.parse(text);
    } catch (e) {
      console.log("Error parsing error response:", e);
    }

    return {
      errors: {},
      identifier: raw.identifier,
      success: false,
      message: errorJson.message,
    };
  }

  let data = {};

  try {
    const text = await res.text();
    if (text) data = JSON.parse(text);
    const token = data?.data?.token;
    const companyId = data?.data?.companyId;
    console.log("companyId: ", companyId);

    cookies().set("companyId", companyId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 7 days
    });

    if (token) {
      cookies().set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24, // 7 days
      });
    }
  } catch (e) {
    console.error("Error parsing success response:", e);
  }

  return { data, success: true };
}
