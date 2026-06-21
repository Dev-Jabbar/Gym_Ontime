"use client";

import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dumbbell, Check } from "lucide-react";

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

/* ───────── Page ───────── */

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

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
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-10">
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
        {/* LEFT */}

        <div className="hidden md:flex md:w-[42%] flex-col justify-between p-10 bg-gradient-to-br from-emerald-950 via-zinc-950 to-zinc-900 border-r border-zinc-800">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Dumbbell className="w-5 h-5" />
            GymOntime
          </div>

          <div>
            <h1 className="text-4xl font-black text-white">
              Train harder. <br />
              <span className="text-emerald-400">Track smarter.</span>
            </h1>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 p-6 md:p-10 bg-zinc-900">
          <h2 className="text-xl font-bold text-white">Create account</h2>

          {done ? (
            <div className="p-6 text-center">
              <Check className="mx-auto text-emerald-400 mb-2" />
              <p className="text-white">Account created!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field<FormValues>
                  id="fullName"
                  label="Full Name"
                  register={register}
                  error={errors.fullName?.message}
                />

                <Field<FormValues>
                  id="email"
                  label="Email"
                  type="email"
                  register={register}
                  error={errors.email?.message}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field<FormValues>
                  id="password"
                  label="Password"
                  type={showPass ? "text" : "password"}
                  register={register}
                  error={errors.password?.message}
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
                  right={
                    <Toggle
                      show={showConfirm}
                      onToggle={() => setShowConfirm((v) => !v)}
                    />
                  }
                />
              </div>

              <PasswordStrength password={password} />

              <button className="w-full h-11 bg-emerald-500 text-black">
                {loading ? "Creating..." : "Create account"}
              </button>
            </form>
          )}
        </div>
      </div>
      <DevTool control={control} />
    </main>
  );
}
