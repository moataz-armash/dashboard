import { cookies } from "next/headers";
import CompanyProfileForm from "./companyProfileForm";
import { redirect } from "next/navigation";

export default async function CompanyProfilePage() {
  const companyCookies = cookies();
  const token = companyCookies.get("token")?.value;

  if (!token) redirect("/login");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/company/profile`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if(!res.ok) redirect("/login")

  const data = await res.json();
  console.log(data.data);

  return <CompanyProfileForm data={data.data} token={token} />;
}
