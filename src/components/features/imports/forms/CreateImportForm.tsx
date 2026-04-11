"use client";

import axiosInstance from "@/axios";
import FormWrapper from "@/components/shared/form-wrapper/FormWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import {
  CreateImportSchema,
  TypeCreateImport,
} from "@/schemas/imports/create-import.schema";
import { IProduct } from "@/types/product/product.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface Props {
  products: IProduct[];
  id: string
}

export default function CreateImportForm({ products, id }: Props) {
  const router = useRouter();
  const form = useForm<TypeCreateImport>({
    resolver: zodResolver(CreateImportSchema),
    defaultValues: {
      products: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const [loading, setLoading] = useState(false);
  const { isValid, isDirty } = form.formState;

  async function onSubmit(data: TypeCreateImport) {
    try {
      console.log(data);

      setLoading(true);
      const res = await axiosInstance.post(`warehouse/import/${id}`, {
        products: data.products,
      });
      console.log(res.data);
      setLoading(false);
      router.push("/warehouse");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormWrapper heading={"Create Import"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <div className="px-5 space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex justify-between items-center gap-10"
                >
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    {/* Product Select */}
                    <FormField
                      control={form.control}
                      name={`products.${index}.productId`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Product</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select product" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                {products.map((product) => (
                                  <SelectItem
                                    key={product.id}
                                    value={product.id}
                                  >
                                    {product.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    {/* Quantity */}
                    <FormField
                      control={form.control}
                      name={`products.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Quantity"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Remove button */}
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              {/* Add button */}
              <Button
                type="button"
                className="w-full"
                onClick={() =>
                  append({ productId: "", quantity: 1 })
                }
              >
                + Add Product
              </Button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end p-5">
            <Button disabled={!isValid || !isDirty || loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
