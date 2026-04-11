"use client";

import axiosInstance from "@/axios";
import DragAndDrop from "@/components/shared/drag-drop/DragAndDrop";
import FormWrapper from "@/components/shared/form-wrapper/FormWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  TypeUpdateCategory,
  UpdateCategorySchema,
} from "@/schemas/categories/update-category.schema";
import { ICategory } from "@/types/category/categoty.types";
import { IImagesResponse } from "@/types/images/images.types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useFieldArray, useForm } from "react-hook-form";

interface Props {
  category: ICategory;
  categoryId: string;
}

export default function ChangeCategoryForm({ category, categoryId }: Props) {
  const router = useRouter();
  const form = useForm<TypeUpdateCategory>({
    resolver: zodResolver(UpdateCategorySchema),
    values: {
      name: category?.name,
      url: category?.url,
      image: [],
    },
  });

  const [existingChars, setExistingChars] = useState(category.characteristics);
  const [existingImage, setExistingImage] = useState(
    category?.image ? [category.image] : [],
  );

  // Update the name of a characteristic
  const handleChange = (id: string, value: string) => {
    setExistingChars((prev) =>
      prev.map((el) => (el.id === id ? { ...el, name: value } : el)),
    );
  };

  // Remove a characteristic
  const handleRemove = (id: string) => {
    setExistingChars((prev) => prev.filter((el) => el.id !== id));
  };

  const [loading, setLoading] = useState(false);

  const { isValid } = form.formState;

  async function onSubmit(data: TypeUpdateCategory) {
    console.log(data);
    const formData = new FormData();

    data?.image?.forEach((img) => {
      formData.append("files", img);
    });

    const uploadedImages = await axiosInstance.post<IImagesResponse[]>(
      "/file?folder=categories",
      formData,
    );

    try {
      const payload: any = {
        name: data?.name,

        url: data.url,
        image: uploadedImages.data,
      };

      const res = await axiosInstance.patch(`category/${categoryId}`, payload);
      console.log(res.data);
      router.push("/categories");
    } catch (error) {
      console.log(error);
    }
  }
  async function onDelete() {
    try {
      const res = await axiosInstance.delete(`category/${categoryId}`);
      console.log(res.data);
      router.push("/categories");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FormWrapper heading={"Change category"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          <div className="space-y-3">
            <div className="flex flex-col lg:flex-row  gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="px-5 w-full">
                    <FormLabel>Name</FormLabel>

                    <FormControl>
                      <Input placeholder={""} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="px-5 w-full">
                    <FormLabel>Url</FormLabel>

                    <FormControl>
                      <Input placeholder={""} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="px-5 w-full">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <DragAndDrop
                      isSingle
                      existingImage={existingImage}
                      setExistingImage={setExistingImage}
                      files={field.value || []}
                      onChange={field.onChange}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Drag and drop your image here
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end p-5 gap-5">
            <Button disabled={!isValid}>Submit</Button>
            <Button type="button" variant={"destructive"} onClick={onDelete}>
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}

/* export function ChangeInfoFormSkeleton() {
  return <Skeleton className="h-96 w-full" />;
}
 */
