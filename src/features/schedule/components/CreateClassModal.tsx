"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { TbX, TbPlus, TbPhoto } from "react-icons/tb";
import { uploadToCloudinary, validateImageFile } from "@/lib/cloudinaryUpload";

interface TrainerOption {
  _id: string;
  name: string;
}

interface CreateClassForm {
  name: string;
  description: string;
  schedule: string;
  duration: number;
  capacity: number;
  recurrence: "none" | "daily" | "weekly";
  recurrenceDays: string[];
  trainer: string;
  oneTime: number;
  weekly: number;
  monthly: number;
  threeMonths: number;
}

interface CreateClassModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const MIN_PRICE = 1500;
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

// Real session counts, tied to how the class actually recurs —
// previously this assumed a fixed 4 sessions/week for EVERY class
// regardless of its actual schedule, which is why a class meeting
// only 3x/week (or 7x/week for daily) still got priced as if it met
// exactly 4x/week. That mismatch compounds badly the longer the tier.
const getSessionsPerWeek = (
  recurrence: "none" | "daily" | "weekly",
  selectedDays: string[],
): number => {
  if (recurrence === "daily") return 7;
  if (recurrence === "weekly") return Math.max(selectedDays.length, 1);
  return 0; // "none" — no subscription tiers apply to a one-off class
};

const calculatePrices = (perSession: number, sessionsPerWeek: number) => {
  if (!perSession || perSession < MIN_PRICE || sessionsPerWeek === 0) {
    return null;
  }

  // 4.33 = average weeks per month (52 weeks / 12 months), not a
  // flat "4" — small difference, but it's the actual number and adds
  // up over a year.
  const monthlySessions = Math.round(sessionsPerWeek * 4.33);
  const threeMonthsSessions = sessionsPerWeek * 13; // 13 weeks in 3 months

  return {
    weekly: Math.round(perSession * sessionsPerWeek * 0.9), // 10% off
    monthly: Math.round(perSession * monthlySessions * 0.8), // 20% off
    threeMonths: Math.round(perSession * threeMonthsSessions * 0.7), // 30% off
  };
};

