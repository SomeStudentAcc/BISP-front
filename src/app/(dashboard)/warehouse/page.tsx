import { DataTable } from "@/components/shared/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getAccessToken } from "@/axios/services";
import axiosInstance from "@/axios";
import { warehouseColumns } from "./WarehouseColumns";

const getWarehouses = async () => {
  try {
    const res = await axiosInstance.get("/warehouse");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function WarehousesPage() {
  const warehouses = await getWarehouses();

  if (!warehouses) {
    return <div> no data</div>;
  }

  return (
    <div className="mt-3 px-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Warehouses</h1>
        <div>
          <Link href={"/warehouse/create"}>
            <Button>
              <Plus />
              Create
            </Button>
          </Link>
        </div>
      </div>
      <DataTable
        columns={warehouseColumns}
        data={warehouses}
        filterKey="name"
      />
    </div>
  );
}
