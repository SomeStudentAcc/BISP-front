"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/useAuth";

import {
  TypeLoginAccountSchema,
  loginAccountSchema,
} from "@/schemas/auth/login.shema";

import AuthWrapper from "../AuthWrapper";
import { ILogin } from "@/components/types/auth/login.types";
import { authService } from "@/services/auth/authService";

export default function LoginForm() {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const router = useRouter();
  const { auth } = useAuth();

  const form = useForm<TypeLoginAccountSchema>({
    resolver: zodResolver(loginAccountSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // needed for isValid
  });

  const {
    formState: { isValid },
  } = form;

  async function onSubmit(data: ILogin) {
    try {
      const res = await authService.main(data);
      console.log(res);

      if (res.status == 201) {
        auth();
        toast.success("Login was successful");
        console.log(res.data);

        router.push("/");
      }
    } catch (error) {
      toast.error("Failed to login");
      console.log(error);
    }
  }

  return (
    <AuthWrapper heading="Sign in to your account">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          {/* LOGIN */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john_doe"
                    disabled={isLoadingLogin}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your email</FormDescription>
              </FormItem>
            )}
          />

          {/* PASSWORD */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    disabled={isLoadingLogin}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Must be at least 6 characters</FormDescription>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-2 w-full"
            disabled={!isValid || isLoadingLogin}
          >
            Sign in
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
