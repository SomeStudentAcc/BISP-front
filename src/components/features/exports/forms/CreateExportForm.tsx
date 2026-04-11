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
  CreateExportSchema,
  TypeCreateExport,
} from "@/schemas/exports/create-export.schema";
import { IDiller } from "@/types/diller/diller.types";
import { IWarehouseProduct } from "@/types/warehousees/warehouses.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface Props {
  products: IWarehouseProduct[];
  id: string;
  dillers: IDiller[];
}

export default function CreateExportForm({ products, id, dillers }: Props) {
  const router = useRouter();
  const form = useForm<TypeCreateExport>({
    resolver: zodResolver(CreateExportSchema),
    defaultValues: {
      products: [],
      dillerUserId: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const [loading, setLoading] = useState(false);
  const { isValid, isDirty } = form.formState;

  // Watch dillerUserId to conditionally enable the products section
  const selectedDiller = form.watch("dillerUserId");

  async function onSubmit(data: TypeCreateExport) {
    try {
      setLoading(true);
      console.log(data);

      const res = await axiosInstance.post(`/warehouse/export/${id}`, {
        products: data.products,
        dillerUserId: data.dillerUserId,
      });
      console.log(res);

      router.push("/warehouse");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormWrapper heading={"Create Export"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3 px-5">
            {/* Step 1 — Diller selection */}
            <FormField
              control={form.control}
              name="dillerUserId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diller</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val);
                      // Clear products when diller changes
                      form.setValue("products", []);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select diller" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {dillers.map((diller) => (
                          <SelectItem key={diller.id} value={diller.userId}>
                            {diller.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Step 2 — Products (only enabled after diller is chosen) */}
            <div
              className={
                !selectedDiller ? "opacity-50 pointer-events-none" : ""
              }
            >
              <p className="text-sm font-medium mb-2">
                Products{" "}
                {!selectedDiller && (
                  <span className="text-xs text-muted-foreground ml-1">
                    — select a diller first
                  </span>
                )}
              </p>

              <div className="space-y-4">
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
                                      value={product.productId}
                                    >
                                      {product.product.name}
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
                  className="w-full"
                  disabled={!selectedDiller}
                  onClick={() => append({ productId: "", quantity: 1 })}
                >
                  + Add Product
                </Button>
              </div>
            </div>
          </div>

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
