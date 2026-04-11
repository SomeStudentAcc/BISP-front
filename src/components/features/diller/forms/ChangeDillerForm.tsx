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
  TypeUpdateDiller,
  UpdateDillerSchema,
} from "@/schemas/dillers/update-diller.schema";
import { IDiller } from "@/types/diller/diller.types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";

interface Props {
  diller: IDiller;
}

export default function ChangeDillerForm({ diller }: Props) {
  const router = useRouter();
  const form = useForm<TypeUpdateDiller>({
    resolver: zodResolver(UpdateDillerSchema),
    values: {
      name: diller.name ?? "",
      password: "",
      email: diller.user.email ?? "",
      phone: diller.phone ?? "",
    },
  });

  const [loading, setLoading] = useState(false);

  const { isValid, isDirty } = form.formState;

  async function onSubmit(data: TypeUpdateDiller) {
    console.log(data);

    try {
      const res = await axiosInstance.patch(`diller/${diller.id}`, {
        ...data,
      });

      console.log(res.data);
      router.push("/dillers");
    } catch (error) {
      console.log(error);
    }
  }

  async function onDelete() {
    try {
      const res = await axiosInstance.delete(`/diller/${diller.id}`);

      console.log(res.data);
      router.push("/dillers");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <FormWrapper heading={"Create diller"}>
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
                name="email"
                render={({ field }) => (
                  <FormItem className="px-5 w-full">
                    <FormLabel>Email</FormLabel>

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
            <div className="flex flex-col lg:flex-row  gap-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="px-5 w-full">
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <Input placeholder={""} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-5 p-5">
            <Button disabled={!isValid || !isDirty}>Submit</Button>
            <Button type="button" onClick={onDelete} variant={"destructive"}>Delete</Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
