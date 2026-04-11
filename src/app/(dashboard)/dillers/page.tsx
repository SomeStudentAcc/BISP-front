import { DataTable } from "@/components/shared/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/axios";
import { dillerColumns } from "./DillerColumns";

const getDillers = async () => {
  try {
    const res = await axiosInstance.get("/diller");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function DillersPage() {
  const dillers = await getDillers();

  if (!dillers) {
    return <div> no data</div>;
  }

  return (
    <div className="mt-3 px-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Dillers</h1>
        <div>
          <Link href={"/dillers/create"}>
            <Button>
              <Plus />
              Create
            </Button>
          </Link>
        </div>
      </div>
      <DataTable columns={dillerColumns} data={dillers} filterKey="name" />
    </div>
  );
}
