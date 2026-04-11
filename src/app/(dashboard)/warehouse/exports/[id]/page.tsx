import axiosInstance from "@/axios";
import CreateExportForm from "@/components/features/exports/forms/CreateExportForm";
import CreateImportForm from "@/components/features/imports/forms/CreateImportForm";
import { IProduct } from "@/types/product/product.types";
import { IWarehouse } from "@/types/warehousees/warehouses.types";

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

const getDillers = async () => {
  try {
    const res = await axiosInstance.get("/diller");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function CreateImportPage({ params }: PageProps) {
  const { id } = await params;

  const products = await getWarehouseById(id);

  const dillers = await getDillers();

  if (!products || !dillers) {
    return <div>Can not fetch data</div>;
  }
  return (
    <div>
      <CreateExportForm products={products.warehouseProducts} id={id} dillers={dillers} />
    </div>
  );
}
