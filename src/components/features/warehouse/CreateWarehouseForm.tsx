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
  CreateWarehouseSchema,
  TypeCreateWarehouse,
} from "@/schemas/warehouse/create-warehouse.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";

export default function CreateWarehouseForm() {
  const router = useRouter();
  const form = useForm<TypeCreateWarehouse>({
    resolver: zodResolver(CreateWarehouseSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      manager: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const { isValid, isDirty } = form.formState;

  async function onSubmit(data: TypeCreateWarehouse) {
    console.log(data);

    const res = await axiosInstance.post("warehouse/", {
      ...data,
    });

    console.log(res.data);
    router.push("/warehouse");
  }

  return (
    <FormWrapper heading={"Create warehouse"}>
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
          <div className="flex justify-end p-5">
            <Button disabled={!isValid || !isDirty}>Submit</Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
