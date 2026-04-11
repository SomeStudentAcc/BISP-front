"use client";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

import { useSidebar } from "@/hooks/useSidebar";
import { Button } from "@/components/ui/button";
import Hitnt from "./Hitnt";

export default function SidebarHeader() {
  const pathname = usePathname();

  const { isCollapsed, close, open } = useSidebar();
  const label = isCollapsed ? "expand" : "collapse";

  return isCollapsed ? (
    <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
      <Hitnt label={label} side="right" asChild>
        <Button onClick={() => open()} variant="ghost" size={"icon"}>
          <ArrowRightFromLine className="size-4" />
        </Button>
      </Hitnt>
    </div>
  ) : (
    <div className="mb-2 flex w-full items-center justify-between p-3 pl-4">
      <h2 className="text-foreground text-lg font-semibold">Navigation</h2>
      <Hitnt label={label} side="right" asChild>
        <Button onClick={() => close()} variant="ghost" size={"icon"}>
          <ArrowLeftFromLine className="size-4" />
        </Button>
      </Hitnt>
    </div>
  );
}
