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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  CreateProductSchema,
  TypeCreateProduct,
} from "@/schemas/products/create-products.schema";
import { ICategory } from "@/types/category/categoty.types";
import { IImagesResponse } from "@/types/images/images.types";
import { IWarehouse } from "@/types/warehousees/warehouses.types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useFieldArray, useForm } from "react-hook-form";
import WarehouseSelector from "../WarehouseSelector";

interface Props {
  categories: ICategory[];
  warehouses: IWarehouse[];
}

export default function CreateProductForm({ categories, warehouses }: Props) {
  const router = useRouter();
  const form = useForm<TypeCreateProduct>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      url: "",
      categoryId: "",
      image: [],
      characteristics: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "characteristics",
  });

  const [loading, setLoading] = useState(false);

  const { isValid, isDirty } = form.formState;

  async function onSubmit(data: TypeCreateProduct) {
    console.log(data);

    const formData = new FormData();

    data.image.forEach((img) => {
      formData.append("files", img);
    });

    const uploadedImages = await axiosInstance.post<IImagesResponse[]>(
      "/file?folder=products",
      formData,
    );

    const res = await axiosInstance.post("product/", {
      name: data.name,
      url: data.url,
      images: uploadedImages.data.map((el) => el.url),
      categoryId: data.categoryId,
      characteristics: data.characteristics,
    });

    console.log(res.data);
    router.push("/products");
  }

  return (
    <FormWrapper heading={"Create product"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          <Tabs defaultValue="info" className="mt-2 w-full px-5">
            <TabsList className="grid  grid-cols-5">
              <TabsTrigger value="info">Product information</TabsTrigger>
              <TabsTrigger value="chars">Product characteristics</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
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
                </div>
                <div className="flex flex-col lg:flex-row  gap-3">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem className="px-5 w-full">
                        <FormLabel>Category</FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent className="w-full">
                            <SelectGroup className="w-full">
                              {categories.map((el) => (
                                <SelectItem key={el.id} value={el.id}>
                                  {el.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
            </TabsContent>
            <TabsContent value="chars">
              <div className="flex flex-col gap-3 px-5">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-end">
                    <FormField
                      control={form.control}
                      name={`characteristics.${index}.title`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Characteristic title</FormLabel>
                          <FormControl>
                            <Input placeholder="Title" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`characteristics.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Characteristic value</FormLabel>
                          <FormControl>
                            <Input placeholder="Value" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ title: "", value: "" })}
                >
                  Add field
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Submit */}
          <div className="flex justify-end p-5">
            <Button disabled={!isValid || !isDirty}>Submit</Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
