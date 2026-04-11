"use client";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-x-4 transition-opacity hover:opacity-75"
    >
      <div className="hidden leading-tight lg:block">
        <h2 className="text-accent-foreground text-lg font-semibold tracking-wider">
          Stoka
        </h2>
        <p className="text-muted-foreground text-sm">Erp platform</p>
      </div>
    </Link>
  );
}
