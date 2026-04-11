import {
  Banknote,
  Box,
  Warehouse,
  Contact,
  TrendingUp,
  Boxes,
  Import,
  Download,
  BadgeDollarSign,
} from "lucide-react";

import SidebarItem from "./SidebarItem";
import type { Route } from "./route.interface";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export function DashboardNav() {
  const [role, setRole] = useState("");
  const cookies = parseCookies();

  useEffect(() => {
    const role = cookies["role"];
    setRole(role);
  }, []);

  const routes: Route[] = [
    {
      label: "statistics",
      href: "/statistics",
      role: ["OWNER", "ADMIN"],
      icon: TrendingUp,
    },
    {
      label: "products",
      href: "/products",
      role: ["OWNER", "ADMIN"],

      icon: Box,
    },
    {
      label: "categories",
      href: "/categories",
      role: ["OWNER", "ADMIN"],

      icon: Boxes,
    },

    {
      label: "warehouse",
      href: "/warehouse",
      role: ["OWNER", "ADMIN"],

      icon: Warehouse,
    },
    {
      label: "dillers",
      href: "/dillers",
      role: ["OWNER", "ADMIN"],
      icon: Contact,
    },

    {
      label: "my imports",
      href: "/diller-imports",
      role: ["DILLER"],
      icon: Download,
    },
    {
      label: "my products",
      href: "/diller-products",
      role: ["DILLER"],
      icon: Box,
    },
  ];

  return (
    <div className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => {
        if (route.role.includes(role)) {
          return <SidebarItem key={route.href} route={route} />;
        }
        return null;
      })}
    </div>
  );
}
