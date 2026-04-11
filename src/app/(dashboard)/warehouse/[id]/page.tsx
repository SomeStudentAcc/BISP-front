import axiosInstance from "@/axios";
import ChangeWarehouseForm from "@/components/features/warehouse/ChangeWarehouseForm";
import { IWarehouse } from "@/types/warehousees/warehouses.types";

type PageProps = {
  params: {
    id: string;
  };
};

const getCategoryByUrl = async (id: string) => {
  try {
    const res = await axiosInstance.get<IWarehouse>(`/warehouse/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function ChangeWarehousePage({ params }: PageProps) {
  const { id } = await params;

  const warehouse = await getCategoryByUrl(id);

  if (!warehouse) {
    return <div>no such warehouse</div>;
  }

  return (
    <div>
      <ChangeWarehouseForm warehouse={warehouse} warehouseId={id}/>
    </div>
  );
}
