"use server";
import { cookies } from "next/headers";
import { ContributorSchema } from "./schema";

export default async function registerContributor(
  prevState: any,
  formData: FormData
) {
  const registerData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = ContributorSchema.safeParse(registerData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
      email: registerData.email,
      password: registerData.password,
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_CONTRIBUTOR}/auth/register`,
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(registerData),
    }
  );

  if (!response.ok) {
    const errorJson = await response.json();
    return {
      success: false,
      errors: {},
      message: errorJson.message || "Registeration Failed",
      email: registerData.email,
      password: registerData.password,
    };
  }

  const data = await response.json();

  const token = data.token;

  if (token) {
    cookies().set("contToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  return {
    success: true,
    data,
  };
}
