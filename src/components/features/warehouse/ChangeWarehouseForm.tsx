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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  TypeUpdateWarehouse,
  UpdateWarehouseSchema,
} from "@/schemas/warehouse/update-warehouse.schema";
import { IWarehouse } from "@/types/warehousees/warehouses.types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";

interface Props {
  warehouse: IWarehouse;
  warehouseId: string;
}

export default function ChangeWarehouseForm({ warehouse, warehouseId }: Props) {
  const router = useRouter();
  const form = useForm<TypeUpdateWarehouse>({
    resolver: zodResolver(UpdateWarehouseSchema),
    values: {
      name: warehouse.name,
      address: warehouse.address,
      phone: warehouse.phone,
      manager: warehouse.manager,
    },
  });

  const [loading, setLoading] = useState(false);

  const { isValid, isDirty } = form.formState;

  async function onSubmit(data: TypeUpdateWarehouse) {
    console.log(data);

    const res = await axiosInstance.patch(`warehouse/${warehouseId}`, {
      ...data,
    });

    console.log(res.data);
    router.push("/warehouse");
  }

  async function onDelete() {
    try {
      const res = await axiosInstance.delete(`warehouse/${warehouseId}`);

      console.log(res.data);
      router.push("/warehouse");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FormWrapper heading={"Change warehouse"}>
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
                name="address"
                render={({ field }) => (
                  <FormItem className="px-5 w-full">
                    <FormLabel>Address</FormLabel>

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
                name="manager"
                render={({ field }) => (
                  <FormItem className="px-5 w-full">
                    <FormLabel>Manager</FormLabel>

                    <FormControl>
                      <Input placeholder={""} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="px-5 w-full">
                    <FormLabel>Phone</FormLabel>

                    <FormControl>
                      <Input placeholder={""} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end p-5 gap-4">
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
