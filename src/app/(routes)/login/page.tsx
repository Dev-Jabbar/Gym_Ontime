"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Dumbbell } from "lucide-react";

// ─── Shadcn/ui imports ────────────────────────────────────────────────────────
// Assumes you have run: npx shadcn@latest add button input label form
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// ─── Validation schema ────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// ─── Page Component ───────────────────────────────────────────────────────────
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    try {
      // Replace with your actual auth logic (e.g. NextAuth signIn, fetch, etc.)
      console.log("Login attempt:", values);
      await new Promise((r) => setTimeout(r, 1500)); // Simulated network delay
    } finally {
      setIsLoading(false);
    }
  }

  return (
    /*
     * Full-page wrapper — dark grid background that matches the screenshot.
     * The subtle dot-grid is created with a CSS radial-gradient pattern.
     */
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundColor: "#111313",
        backgroundImage:
          "radial-gradient(circle, #2a2d2d 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        fontFamily: "'Geist', 'Inter', sans-serif",
      }}
    >
      {/* ── Card ── */}
      <div
        className="w-full max-w-md rounded-3xl p-10 shadow-2xl"
        style={{ backgroundColor: "#1a1d1d" }}
      >
        {/* Logo / brand mark */}
        <div className="flex items-center gap-2 mb-8">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#2db87a" }}
          >
            <Dumbbell className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "#2db87a", letterSpacing: "0.18em" }}
          >
            Welcome Back
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-4xl font-extrabold mb-2 leading-tight"
          style={{ color: "#f0f4f4" }}
        >
          Sign in to FitCore
        </h1>

        {/* Sub-heading */}
        <p className="text-sm mb-8" style={{ color: "#8a9494" }}>
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="font-semibold transition-opacity hover:opacity-80"
            style={{ color: "#2db87a" }}
          >
            Create one free
          </a>
        </p>

        {/* ── Form ── */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="text-sm font-medium"
                    style={{ color: "#c4cccc" }}
                  >
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...field}
                      className="h-12 rounded-xl border-0 text-sm placeholder:text-[#4a5454] focus-visible:ring-1 focus-visible:ring-[#2db87a] transition-all"
                      style={{
                        backgroundColor: "#242828",
                        color: "#f0f4f4",
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" style={{ color: "#f87171" }} />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="text-sm font-medium"
                    style={{ color: "#c4cccc" }}
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        {...field}
                        className="h-12 rounded-xl border-0 pr-11 text-sm placeholder:text-[#4a5454] focus-visible:ring-1 focus-visible:ring-[#2db87a] transition-all"
                        style={{
                          backgroundColor: "#242828",
                          color: "#f0f4f4",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-opacity hover:opacity-70"
                        style={{ color: "#6a7474" }}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" style={{ color: "#f87171" }} />
                </FormItem>
              )}
            />

            {/* Forgot password */}
            <div className="flex justify-end -mt-2">
              <a
                href="/forgot-password"
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: "#8a9494" }}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-13 rounded-xl text-base font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
              style={{
                backgroundColor: "#2db87a",
                height: "52px",
                fontSize: "16px",
              }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>

        {/* Bottom link */}
        <p className="text-sm text-center mt-8" style={{ color: "#8a9494" }}>
          New to FitCore?{" "}
          <a
            href="/register"
            className="font-semibold transition-opacity hover:opacity-80"
            style={{ color: "#2db87a" }}
          >
            Create an account
          </a>
        </p>
      </div>
    </main>
  );
}
