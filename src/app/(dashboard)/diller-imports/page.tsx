import { DataTable } from "@/components/shared/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/axios";
import {
  dillerExportColumns,
} from "./DillerImportColumns";
import { IDiller, IDillerExport, IDillerProduct } from "@/types/diller/diller.types";

const getDiller = async () => {
  try {
    const res = await axiosInstance.get<IDiller>("/diller/me");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getImports = async (id: string) => {
  try {
    const res = await axiosInstance.get<IDillerExport[]>(
      `/diller/exports/${id}`,
    );
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function DillerImportsPage() {
  const diller = await getDiller();
  if (!diller) {
    return <div> no data</div>;
  }
  const imports = await getImports(diller.id);

  if (!imports) {
    return <div> no data</div>;
  }

  return (
    <div className="mt-3 px-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold mb-5">Imports</h1>
      </div>
      <DataTable columns={dillerExportColumns} data={imports} />
    </div>
  );
}
