"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Boxes, Download, Import, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IWarehouse } from "@/types/warehousees/warehouses.types";

export const warehouseColumns: ColumnDef<IWarehouse>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },

  {
    accessorKey: "manager",
    header: "Manager",
    cell: ({ row }) => <span>{row.original.manager}</span>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <span>{row.original.phone}</span>,
  },
/*   {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <span>{row.original.products.length}</span>,
  }, */
  {
    accessorKey: "actions",
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
          <Link href={`/warehouse/${row.original.id}`}>
            <DropdownMenuItem>
              <Pencil className="size-4 mr-2" />
              Edit
            </DropdownMenuItem>
          </Link>
          <Link href={`/warehouse/imports/${row.original.id}`}>
            <DropdownMenuItem>
              <Import className="size-4 mr-2" />
              Import products
            </DropdownMenuItem>
          </Link>
          <Link href={`/warehouse/exports/${row.original.id}`}>
            <DropdownMenuItem>
              <Download className="size-4 mr-2" />
              Export products
            </DropdownMenuItem>
          </Link>
          <Link href={`/warehouse/products/${row.original.id}`}>
            <DropdownMenuItem>
              <Boxes className="size-4 mr-2" />
              Warehouse products
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
