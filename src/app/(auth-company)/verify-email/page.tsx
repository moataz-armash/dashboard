import { redirect } from "next/navigation";
import VerifyEmailPage from "./VerifyEmailPage";

interface PageProps {
  searchParams: Promise<{
    token?: string;
    email?: string;
  }>;
}

export default async function VerifyEmail({ searchParams }: PageProps) {
  const { token, email } = await searchParams;

  if (!token || !email) {
    redirect("/register");
  }

  const res = await fetch(
    `${process.env.API_BASE_URL_GATEWAY}/company/auth/verify-email?token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  const data = await res.json();

  return <VerifyEmailPage result={data} />;
}
