import { DataTable } from "@/components/shared/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { categoriesColumns } from "./CategoriesColumns";
import { getAccessToken } from "@/axios/services";
import axiosInstance from "@/axios";

const getCategories = async () => {
  try {
    const res = await axiosInstance.get("/category");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  if (!categories) {
    return <div> no data</div>;
  }

  return (
    <div className="mt-3 px-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Categories</h1>
        <div>
          <Link href={"/categories/create"}>
            <Button>
              <Plus />
              Create
            </Button>
          </Link>
        </div>
      </div>
      <DataTable
        columns={categoriesColumns}
        data={categories}
        filterKey="name"
      />
    </div>
  );
}
