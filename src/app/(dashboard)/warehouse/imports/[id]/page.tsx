import axiosInstance from "@/axios";
import CreateImportForm from "@/components/features/imports/forms/CreateImportForm";
import { IProduct } from "@/types/product/product.types";


type PageProps = {
  params: {
    id: string;
  };
};

const getProducts = async () => {
  try {
    const res = await axiosInstance.get<IProduct[]>("/product");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function CreateImportPage({ params }: PageProps) {
  const { id } = await params;

  const products = await getProducts();

  if (!products) {
    return <div>Can not fetch data</div>;
  }
  return (
    <div>
      <CreateImportForm products={products} id={id} />
    </div>
  );
}
