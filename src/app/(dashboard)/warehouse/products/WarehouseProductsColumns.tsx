"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IProduct } from "@/types/product/product.types";
import { IWarehouseProduct } from "@/types/warehousees/warehouses.types";

export const warehouseProductsColumns: ColumnDef<IWarehouseProduct>[] = [
  {
    id: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    accessorFn: (row) => row.product.name,
  },

  {
    id: "image",
    header: "Image",
    cell: ({ row }) => (
      <div>
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${row.original.product.images[0]}`}
          width={80}
          height={80}
          alt={row.original.product.name}
          className="rounded-md object-cover"
        />
      </div>
    ),
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Quantity
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Created",
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

          <Link href={`/products/${row.original.id}`}>
            <DropdownMenuItem>
              <Pencil className="size-4 mr-2" />
              Edit
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
