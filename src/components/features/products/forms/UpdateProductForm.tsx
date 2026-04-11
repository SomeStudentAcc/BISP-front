"use client";

import axiosInstance from "@/axios";
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

import { ICategory } from "@/types/category/categoty.types";
import { IImagesResponse } from "@/types/images/images.types";
import { IWarehouse } from "@/types/warehousees/warehouses.types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { IProduct } from "@/types/product/product.types";
import ProductDragAndDrop from "@/components/shared/drag-drop/ProductDragAndDrop";
import {
  TypeUpdateProduct,
  UpdateProductSchema,
} from "@/schemas/products/update-products.schema";
import ProductCahracteristics from "@/app/(dashboard)/products/ProductCahracteristics";

interface Props {
  categories: ICategory[];
  warehouses: IWarehouse[];
  product: IProduct;
}

export default function UpdateProductForm({ categories, product }: Props) {
  const router = useRouter();
  const form = useForm<TypeUpdateProduct>({
    resolver: zodResolver(UpdateProductSchema),
    values: {
      name: product.name,
      url: product.url,
      quantity: product.totalQuantity.toString(),
      categoryId: product.categoryId,
      image: [],
    },
  });

  const [existingChars, setExistingChars] = useState(
    product.characteristics || [],
  );
  const [existingImage, setExistingImage] = useState(product?.images || null);

  const [loading, setLoading] = useState(false);

  const { isValid, isDirty } = form.formState;

  async function onSubmit(data: TypeUpdateProduct) {
    console.log(data);

    const formData = new FormData();

    data.image.forEach((img) => {
      formData.append("files", img);
    });

    const uploadedImages = await axiosInstance.post<IImagesResponse[]>(
      "/file?folder=products",
      formData,
    );

    const res = await axiosInstance.patch(`product/${product.id}`, {
      name: data.name,
      url: data.url,
      images: [...existingImage, ...uploadedImages.data.map((el) => el.url)],
      categoryId: data.categoryId,
    });

    console.log(res.data);
    router.push("/products");
  }

  async function onDelete() {
    try {
      const res = await axiosInstance.delete(`product/${product.id}`);

      console.log(res.data);
      router.push("/products");
    } catch (error) {
      console.log(error);
    }
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
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem className="px-5 w-full">
                        <FormLabel>Quantity</FormLabel>

                        <FormControl>
                          <Input disabled placeholder={""} {...field} />
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
                        <ProductDragAndDrop
                          isSingle={false}
                          files={field.value || []}
                          existingImage={existingImage}
                          setExistingImage={setExistingImage}
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
              <ProductCahracteristics
                productId={product.id}
                existingChars={existingChars}
                setExistingChars={setExistingChars}
              />
            </TabsContent>
          </Tabs>

          {/* Submit */}
          <div className="flex justify-end p-5 gap-5">
            <Button disabled={!isValid || !isDirty}>Submit</Button>
            <Button type="button" variant={"destructive"} onClick={onDelete}>
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
