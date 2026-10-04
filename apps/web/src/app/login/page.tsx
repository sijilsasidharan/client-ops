// app/login/page.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginSchema, LoginInput } from "@/lib/schemas/auth";
import { login } from "@/lib/api/auth";
import { setToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken }) => {
      setToken(accessToken);
      router.push("/clients");
    },
    onError: (err: any) =>
      form.setError("root", { message: err.message ?? "Login failed" }),
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((d) => mutation.mutate(d))}
          className="w-full max-w-sm space-y-4"
        >
          <h1 className="text-2xl font-semibold">Log in</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <p className="text-sm text-red-500">
              {form.formState.errors.root.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Logging in…" : "Log in"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
