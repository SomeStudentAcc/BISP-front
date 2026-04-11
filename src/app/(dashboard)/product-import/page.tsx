import { DataTable } from "@/components/shared/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/axios";
import { importColumns } from "./ImportColumns";

const getImports = async () => {
  try {
    const res = await axiosInstance.get("/imports");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function ProductImportPage() {
  const imports = await getImports();

  if (!imports) {
    return <div> no data</div>;
  }

  return (
    <div className="mt-3 px-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Imports</h1>
        <div>
          <Link href={"/product-import/create"}>
            <Button>
              <Plus />
              Create
            </Button>
          </Link>
        </div>
      </div>
      <DataTable columns={importColumns} data={imports} />
    </div>
  );
}
