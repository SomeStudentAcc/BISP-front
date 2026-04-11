import { DataTable } from "@/components/shared/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/axios";
import { dillerProductColumns } from "./DillerProductColumns";
import { IDiller, IDillerProduct } from "@/types/diller/diller.types";
import { IProduct } from "@/types/product/product.types";

const getDiller = async () => {
  try {
    const res = await axiosInstance.get<IDiller>("/diller/me");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async (id: string) => {
  try {
    const res = await axiosInstance.get<IDillerProduct[]>(
      `/diller/inventory/${id}`,
    );
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function DillerProductsPage() {
  const diller = await getDiller();
  if (!diller) {
    return <div> no data</div>;
  }
  const products = await getProducts(diller.id);

  if (!products) {
    return <div> no data</div>;
  }

  return (
    <div className="mt-3 px-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold mb-5">Products</h1>
      </div>
      <DataTable columns={dillerProductColumns} data={products} />
    </div>
  );
}
