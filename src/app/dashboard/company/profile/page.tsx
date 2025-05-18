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
  let serverFetchError: string | null = null;

  const res = await apiRequest("/company/profile", token);
  console.log(res);
  if (res.status !== "OK") {
    if (res.status === 401 || res.status === 403) {
      redirect("/login"); // Unauthorized or Forbidden
    }
    // For other errors, try to parse a message from the API response
    try {
      const errorJson = await res.json();
      serverFetchError =
        errorJson.message || `Failed to load profile (Status: ${res.status})`;
    } catch (e) {
      // If parsing error response fails, use a generic message
      serverFetchError = `Failed to load profile (Status: ${res.status}, unable to parse error response)`;
    }
  } else {
    initialProfileData = res.data as CompanyProfile; // Assuming API returns { data: CompanyProfile }
    console.log(initialProfileData);
  }

  // Pass the fetched data (or null) and any error to the client component
  return (
    <CompanyProfileForm
      initialProfileData={initialProfileData}
      token={token!} // Pass token if client component might need to re-fetch
      serverFetchError={serverFetchError}
    />
  );
}
