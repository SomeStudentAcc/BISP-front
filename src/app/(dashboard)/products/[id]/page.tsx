import axiosInstance from "@/axios";
import UpdateProductForm from "@/components/features/products/forms/UpdateProductForm";
import { ICategory } from "@/types/category/categoty.types";
import { IProduct } from "@/types/product/product.types";
import { IWarehouse } from "@/types/warehousees/warehouses.types";

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

const getProductById = async (id: string) => {
  try {
    const res = await axiosInstance.get<IProduct>(`product/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ProductUpdate({ params }: PageProps) {
  const { id } = await params;
  const categories = await getCategories();
  const warehouses = await getWarehouses();
  
  const product = await getProductById(id);
  console.log(product);
  if (!categories || !warehouses) {
    return <div>can not fetch categories and warehouses</div>;
  }

  if (!product) {
    return <div>can not fetch product</div>;
  }
  return (
    <div>
      <UpdateProductForm
        categories={categories}
        warehouses={warehouses}
        product={product}
      />
    </div>
  );
}
