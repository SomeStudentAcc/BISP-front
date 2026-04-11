import { DataTable } from "@/components/shared/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getAccessToken } from "@/axios/services";
import axiosInstance from "@/axios";
import { productColumns } from "./ProductColumns";

const getProducts = async () => {
  try {
    const res = await axiosInstance.get("/product");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function ProductsPage() {
  const products = await getProducts();

  if (!products) {
    return <div> no data</div>;
  }

  return (
    <div className="mt-3 px-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Products</h1>
        <div>
          <Link href={"/products/create"}>
            <Button>
              <Plus />
              Create
            </Button>
          </Link>
        </div>
      </div>
      <DataTable columns={productColumns} data={products} filterKey="name" />
    </div>
  );
}
