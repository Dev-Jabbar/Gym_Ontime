"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Dumbbell, Mail, Lock } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const watchedEmail = useWatch({ control, name: "email" });
  const watchedPassword = useWatch({ control, name: "password" });

  useEffect(() => {
    if (errorMessage) setErrorMessage(null);
  }, [watchedEmail, watchedPassword]);

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const userData = await response.json();
      useUserStore.getState().setUser({ ...userData, avatar: null });

      router.push("/");
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setErrorMessage("Unable to connect to server. Please try again later.");
      } else if (error instanceof Error && error.message) {
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10">
        {/* Logo — same lockup as the app header */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
            <Dumbbell className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-extrabold tracking-wide text-gray-900">
            Gym<span className="text-orange-500">Ontime</span>
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-orange-500 hover:text-orange-600 transition-colors"
          >
            Create one free
          </a>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email address
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
                className={`w-full h-12 pl-11 pr-4 rounded-xl text-sm text-gray-900 transition-all focus:outline-none focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400 ${
                  errors.email
                    ? "bg-red-50/50 border border-red-300"
                    : "bg-gray-50 border border-transparent"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register("password")}
                className={`w-full h-12 pl-11 pr-11 rounded-xl text-sm text-gray-900 transition-all focus:outline-none focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400 ${
                  errors.password
                    ? "bg-red-50/50 border border-red-300"
                    : "bg-gray-50 border border-transparent"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3 text-center">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-8">
          New to GymOntime?{" "}
          <a
            href="/register"
            className="font-semibold text-orange-500 hover:text-orange-600 transition-colors"
          >
            Create an account
          </a>
        </p>
      </div>
    </main>
  );
}
