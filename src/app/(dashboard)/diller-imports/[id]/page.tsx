import axiosInstance from "@/axios";
import React from "react";
import DillerImportsContainer from "./DillerImportsContainer";
import { IExport } from "@/types/exports/exports.types";

type PageProps = {
  params: {
    id: string;
  };
};

const getExport = async (id: string) => {
  try {
    const res = await axiosInstance.get<IExport>(`/exports/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function DillerImportIdPage({ params }: PageProps) {
  const { id } = await params;

  const exportItem = await getExport(id);

  if (!exportItem) {
    return <div> no data</div>;
  }

  return <DillerImportsContainer exportItem={exportItem} />;
}
