import { cookies } from "next/headers";
import ClientHomePage from "./client-home-page";
import { redirect } from "next/navigation";
import { apiRequest } from "@/utils/api";

interface HomepageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: HomepageProps) {
  const contCookies = await cookies();
  const contToken = contCookies.get("contToken")?.value;

  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 0;

  if (!contToken) redirect("/contributor/login");

  const res = await apiRequest(
    `/contributor/shopping/stores?page=${page}&size=4`,
    contToken,
    "GET",
    process.env.API_BASE_URL_GATEWAY
  );

  console.log("[ContributorHome] stores res:", res);

  // Only redirect on auth failures — empty data or server errors should show the page
  if (res?.status === 401 || res?.status === 403) redirect("/contributor/login");

  let resAddress: any = null;
  try {
    const resAllAddress = await fetch(
      `${process.env.API_BASE_URL_GATEWAY}/address/address/find/all`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    resAddress = await resAllAddress.json();
  } catch {
    // address fetch failing shouldn't block the page
  }

  return (
    <ClientHomePage
      stores={res}
      response={resAddress}
      currentPage={page}
    />
  );
}
