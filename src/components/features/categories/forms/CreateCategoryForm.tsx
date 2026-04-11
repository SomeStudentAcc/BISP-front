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
  CreateCategorySchema,
  TypeCreateCategory,
} from "@/schemas/categories/create-category.schema";
import { IImagesResponse } from "@/types/images/images.types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useFieldArray, useForm } from "react-hook-form";

export default function CreatecategoryForm() {
  const router = useRouter();
  const form = useForm<TypeCreateCategory>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: "",
      url: "",
      image: [],
    },
  });

  const [loading, setLoading] = useState(false);

  const { isValid, isDirty } = form.formState;

  async function onSubmit(data: TypeCreateCategory) {
    console.log(data);

    const formData = new FormData();

    data.image.forEach((img) => {
      formData.append("files", img);
    });

    const uploadedImages = await axiosInstance.post<IImagesResponse[]>(
      "/file?folder=categories",
      formData,
    );

    const res = await axiosInstance.post("category/", {
      name: data.name,
      url: data.url,
      image: uploadedImages.data,
    });

    console.log(res.data);
    router.push("/categories");
  }

  return (
    <FormWrapper heading={"Create category"}>
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
          <div className="flex justify-end p-5">
            <Button disabled={!isValid || !isDirty}>Submit</Button>
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
