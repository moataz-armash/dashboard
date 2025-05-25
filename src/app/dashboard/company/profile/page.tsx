import { cookies } from "next/headers";
import CompanyProfileForm from "./companyProfileForm";
import { redirect } from "next/navigation";
import { CompanyProfile } from "../profileStore";
import { apiRequest } from "@/utils/api";

export default async function CompanyProfilePage() {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) redirect("/login");

  let initialProfileData: CompanyProfile | null = null;

  const res = await apiRequest("/company/profile", token);

  if (res.status !== "OK") {
    if (res.status === 401 || res.status === 403) {
      redirect("/login"); // Unauthorized or Forbidden
    }
  } else {
    initialProfileData = res.data as CompanyProfile;
    console.log(initialProfileData);
  }

  return (
    <CompanyProfileForm
      initialProfileData={initialProfileData}
      token={token!} // Pass token if client component might need to re-fetch
    />
  );
}
