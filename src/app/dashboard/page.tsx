import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Redirect to the default dashboard (Company in this case)
  redirect("/dashboard/company/home");
}
