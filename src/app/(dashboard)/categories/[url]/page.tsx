import axiosInstance from "@/axios";
import ChangeCategoryForm from "@/components/features/categories/forms/ChangeCategoryForm";
import { ICategory } from "@/types/category/categoty.types";
import React from "react";

type PageProps = {
  params: {
    url: string;
  };
};

const getCategoryByUrl = async (url: string) => {
  try {
    const res = await axiosInstance.get<ICategory>(`/category/${url}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function CategotySiglePage({ params }: PageProps) {
  const { url } = await params;

  const category = await getCategoryByUrl(url);

  if (!category) {
    return <div>no such category</div>;
  }

  return (
    <div>
      <ChangeCategoryForm category={category} categoryId={url}/>
    </div>
  );
}
