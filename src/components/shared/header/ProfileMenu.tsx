"use client";
import { LayoutDashboard, Loader, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/hooks/useAuth";
import { useCurrent } from "@/hooks/useCurrent";
import UserAvatar from "../avatar/UserAvatar";

export default function ProfileMenu() {
  const router = useRouter();
  const { exit } = useAuth();
  const { user, isLoadingProfile } = useCurrent();

  return isLoadingProfile || !user ? (
    <Loader className="text-muted-foreground size-6 animate-spin" />
  ) : (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[230px]">
          <div className="flex items-center gap-x-3 p-2">
            <UserAvatar />
            <h2 className="text-foreground font-medium">{user.username}</h2>
          </div>
          <DropdownMenuSeparator />
          <Link href={`/${user.username}`}>
            <DropdownMenuItem>
              <User className="mr-2 size-4" />
              item 1
            </DropdownMenuItem>
          </Link>
          <Link href={`/dashboard/settings`}>
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2 size-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => exit()}>
            <LogOut className="mr-2 size-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
