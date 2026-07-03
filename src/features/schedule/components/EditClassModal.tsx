"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { TbX, TbCheck } from "react-icons/tb";
import type { Class } from "../types";

interface TrainerOption {
  _id: string;
  name: string;
}

interface EditClassForm {
  name: string;
  description: string;
  schedule: string;
  duration: number;
  capacity: number;
  recurrence: "none" | "daily" | "weekly";
  trainer: string;
  oneTime: number;
  weekly: number;
  monthly: number;
  quarterly: number;
  biannual: number;
  yearly: number;
}

interface EditClassModalProps {
  classData: Class;
  onClose: () => void;
  onSuccess: () => void;
}

const MIN_PRICE = 500;
const MAX_PRICE = 500000;

const DAYS_OF_WEEK = [
  { value: "monday", label: "Mon" },
  { value: "tuesday", label: "Tue" },
  { value: "wednesday", label: "Wed" },
  { value: "thursday", label: "Thu" },
  { value: "friday", label: "Fri" },
  { value: "saturday", label: "Sat" },
  { value: "sunday", label: "Sun" },
];

const calculatePrices = (perSession: number) => {
  if (!perSession || perSession < MIN_PRICE) return null;
  return {
    weekly: Math.round(perSession * 4 * 0.9),
    monthly: Math.round(perSession * 16 * 0.8),
    quarterly: Math.round(perSession * 48 * 0.72),
    biannual: Math.round(perSession * 96 * 0.64),
    yearly: Math.round(perSession * 192 * 0.56),
  };
};

