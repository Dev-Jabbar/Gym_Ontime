"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Dumbbell } from "lucide-react";

// ─── Validation schema ────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// ─── Page Component ───────────────────────────────────────────────────────────
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
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 👈 required for cookies to be set
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

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
        {/* Brand mark */}
        <div className="flex items-center gap-2 mb-8">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "orange" }}
          >
            <Dumbbell className="w-4 h-4  text-white" strokeWidth={2.5} />
          </div>
          <span
            className="text-sm font-semibold uppercase"
            style={{ color: "orange", letterSpacing: "0.18em" }}
          >
            Welcome Back
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-3xl font-extrabold mb-2 leading-tight"
          style={{ color: "#f0f4f4" }}
        >
          Sign in to GymOntime
        </h1>

        {/* Sub-heading */}
        <p className="text-sm mb-8" style={{ color: "#8a9494" }}>
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold hover:opacity-80 transition-opacity"
            style={{ color: "#2db87a" }}
          >
            Create one free
          </a>
        </p>

        {/* ── Form ── */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium"
              style={{ color: "#c4cccc" }}
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="vintage@gmail.com"
              autoComplete="email"
              {...register("email")}
              className="w-full h-12 rounded-xl px-4 text-sm outline-none transition-all"
              style={{
                backgroundColor: "#242828",
                color: "#f0f4f4",
                border: errors.email
                  ? "1px solid #f87171"
                  : "1px solid transparent",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2db87a")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.email
                  ? "#f87171"
                  : "transparent")
              }
            />
            {errors.email && (
              <p className="text-xs" style={{ color: "#f87171" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium"
              style={{ color: "#c4cccc" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register("password")}
                className="w-full h-12 rounded-xl px-4 pr-11 text-sm outline-none transition-all"
                style={{
                  backgroundColor: "#242828",
                  color: "#f0f4f4",
                  border: errors.password
                    ? "1px solid #f87171"
                    : "1px solid transparent",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2db87a")}
                onBlur={(e) =>
                  (e.target.style.borderColor = errors.password
                    ? "#f87171"
                    : "transparent")
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:opacity-70 transition-opacity"
                style={{ color: "#6a7474" }}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs" style={{ color: "#f87171" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "#8a9494" }}
            >
              Forgot password ?
            </a>
          </div>
          {/* API Error Message */}
          {errorMessage && (
            <p className="text-sm text-center" style={{ color: "#f87171" }}>
              {errorMessage}
            </p>
          )}
          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
            style={{
              backgroundColor: "#2db87a",
              height: "52px",
              fontSize: "16px",
            }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
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
          </button>
        </form>

        {/* Bottom link */}
        <p className="text-sm text-center mt-8" style={{ color: "#8a9494" }}>
          New to GymOntime ?{" "}
          <a
            href="/register"
            className="font-semibold hover:opacity-80 transition-opacity"
            style={{ color: "#2db87a" }}
          >
            Create an account
          </a>
        </p>
      </div>
    </main>
  );
}
