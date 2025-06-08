import { cookies } from "next/headers";
import ClientHomePage from "./client-home-page";
import { redirect } from "next/navigation";
import { apiRequest } from "@/utils/api";

interface HomepageProps {
  searchParams: { page?: string };
}

export default async function HomePage({ searchParams }: HomepageProps) {
  const contCookies = await cookies();
  const contToken = contCookies.get("contToken")?.value;

  const page = Number(searchParams.page) || 0;

  if (!contToken) redirect("/contributor/login");

  const res = await apiRequest(
    `/shopping/stores?page=${page}&size=4`,
    contToken,
    "GET",
    process.env.NEXT_PUBLIC_API_BASE_URL_CONTRIBUTOR
  );

  const resAllAddress = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ADDRESS}/address/find/all`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const resAddress = await resAllAddress.json();

  if (res.status !== "OK") redirect("/contributor/login");

  return (
    <ClientHomePage
      stores={res.data}
      response={resAddress}
      currentPage={page}
    />
  );
}
