"use client";

import { usePathname } from "next/navigation";

import { useSidebar } from "@/hooks/useSidebar";


import { DashboardNav } from "./DashboardNav";
import SidebarHeader from "./SidebarHeader";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const { isCollapsed } = useSidebar();
  const pathname = usePathname();

  const isDashboardPage = pathname.includes("/dashboard");
  return (
    <aside
      className={cn(
        "border-border bg-card fixed left-0 z-50 mt-[75px] flex h-full flex-col border-r transition-all duration-100 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <SidebarHeader />
      <DashboardNav />
    </aside>
  );
}
