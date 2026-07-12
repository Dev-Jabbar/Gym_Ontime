"use client";

import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dumbbell,
  Check,
  Calendar,
  TrendingUp,
  Users,
  User,
  Mail,
  Lock,
} from "lucide-react";

import Field from "@/components/Field";
import PasswordStrength from "@/components/PasswordStrength";
import Toggle from "@/components/Toggle";

/* ───────── Schema ───────── */

const registerSchema = z
  .object({
    fullName: z.string().min(2).max(60),
    email: z.email(),
    password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof registerSchema>;

const FEATURES = [
  { icon: Calendar, label: "Book classes instantly" },
  { icon: TrendingUp, label: "Track your progress" },
  { icon: Users, label: "Connect with trainers" },
];

/* ───────── Page ───────── */

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password") ?? "";

  async function onSubmit(data: FormValues) {
    setSubmitError(null);
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.fullName,
            email: data.email,
            password: data.password,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      setDone(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-3xl overflow-hidden bg-white shadow-xl">
        {/* LEFT — orange gradient, same styling as the dashboard's
            Quick Actions panel, for visual consistency across the app */}
        <div className="hidden md:flex md:w-[42%] flex-col justify-between p-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex items-center gap-2 font-bold">
            <Dumbbell className="w-5 h-5" />
            GymOntime
          </div>

          <div>
            <h1 className="text-4xl font-black leading-tight mb-8">
              Train harder. <br />
              Track smarter.
            </h1>

            <div className="space-y-4">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div />
        </div>

        {/* RIGHT */}
        <div className="flex-1 p-6 md:p-10">
          {done ? (
            <div className="py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7 text-orange-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Account created!
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                You can now sign in with your new account.
              </p>
              <a
                href="/login"
                className="inline-block w-full sm:w-auto px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                Continue to Sign In
              </a>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-6 md:hidden">
                <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
                  <Dumbbell className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-extrabold text-gray-900">
                  Gym<span className="text-orange-500">Ontime</span>
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Create your account
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                >
                  Sign in
                </a>
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field<FormValues>
                    id="fullName"
                    label="Full Name"
                    register={register}
                    error={errors.fullName?.message}
                    icon={<User className="w-4 h-4" />}
                  />

                  <Field<FormValues>
                    id="email"
                    label="Email"
                    type="email"
                    register={register}
                    error={errors.email?.message}
                    icon={<Mail className="w-4 h-4" />}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field<FormValues>
                    id="password"
                    label="Password"
                    type={showPass ? "text" : "password"}
                    register={register}
                    error={errors.password?.message}
                    icon={<Lock className="w-4 h-4" />}
                    right={
                      <Toggle
                        show={showPass}
                        onToggle={() => setShowPass((v) => !v)}
                      />
                    }
                  />

                  <Field<FormValues>
                    id="confirmPassword"
                    label="Confirm"
                    type={showConfirm ? "text" : "password"}
                    register={register}
                    error={errors.confirmPassword?.message}
                    icon={<Lock className="w-4 h-4" />}
                    right={
                      <Toggle
                        show={showConfirm}
                        onToggle={() => setShowConfirm((v) => !v)}
                      />
                    }
                  />
                </div>

                <PasswordStrength password={password} />

                {submitError && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3 text-center">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
                      Creating...
                    </>
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
