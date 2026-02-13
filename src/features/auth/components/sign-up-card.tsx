import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaMicrosoft, FaGithub } from "react-icons/fa";

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
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password is required")
    .max(16, "Password must be less than 16 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export default function SignUpCard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const onError = (errors: FieldErrors<z.infer<typeof formSchema>>) => {
    console.log(errors);
  };





  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none max-w-sm">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Enter your email and password to create an account.
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      minLength={8}
                      maxLength={16}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={false} size="lg" className="w-full" type="submit">
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={false}
          size="lg"
          className="w-full"
          variant="secondary"
        >
          <span className="mr-2">
            <FcGoogle size={20} />
          </span>
          Sign up with Google
        </Button>
        <Button disabled={false} size="lg" className="w-full" variant="secondary">
          <span className="mr-2">
            <FaGithub size={20} />
          </span>
          Sign up with Github
        </Button>
        <Button disabled={false} size="lg" className="w-full" variant="secondary">
          <span className="mr-2">
            <FaApple size={20} />
          </span>
          Sign up with Apple
        </Button>
        <Button disabled={false} size="lg" className="w-full" variant="secondary">
          <span className="mr-2">
            <FaMicrosoft size={20} />
          </span>
          Sign up with Microsoft
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-siemens-600 hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}