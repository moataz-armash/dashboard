import { cookies } from "next/headers";
import ClientHomePage from "./client-home-page";
import { redirect } from "next/navigation";
import { apiRequest } from "@/utils/api";

export default async function HomePage() {
  const contCookies = await cookies();
  const contToken = contCookies.get("contToken")?.value;

  console.log(contToken);

  if (!contToken) redirect("/contributor/login");

  const res = await apiRequest(
    "/shopping/stores",
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

  const uniqueAddresses = resAddress.data.filter(
    (address, index, self) =>
      index ===
      self.findIndex((a) => a.lat === address.lat && a.lng === address.lng)
  );

  if (res.status !== "OK") redirect("/contributor/login?size=6");

  return <ClientHomePage stores={res.data} addresses={uniqueAddresses} />;
}
