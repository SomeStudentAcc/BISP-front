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
  CreateDillerSchema,
  TypeCreateDiller,
} from "@/schemas/dillers/create-diller.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { email } from "zod";

export default function CreateDillerForm() {
  const router = useRouter();
  const form = useForm<TypeCreateDiller>({
    resolver: zodResolver(CreateDillerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const { isValid, isDirty } = form.formState;

  async function onSubmit(data: TypeCreateDiller) {
    console.log(data);

    try {
      const res = await axiosInstance.post("diller/", {
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password
      });

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
          <div className="flex justify-end p-5">
            <Button disabled={!isValid || !isDirty}>Submit</Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}
