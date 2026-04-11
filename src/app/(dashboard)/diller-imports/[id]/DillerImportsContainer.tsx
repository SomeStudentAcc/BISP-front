import { IExport } from "@/types/exports/exports.types";
import React from "react";

interface DillerImportsContainerProps {
  exportItem: IExport;
}

export default function DillerImportsContainer({
  exportItem,
}: DillerImportsContainerProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Export Details</h1>
        <p className="text-muted-foreground text-sm">
          {new Date(exportItem.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Warehouse & Diller */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 space-y-1">
          <h2 className="font-semibold text-sm text-muted-foreground">
            Warehouse
          </h2>
          <p className="font-medium">{exportItem.warehouse.name}</p>
          <p className="text-sm">{exportItem.warehouse.address}</p>
          <p className="text-sm">{exportItem.warehouse.phone}</p>
          {exportItem.warehouse.manager && (
            <p className="text-sm text-muted-foreground">
              Manager: {exportItem.warehouse.manager}
            </p>
          )}
        </div>

        <div className="border rounded-lg p-4 space-y-1">
          <h2 className="font-semibold text-sm text-muted-foreground">
            Diller
          </h2>
          <p className="font-medium">{exportItem.diller.username}</p>
          <p className="text-sm">{exportItem.diller.email}</p>
        </div>
      </div>

      {/* Items */}
      <div className="border rounded-lg p-4 space-y-3">
        <h2 className="font-semibold">Items</h2>
        <div className="divide-y">
          {exportItem.items.map((item) => (
            <div key={item.id} className="py-3 flex justify-between text-sm">
              <span className="text-muted-foreground">{item.product.name}</span>
              <span className="font-medium">x{item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="pt-2 flex justify-between font-semibold border-t">
          <span>Total</span>
          <span>
            {exportItem.items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
