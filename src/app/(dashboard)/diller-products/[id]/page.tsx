import axiosInstance from "@/axios";
import React from "react";import { IExport } from "@/types/exports/exports.types";
import { IProduct } from "@/types/product/product.types";
import DillerproductsContainer from "./DillerproductsContainer";

type PageProps = {
  params: {
    id: string;
  };
};

const getProduct = async (id: string) => {
  try {
    const res = await axiosInstance.get<IProduct>(`/product/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function DillerProductIdPage({ params }: PageProps) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    return <div> no data</div>;
  }

  return <DillerproductsContainer product={product} />;
}
