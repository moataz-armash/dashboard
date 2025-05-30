import { redirect } from "next/navigation";
import VerifyEmailPage from "./VerifyEmailPage";

interface PageProps {
  searchParams: {
    token?: string;
    email?: string;
  };
}

export default async function VerifyEmail({ searchParams }: PageProps) {
  const token = searchParams.token;
  const email = await searchParams.email;

  if (!token || !email) {
    redirect("/register");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/auth/verify-email?token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  const data = await res.json();

  return <VerifyEmailPage result={data} />;
}
