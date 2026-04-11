import axiosInstance from "@/axios";
import CreateImportForm from "@/components/features/imports/forms/CreateImportForm";
import { IProduct } from "@/types/product/product.types";
import { IWarehouse } from "@/types/warehousees/warehouses.types";
import React from "react";

const getProducts = async () => {
  try {
    const res = await axiosInstance.get<IProduct[]>("/product");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getWarehouses = async () => {
  try {
    const res = await axiosInstance.get<IWarehouse[]>("/warehouse");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function CreateImportPage() {
  const products = await getProducts();

  const warehouses = await getWarehouses();

  if (!products || !warehouses) {
    return <div>Can not fetch data</div>;
  }
  return (
    <div>
{/*       <CreateImportForm products={products} warehouses={warehouses} />
 */}    </div>
  );
}
