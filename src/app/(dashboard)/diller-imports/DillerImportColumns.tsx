"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IDillerExport } from "@/types/diller/diller.types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const dillerExportColumns: ColumnDef<IDillerExport>[] = [
  {
    accessorKey: "warehouse.name",
    header: "Warehouse",
    cell: ({ row }) => <div>{row.original.warehouse.name}</div>,
  },

  {
    accessorKey: "warehouse.address",
    header: "Address",
    cell: ({ row }) => <div>{row.original.warehouse.address}</div>,
  },

  {
    accessorKey: "items",
    header: "Total Quantity",
    cell: ({ row }) => (
      <div>
        {row.original.items.reduce((sum, item) => sum + item.quantity, 0)}
      </div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
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

          <Link href={`/diller-imports/${row.original.id}`}>
            <DropdownMenuItem>
              <Pencil className="size-4 mr-2" />
              Show
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
