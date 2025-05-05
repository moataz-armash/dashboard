"use client";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
export default function CompanyDashboard() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    redirect("/dashboard/company/home");
  } else {
    return;
  }
}
