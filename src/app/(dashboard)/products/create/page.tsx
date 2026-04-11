import axiosInstance from "@/axios";
import CreateProductForm from "@/components/features/products/forms/CreateProductForm";
import { ICategory } from "@/types/category/categoty.types";
import { IWarehouse } from "@/types/warehousees/warehouses.types";
import React from "react";

const getCategories = async () => {
  try {
    const res = await axiosInstance.get<ICategory[]>("/category");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getWarehouses = async () => {
  try {
    const res = await axiosInstance.get<IWarehouse[]>("/warehouse");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function ProductCreate() {
  const categories = await getCategories();
  const warehouses = await getWarehouses();
  if (!categories || !warehouses) {
    return <div>can not fetch categories and warehouses</div>;
  }
  return (
    <div>
      <CreateProductForm categories={categories} warehouses={warehouses} />
    </div>
  );
}
