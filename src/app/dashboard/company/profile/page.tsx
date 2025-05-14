import { cookies } from "next/headers";
import CompanyProfileForm from "./companyProfileForm";
import { redirect } from "next/navigation";
import { CompanyProfile } from "../profileStore";

export default async function CompanyProfilePage() {
  const companyCookies = cookies();
  const token = companyCookies.get("token")?.value;

  if (!token) redirect("/login");

  let initialProfileData: CompanyProfile | null = null;
  let serverFetchError: string | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/company/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store", // Or 'force-cache' if data is relatively static per session
      }
    );

    if (!res.ok) {
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
      const responseData = await res.json();
      initialProfileData = responseData.data as CompanyProfile; // Assuming API returns { data: CompanyProfile }
    }
  } catch (error: any) {
    console.error("Server-side fetch error for company profile:", error);
    serverFetchError =
      error.message ||
      "An unexpected error occurred while fetching profile data.";
  }

  // Pass the fetched data (or null) and any error to the client component
  return (
    <CompanyProfileForm
      initialProfileData={initialProfileData}
      token={token} // Pass token if client component might need to re-fetch
      serverFetchError={serverFetchError}
    />
  );
}
