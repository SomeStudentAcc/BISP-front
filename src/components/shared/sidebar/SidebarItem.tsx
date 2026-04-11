import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSidebar } from "@/hooks/useSidebar";

import { Route } from "./route.interface";
import Hitnt from "./Hitnt";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  route: Route;
}

export default function SidebarItem({ route }: Props) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  const isActive = pathname == route.href;

  return isCollapsed ? (
    <Hitnt label={route.label} side="right" asChild>
      <Button
        className={cn("h-11 w-full justify-center", isActive && "bg-accent")}
        variant={"ghost"}
        asChild
      >
        <Link href={route.href}>
          <route.icon className="mr-0 size-5" />
        </Link>
      </Button>
    </Hitnt>
  ) : (
    <Button
      className={cn("h-11 w-full justify-start", isActive && "bg-accent")}
      variant={"ghost"}
      asChild
    >
      <Link href={route.href} className="flex items-start gap-x-4">
        <route.icon className="mr-0 size-5" />
        {route.label}
      </Link>
    </Button>
  );
}
