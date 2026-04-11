import axiosInstance from "@/axios";
import ChangeDillerForm from "@/components/features/diller/forms/ChangeDillerForm";
import ChangeWarehouseForm from "@/components/features/warehouse/ChangeWarehouseForm";
import { IDiller } from "@/types/diller/diller.types";

type PageProps = {
  params: {
    id: string;
  };
};

const getDillerById = async (id: string) => {
  try {
    const res = await axiosInstance.get<IDiller>(`/diller/${id}/`);
    console.log(res?.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function ChangeDillerPage({ params }: PageProps) {
  const { id } = await params;

  const diller = await getDillerById(id);

  if (!diller) {
    return <div>no such diller</div>;
  }

  return (
    <div>
      <ChangeDillerForm diller={diller} />
    </div>
  );
}
