import { cookies } from "next/headers";
import RegisterCompanyForm from "./form";
import { redirect } from "next/navigation";

export default async function RegisterCompanyPage() {
  const userCookies = await cookies();
  const comapnyId = userCookies.get("companyId")?.value;
  if (comapnyId) redirect("/dashboard/company/profile");
  return <RegisterCompanyForm />;
}
