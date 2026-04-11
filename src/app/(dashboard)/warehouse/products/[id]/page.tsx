import axiosInstance from "@/axios";
import { DataTable } from "@/components/shared/data-table/DataTable";
import { IWarehouse } from "@/types/warehousees/warehouses.types";
import { warehouseProductsColumns } from "../WarehouseProductsColumns";

type PageProps = {
  params: {
    id: string;
  };
};

const getWarehouseById = async (id: string) => {
  try {
    const res = await axiosInstance.get<IWarehouse>(`/warehouse/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function WarehouseProductsPage({ params }: PageProps) {
  const { id } = await params;

  const warehouse = await getWarehouseById(id);

  if (!warehouse) {
    return <div>no such warehouse</div>;
  }

  return (
    <div className="mt-3 px-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Warehouse products</h1>
      </div>
      <DataTable
        columns={warehouseProductsColumns}
        data={warehouse.warehouseProducts}
        filterKey="name"
      />
    </div>
  );
}
