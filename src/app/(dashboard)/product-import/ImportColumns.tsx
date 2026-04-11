"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Eye } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IImport } from "@/types/imports/imports.types";

export const importColumns: ColumnDef<IImport>[] = [
  {
    accessorKey: "id",
    header: "Import ID",
  },

  {
    accessorKey: "companyId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Company
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },

  {
    accessorKey: "products",
    header: "Products Count",
    cell: ({ row }) => <span>{row.original.products?.length || 0}</span>,
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <Link href={`/imports/${row.original.id}`}>
            <DropdownMenuItem>
              <Eye className="size-4 mr-2" />
              View
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
