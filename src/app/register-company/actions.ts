"use server";

import { cookies } from "next/headers";
import { z } from "zod";

const RegisterCompanySchema = z.object({
  name: z.string().min(3, "name must be at least 3 charachters").trim(),
  registrationNumber: z
    .string()
    .min(10, "Registration Number must be at least 10 characters")
    .trim(),
});

export async function registerCompany(prevState: any, formData: FormData) {
  const raw = {
    name: String(formData.get("name") || ""),
    registrationNumber: String(formData.get("registrationNumber") || ""),
  };
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  const parsed = RegisterCompanySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.format(),
      name: formData.get("name"),
      registrationNumber: formData.get("registrationNumber"),
      success: false,
    };
  }

  console.log(parsed.data);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/company/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(parsed.data),
    }
  );

  if (!res.ok) {
    const errorJson = await res.json(); // assuming your API sends a JSON response with `message`
    return {
      errors: {},
      name: raw.name,
      registrationNumber: raw.registrationNumber,
      success: false,
      message: errorJson.message || "Registration failed",
    };
  }

  return { data: await res.json(), success: true };
}
