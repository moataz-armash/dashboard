import { ContributorSchema } from "../signup/schema";

export default async function loginContributor(
  prevState: any,
  formData: FormData
) {
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = ContributorSchema.safeParse(loginData);

  if (!result.success) {
    return {
      errors: result.error.format(),
      success: false,
      email: loginData.email,
      password: loginData.password,
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_CONTRIBUTOR}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    }
  );

  if (!res.ok) {
    const errorJson = await res.json();
    return {
      success: false,
      errors: {},
      message: errorJson.message || "Login Failed",
      email: loginData.email,
      password: loginData.password,
    };
  }

  return { data: await res.json(), success: true };
}
