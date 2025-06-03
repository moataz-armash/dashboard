import { cookies } from "next/headers";
import ClientHomePage from "./client-home-page";
import { redirect } from "next/navigation";
import { apiRequest } from "@/utils/api";

export default async function HomePage() {
  const contCookies = await cookies();
  const contToken = contCookies.get("contToken")?.value;

  console.log(contToken);

  if (!contToken) redirect("/contributor/login");

  const res = await apiRequest("/shopping/stores", contToken, "GET", process.env.NEXT_PUBLIC_API_BASE_URL_CONTRIBUTOR);

  if(res.status !== "OK") redirect("/contributor/login?size=6");

  return <ClientHomePage stores={res.data}/>;
}