export function CreateClassModal({
  onClose,
  onSuccess,
}: CreateClassModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Trainer list for the required dropdown — a class can't be created
  // without one, so this needs to load before the form is usable.
  const [trainers, setTrainers] = useState<TrainerOption[]>([]);
  const [trainersLoading, setTrainersLoading] = useState(true);
  const [trainersError, setTrainersError] = useState<string | null>(null);

  // Optional class banner image — uploads immediately on selection,
  // same pattern as ProfileForm's avatar upload.
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
  } = useForm<CreateClassForm>({
    defaultValues: {
      duration: 60,
      capacity: 10,
      recurrence: "none",
      recurrenceDays: [],
      trainer: "",
      oneTime: 0,
      weekly: 0,
      monthly: 0,
      threeMonths: 0,
    },
  });

  const perSessionPrice = useWatch({ control, name: "oneTime" });
  const recurrence = watch("recurrence");

  const sessionsPerWeek = getSessionsPerWeek(recurrence, selectedDays);

  useEffect(() => {
    const prices = calculatePrices(Number(perSessionPrice), sessionsPerWeek);
    if (prices) {
      setValue("weekly", prices.weekly);
      setValue("monthly", prices.monthly);
      setValue("threeMonths", prices.threeMonths);
    }
    // Recalculates on every relevant change — previously this only
    // depended on perSessionPrice, so toggling which days a class
    // meets on never updated the subscription prices at all, even
    // though session count (and therefore price) directly depends on it.
  }, [perSessionPrice, sessionsPerWeek, setValue]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setImageError(validationError);
      return;
    }

    setImageError(null);
    setImageUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      setImageUrl(url);
    } catch (err) {
      setImageError(
        err instanceof Error ? err.message : "Upload failed. Try again.",
      );
    } finally {
      setImageUploading(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: CreateClassForm) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/classes`,
        {
          method: "POST",
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
            trainer: data.trainer,
            ...(imageUrl && { image: imageUrl }),
            pricing: {
              ...(data.oneTime && { oneTime: Number(data.oneTime) }),
              ...(data.weekly && { weekly: Number(data.weekly) }),
              ...(data.monthly && { monthly: Number(data.monthly) }),
              ...(data.threeMonths && {
                threeMonths: Number(data.threeMonths),
              }),
            },
          }),
        },
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to create class");

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

  // Real session counts for this specific class's schedule, shown next
  // to each tier so the admin can see WHY a price is what it is —
  // previously these were hardcoded (4/16/48/96/192) regardless of how
  // often the class actually meets.
  const pricingRows = [
    {
      key: "weekly",
      label: "Weekly",
      sessions: sessionsPerWeek,
      discount: "10% off",
    },
    {
      key: "monthly",
      label: "Monthly",
      sessions: Math.round(sessionsPerWeek * 4.33),
      discount: "20% off",
    },
    {
      key: "threeMonths",
      label: "3 Months",
      sessions: sessionsPerWeek * 13,
      discount: "30% off",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Create New Class</h2>
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
              placeholder="e.g. Morning Yoga"
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
              placeholder="Brief description of the class..."
              className={inputClass}
            />
          </div>

          {/* Class Image — optional banner shown at the top of the
              class card. No image means the card just renders without
              a banner, same as it does today. */}
          <div>
            <label className={labelClass}>Class Image (optional)</label>
            {imageUrl ? (
              <div className="relative rounded-lg overflow-hidden h-32">
                <img
                  src={imageUrl}
                  alt="Class preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl(null)}
                  className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                  aria-label="Remove image"
                >
                  <TbX className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                disabled={imageUploading}
                className="w-full h-24 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-orange-400 hover:text-orange-500 transition-colors disabled:opacity-60"
              >
                {imageUploading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-orange-500" />
                ) : (
                  <>
                    <TbPhoto className="w-6 h-6" />
                    <span className="text-xs">Click to upload an image</span>
                  </>
                )}
              </button>
            )}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
            {imageError && <p className={errorClass}>{imageError}</p>}
          </div>

          {/* Trainer — required, no class can be created without one */}
          <div>
            <label className={labelClass}>Trainer *</label>
            {trainersLoading ? (
              <p className="text-sm text-gray-400">Loading trainers...</p>
            ) : trainersError ? (
              <p className="text-sm text-red-500">{trainersError}</p>
            ) : trainers.length === 0 ? (
              <p className="text-sm text-red-500">
                No trainers available. Add a trainer before creating a class.
              </p>
            ) : (
              <select
                {...register("trainer", {
                  required: "Please assign a trainer",
                })}
                className={inputClass}
                defaultValue=""
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
              <label className={labelClass}>Start Date & Time *</label>
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
                placeholder="60"
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
              placeholder="10"
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
              placeholder="e.g. 1500"
              className={inputClass}
            />
            {errors.oneTime && (
              <p className={errorClass}>{errors.oneTime.message}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Min ₦{MIN_PRICE.toLocaleString()} — Max ₦
              {MAX_PRICE.toLocaleString()}
            </p>
          </div>

          {/* Subscription prices */}
          {Number(perSessionPrice) >= MIN_PRICE && recurrence !== "none" && (
            <div>
              <label className={labelClass}>
                Subscription Prices (auto-calculated, editable)
              </label>
              <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                {pricingRows.map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <div className="w-32 flex-shrink-0">
                      <p className="text-sm font-medium text-gray-700">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.sessions} session{item.sessions !== 1 ? "s" : ""}
                      </p>
                      <p className="text-xs text-green-600">{item.discount}</p>
                    </div>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        ₦
                      </span>
                      <input
                        {...register(item.key as keyof CreateClassForm)}
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
                trainersLoading ||
                trainers.length === 0 ||
                (recurrence === "weekly" && selectedDays.length === 0)
              }
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors disabled:opacity-60"
            >
              <TbPlus className="w-4 h-4" />
              {loading ? "Creating..." : "Create Class"}
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
