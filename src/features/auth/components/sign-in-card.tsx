"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaMicrosoft, FaGithub } from "react-icons/fa";

import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";


export default function SignInCard() {
  const { mutate, isPending } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({
      json: values
    });
  };

  const onError = (errors: FieldErrors<z.infer<typeof loginSchema>>) => {
    console.log(errors);
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none max-w-sm">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl font-bold">
          Welcome back!
        </CardTitle>
        <CardDescription>
          Sign in to the Installed Base Lifecycle Manager
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
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
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} size="lg" className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={isPending}
          size="lg"
          className="w-full"
          variant="secondary"
        >
          <span className="mr-2">
            <FcGoogle size={20} />
          </span>
          Login with Google
        </Button>
        <Button disabled={isPending} size="lg" className="w-full" variant="secondary">
          <span className="mr-2">
            <FaGithub size={20} />
          </span>
          Login with Github
        </Button>
        <Button disabled={isPending} size="lg" className="w-full" variant="secondary">
          <span className="mr-2">
            <FaApple size={20} />
          </span>
          Login with Apple
        </Button>
        <Button disabled={isPending} size="lg" className="w-full" variant="secondary">
          <span className="mr-2">
            <FaMicrosoft size={20} />
          </span>
          Login with Microsoft
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-siemens-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
