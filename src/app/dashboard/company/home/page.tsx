"use client";

import {
  Store,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const stats = [
  //   { icon: Briefcase, label: "Companies", value: 10, color: "text-blue-600 bg-blue-100" },
  {
    icon: Store,
    label: "Stores",
    value: 50,
    color: "text-blue-600 bg-blue-100",
  },
  {
    icon: Users,
    label: "Workers",
    value: 120,
    color: "text-yellow-600 bg-yellow-100",
  },
  {
    icon: Package,
    label: "Products",
    value: 350,
    color: "text-purple-600 bg-purple-100",
  },
  {
    icon: DollarSign,
    label: "Revenue",
    value: "$50K",
    color: "text-green-600 bg-green-100",
    trend: { value: "+5%", icon: TrendingUp, trendColor: "text-green-500" },
  },
  {
    icon: DollarSign,
    label: "Pending Settlements",
    value: "$5K",
    color: "text-red-600 bg-red-100",
    trend: { value: "-2%", icon: TrendingDown, trendColor: "text-red-500" },
  },
];

export default function CompanyHome() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">A101 Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition cursor-pointer"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon size={32} />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-gray-500">{stat.label}</CardTitle>
              <p className="text-xl font-semibold">{stat.value}</p>
              {stat.trend && (
                <div className="text-sm flex items-center space-x-1">
                  <stat.trend.icon
                    size={16}
                    className={stat.trend.trendColor}
                  />
                  <span>{stat.trend.value}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
