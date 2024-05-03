"use client";
import * as z from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/forms/index";
import {LoginInput} from "@/components/forms/login-input";
const formSchema = z.object({
  password: z
  .string()
  .min(1, { message: "Please enter a password" }),
});

type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSubmit: (value) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({onSubmit}: LoginFormProps) => {
  const form: any = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {password: ""},
  });

  const handleSubmit = (data: LoginFormValues) => {
    const credentials = data.password ?? '';
    onSubmit(credentials);
  }

  return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                  <FormControl>
                    <LoginInput
                      {...field}
                      forwardSubmit={onSubmit}
                      type={'password'}
                    />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )} />
        </form>
      </Form>
  )
};
