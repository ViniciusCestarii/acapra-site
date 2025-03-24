"use client";

import ShowHideInput from "@/components/ui/show-hide-input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { postAuthUsersLogin, PostAuthUsersLoginErrors } from "../../client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

const LoginForm = () => {
  const router = useRouter();
  const [isSubmiting, startSubmit] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startSubmit(async () => {
      const result = await postAuthUsersLogin({
        body: values,
      });

      if (result.error) {
        if (
          result.response.status === 401 &&
          (result.error as PostAuthUsersLoginErrors["401"]).name ===
            "InvalidCredentialsError"
        ) {
          form.setError("email", {
            type: "invalid",
            message: "Email ou senha inválidos",
          });
          form.setError("password", {
            type: "invalid",
            message: "Email ou senha inválidos",
          });
        } else {
          toast.error(
            "Erro inesperado. Tente novamente mais tarde ou entre em contato com o suporte.",
          );
        }

        return;
      }

      router.push("/");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="email"
                  className="px-4 py-8 md:text-base text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <ShowHideInput
                  {...field}
                  autoComplete="current-password"
                  className="px-4 py-8 md:text-base text-base pr-14"
                  iconProps={{
                    className: "w-14",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmiting}
          className="py-8 w-full text-lg font-bold"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
