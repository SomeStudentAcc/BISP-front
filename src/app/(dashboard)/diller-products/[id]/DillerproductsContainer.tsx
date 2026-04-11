import React from "react";
import Image from "next/image";
import { IProduct } from "@/types/product/product.types";

interface Props {
  product: IProduct;
}

export default function DillerproductsContainer({ product }: Props) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">{product.name}</h1>

      {/* Images */}
      <div className="flex gap-3">
        {product.images.map((img, i) => (
          <Image
            key={i}
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${img}`}
            width={160}
            height={160}
            alt={product.name}
            className="rounded-lg object-cover"
          />
        ))}
      </div>

      {/* Characteristics */}
      {product.characteristics?.length > 0 && (
        <div className="border rounded-lg p-4 space-y-2">
          <h2 className="font-semibold">Characteristics</h2>
          <div className="divide-y">
            {product.characteristics.map((c) => (
              <div key={c.id} className="py-2 flex justify-between text-sm">
                <span className="text-muted-foreground">{c.title}</span>
                <span className="font-medium">{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