export function EditClassModal({
  classData,
  onClose,
  onSuccess,
}: EditClassModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoCalculated, setAutoCalculated] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>(
    classData.recurrenceDays ?? [],
  );

  // Same trainer-list fetch as CreateClassModal, keyed by User._id so
  // it matches classData.trainer.userId for pre-selection.
  const [trainers, setTrainers] = useState<TrainerOption[]>([]);
  const [trainersLoading, setTrainersLoading] = useState(true);
  const [trainersError, setTrainersError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch trainers");

        const data = await res.json();
        const users: any[] = Array.isArray(data) ? data : (data.data ?? []);

        const trainerUsers = users
          .filter((u) => u.role === "trainer" && u.isActive !== false)
          .map((u) => ({ _id: u._id, name: u.name }));

        setTrainers(trainerUsers);
      } catch (err) {
        setTrainersError("Unable to load trainers.");
      } finally {
        setTrainersLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditClassForm>({
    defaultValues: {
      name: classData.name,
      description: classData.description,
      schedule: new Date(classData.schedule).toISOString().slice(0, 16),
      duration: parseInt(classData.duration),
      capacity: classData.capacity,
      recurrence:
        (classData.recurrence as "none" | "daily" | "weekly") ?? "none",
      // Pre-select using the trainer's User._id, matching the dropdown's
      // option values — classData.trainer.id is the TrainerProfile._id,
      // which would not match any option here.
      trainer: classData.trainer.userId ?? "",
      oneTime: classData.pricing.oneTime ?? 0,
      weekly: classData.pricing.weekly ?? 0,
      monthly: classData.pricing.monthly ?? 0,
      quarterly: classData.pricing.quarterly ?? 0,
      biannual: classData.pricing.biannual ?? 0,
      yearly: classData.pricing.yearly ?? 0,
    },
  });

  const perSessionPrice = useWatch({ control, name: "oneTime" });
  const recurrence = watch("recurrence");

  useEffect(() => {
    if (autoCalculated) {
      const prices = calculatePrices(Number(perSessionPrice));
      if (prices) {
        setValue("weekly", prices.weekly);
        setValue("monthly", prices.monthly);
        setValue("quarterly", prices.quarterly);
        setValue("biannual", prices.biannual);
        setValue("yearly", prices.yearly);
      }
    }
  }, [perSessionPrice, setValue, autoCalculated]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const onSubmit = async (data: EditClassForm) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/classes/${classData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: data.name,
            description: data.description,
            schedule: new Date(data.schedule).toISOString(),
            duration: Number(data.duration),
            capacity: Number(data.capacity),
            recurrence: data.recurrence,
            recurrenceDays: data.recurrence === "weekly" ? selectedDays : [],
            // Only send trainer if it actually changed from the current
            // one — avoids an unnecessary lookup/resolution on the
            // backend for a no-op update.
            ...(data.trainer !== classData.trainer.userId && {
              trainer: data.trainer,
            }),
            pricing: {
              ...(data.oneTime && { oneTime: Number(data.oneTime) }),
              ...(data.weekly && { weekly: Number(data.weekly) }),
              ...(data.monthly && { monthly: Number(data.monthly) }),
              ...(data.quarterly && { quarterly: Number(data.quarterly) }),
              ...(data.biannual && { biannual: Number(data.biannual) }),
              ...(data.yearly && { yearly: Number(data.yearly) }),
            },
          }),
        },
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to update class");

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm";
  const labelClass = "block text-sm font-medium text-gray-600 mb-1";
  const errorClass = "text-xs text-red-500 mt-1";

  const pricingRows = [
    { key: "weekly", label: "Weekly", discount: "10% off" },
    { key: "monthly", label: "Monthly", discount: "20% off" },
    { key: "quarterly", label: "Quarterly", discount: "28% off" },
    { key: "biannual", label: "Biannual", discount: "36% off" },
    { key: "yearly", label: "Yearly", discount: "44% off" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Edit Class</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <TbX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className={labelClass}>Class Name *</label>
            <input
              {...register("name", { required: "Class name is required" })}
              type="text"
              className={inputClass}
            />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              {...register("description")}
              rows={2}
              className={inputClass}
            />
          </div>

          {/* Trainer */}
          <div>
            <label className={labelClass}>Trainer *</label>
            {trainersLoading ? (
              <p className="text-sm text-gray-400">Loading trainers...</p>
            ) : trainersError ? (
              <p className="text-sm text-red-500">{trainersError}</p>
            ) : trainers.length === 0 ? (
              <p className="text-sm text-red-500">No trainers available.</p>
            ) : (
              <select
                {...register("trainer", {
                  required: "Please assign a trainer",
                })}
                className={inputClass}
              >
                <option value="" disabled>
                  Select a trainer
                </option>
                {trainers.map((trainer) => (
                  <option key={trainer._id} value={trainer._id}>
                    {trainer.name}
                  </option>
                ))}
              </select>
            )}
            {errors.trainer && (
              <p className={errorClass}>{errors.trainer.message}</p>
            )}
          </div>

          {/* Schedule & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Schedule *</label>
              <input
                {...register("schedule", { required: "Schedule is required" })}
                type="datetime-local"
                className={inputClass}
              />
              {errors.schedule && (
                <p className={errorClass}>{errors.schedule.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Duration (minutes) *</label>
              <input
                {...register("duration", { required: true, min: 1 })}
                type="number"
                min={1}
                className={inputClass}
              />
            </div>
          </div>

          {/* Recurrence */}
          <div>
            <label className={labelClass}>Recurrence</label>
            <select {...register("recurrence")} className={inputClass}>
              <option value="none">One-off (single session)</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly (select days)</option>
            </select>
          </div>

          {/* Days of week — only show when weekly */}
          {recurrence === "weekly" && (
            <div>
              <label className={labelClass}>Select Days *</label>
              <div className="flex gap-2 flex-wrap">
                {DAYS_OF_WEEK.map((day) => (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => toggleDay(day.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDays.includes(day.value)
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
              {selectedDays.length === 0 && (
                <p className="text-xs text-red-500 mt-1">
                  Please select at least one day
                </p>
              )}
            </div>
          )}

          {/* Capacity */}
          <div>
            <label className={labelClass}>Capacity *</label>
            <input
              {...register("capacity", { required: true, min: 1 })}
              type="number"
              min={1}
              className={inputClass}
            />
          </div>

          {/* Per Session Price */}
          <div>
            <label className={labelClass}>Per Session Price (₦) *</label>
            <input
              {...register("oneTime", {
                required: "Per session price is required",
                min: {
                  value: MIN_PRICE,
                  message: `Minimum price is ₦${MIN_PRICE.toLocaleString()}`,
                },
                max: {
                  value: MAX_PRICE,
                  message: `Maximum price is ₦${MAX_PRICE.toLocaleString()}`,
                },
              })}
              type="number"
              min={MIN_PRICE}
              max={MAX_PRICE}
              className={inputClass}
              onChange={() => setAutoCalculated(true)}
            />
            {errors.oneTime && (
              <p className={errorClass}>{errors.oneTime.message}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Change this to auto-recalculate subscription prices
            </p>
          </div>

          {/* ✅ Subscription prices — only for recurring classes */}
          {recurrence !== "none" && (
            <div>
              <label className={labelClass}>
                Subscription Prices (₦) — editable
              </label>
              <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                {pricingRows.map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <div className="w-32 flex-shrink-0">
                      <p className="text-sm font-medium text-gray-700">
                        {item.label}
                      </p>
                      <p className="text-xs text-green-600">{item.discount}</p>
                    </div>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        ₦
                      </span>
                      <input
                        {...register(item.key as keyof EditClassForm)}
                        type="number"
                        min={0}
                        className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={
                loading ||
                (recurrence === "weekly" && selectedDays.length === 0)
              }
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors disabled:opacity-60"
            >
              <TbCheck className="w-4 h-4" />
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
