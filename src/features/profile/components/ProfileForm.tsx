"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  TbUser,
  TbMail,
  TbEdit,
  TbCheck,
  TbX,
  TbPhone,
  TbCalendar,
  TbHeart,
  TbNotes,
  TbAlertCircle,
  TbCertificate,
  TbClock,
  TbStar,
} from "react-icons/tb";
import type { ProfileData, UpdateProfileData } from "@/features/profile/types";

interface ProfileFormProps {
  profile: ProfileData;
  updating: boolean;
  onUpdate: (data: UpdateProfileData) => Promise<void>;
}

const FITNESS_GOALS = [
  { value: "weight_loss", label: "Weight Loss" },
  { value: "muscle_gain", label: "Muscle Gain" },
  { value: "endurance", label: "Endurance" },
  { value: "flexibility", label: "Flexibility" },
  { value: "general_fitness", label: "General Fitness" },
];

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

type FormValues = {
  name: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  fitnessGoal: string;
  healthNotes: string;
  emergencyName: string;
  emergencyPhone: string;
  bio: string;
  specialty: string;
  experience: string;
  certifications: string;
  availability: string;
};

const inputClass =
  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500";

// ── Field component moved OUTSIDE so it never gets redefined on re-render ──
function Field({
  label,
  value,
  editing,
  children,
  icon,
}: {
  label: string;
  value?: string;
  editing: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      {editing ? (
        children
      ) : (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
          {icon}
          <span className="text-gray-900">{value || "Not set"}</span>
        </div>
      )}
    </div>
  );
}

export function ProfileForm({ profile, updating, onUpdate }: ProfileFormProps) {
  const [editing, setEditing] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: {
      name: profile.name,
      phone: "",
      dateOfBirth: "",
      gender: "",
      fitnessGoal: "",
      healthNotes: "",
      emergencyName: "",
      emergencyPhone: "",
      bio: "",
      specialty: "",
      experience: "",
      certifications: "",
      availability: "",
    },
  });

  const values = watch();

  useEffect(() => {
    if (profile.profile) {
      const p = profile.profile as any;
      if (profile.role === "member") {
        reset({
          name: profile.name,
          phone: p.phone ?? "",
          dateOfBirth: p.dateOfBirth
            ? new Date(p.dateOfBirth).toISOString().split("T")[0]
            : "",
          gender: p.gender ?? "",
          fitnessGoal: p.fitnessGoal ?? "",
          healthNotes: p.healthNotes ?? "",
          emergencyName: p.emergencyContact?.name ?? "",
          emergencyPhone: p.emergencyContact?.phone ?? "",
          bio: "",
          specialty: "",
          experience: "",
          certifications: "",
          availability: "",
        });
      } else if (profile.role === "trainer") {
        reset({
          name: profile.name,
          phone: p.phone ?? "",
          dateOfBirth: p.dateOfBirth
            ? new Date(p.dateOfBirth).toISOString().split("T")[0]
            : "",
          gender: p.gender ?? "",
          fitnessGoal: "",
          healthNotes: "",
          emergencyName: "",
          emergencyPhone: "",
          bio: p.bio ?? "",
          specialty: p.specialty ?? "",
          experience: p.experience?.toString() ?? "",
          certifications: p.certifications?.join(", ") ?? "",
          availability: p.availability ?? "",
        });
      }
    } else {
      reset((prev) => ({ ...prev, name: profile.name }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const onSubmit = async (data: FormValues) => {
    const payload: UpdateProfileData = { name: data.name };

    if (profile.role === "member") {
      payload.phone = data.phone || undefined;
      payload.dateOfBirth = data.dateOfBirth || undefined;
      payload.gender = data.gender || undefined;
      payload.fitnessGoal = data.fitnessGoal || undefined;
      payload.healthNotes = data.healthNotes || undefined;
      if (data.emergencyName || data.emergencyPhone) {
        payload.emergencyContact = {
          name: data.emergencyName,
          phone: data.emergencyPhone,
        };
      }
    }

    if (profile.role === "trainer") {
      payload.bio = data.bio || undefined;
      payload.specialty = data.specialty || undefined;
      payload.phone = data.phone || undefined;
      payload.experience = data.experience
        ? Number(data.experience)
        : undefined;
      payload.certifications = data.certifications
        ? data.certifications
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean)
        : undefined;
      payload.availability = data.availability || undefined;
      payload.dateOfBirth = data.dateOfBirth || undefined;
      payload.gender = data.gender || undefined;
    }

    try {
      await onUpdate(payload);
      setEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  const handleCancel = () => {
    reset();
    setEditing(false);
  };

  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    profile.name,
  )}&background=random&color=fff&size=100`;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-md mb-3">
          <Image
            src={avatar}
            alt={profile.name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
        <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium capitalize">
          {profile.role}
        </span>
      </div>

      {/* Read-only view shown OUTSIDE the form when not editing */}
      {!editing && (
        <div className="space-y-5">
          <Field
            label="Full Name"
            value={profile.name}
            editing={editing}
            icon={<TbUser className="w-4 h-4 text-gray-400" />}
          />

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <TbMail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{profile.email}</span>
            </div>
          </div>

          {profile.role === "member" && (
            <>
              <Field
                label="Phone Number"
                value={values.phone}
                editing={editing}
                icon={<TbPhone className="w-4 h-4 text-gray-400" />}
              />
              <Field
                label="Date of Birth"
                editing={editing}
                value={
                  values.dateOfBirth
                    ? new Date(values.dateOfBirth).toLocaleDateString("en-NG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""
                }
                icon={<TbCalendar className="w-4 h-4 text-gray-400" />}
              />
              <Field
                label="Gender"
                editing={editing}
                value={
                  GENDERS.find((g) => g.value === values.gender)?.label ??
                  values.gender
                }
                icon={<TbUser className="w-4 h-4 text-gray-400" />}
              />
              <Field
                label="Fitness Goal"
                editing={editing}
                value={
                  FITNESS_GOALS.find((f) => f.value === values.fitnessGoal)
                    ?.label ?? values.fitnessGoal
                }
                icon={<TbHeart className="w-4 h-4 text-gray-400" />}
              />
              <Field
                label="Health Notes"
                value={values.healthNotes}
                editing={editing}
                icon={<TbNotes className="w-4 h-4 text-gray-400" />}
              />

              <div>
                <label className="flex text-sm font-medium text-gray-600 mb-1 items-center gap-1">
                  <TbAlertCircle className="w-4 h-4 text-orange-500" />
                  Emergency Contact
                </label>
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">
                    {values.emergencyName && values.emergencyPhone
                      ? `${values.emergencyName} — ${values.emergencyPhone}`
                      : "Not set"}
                  </span>
                </div>
              </div>
            </>
          )}

          {profile.role === "trainer" && (
            <>
              <Field
                label="Bio"
                value={values.bio}
                editing={editing}
                icon={<TbNotes className="w-4 h-4 text-gray-400" />}
              />
              <Field
                label="Specialty"
                value={values.specialty}
                editing={editing}
                icon={<TbStar className="w-4 h-4 text-gray-400" />}
              />
              <Field
                label="Phone Number"
                value={values.phone}
                editing={editing}
                icon={<TbPhone className="w-4 h-4 text-gray-400" />}
              />
              <Field
                label="Years of Experience"
                editing={editing}
                value={values.experience ? `${values.experience} years` : ""}
                icon={<TbStar className="w-4 h-4 text-gray-400" />}
              />
              <Field
                label="Certifications"
                value={values.certifications}
                editing={editing}
                icon={<TbCertificate className="w-4 h-4 text-gray-400" />}
              />
              <Field
                label="Availability"
                value={values.availability}
                editing={editing}
                icon={<TbClock className="w-4 h-4 text-gray-400" />}
              />
              <Field
                label="Date of Birth"
                editing={editing}
                value={
                  values.dateOfBirth
                    ? new Date(values.dateOfBirth).toLocaleDateString("en-NG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""
                }
                icon={<TbCalendar className="w-4 h-4 text-gray-400" />}
              />
              <Field
                label="Gender"
                editing={editing}
                value={
                  GENDERS.find((g) => g.value === values.gender)?.label ??
                  values.gender
                }
                icon={<TbUser className="w-4 h-4 text-gray-400" />}
              />
            </>
          )}

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              <TbEdit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>
      )}

      {/* Editable form shown only when editing */}
      {editing && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Field
            label="Full Name"
            editing={editing}
            icon={<TbUser className="w-4 h-4 text-gray-400" />}
          >
            <input {...register("name")} type="text" className={inputClass} />
          </Field>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <TbMail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{profile.email}</span>
            </div>
          </div>

          {profile.role === "member" && (
            <>
              <Field
                label="Phone Number"
                editing={editing}
                icon={<TbPhone className="w-4 h-4 text-gray-400" />}
              >
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+234 800 000 0000"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Date of Birth"
                editing={editing}
                icon={<TbCalendar className="w-4 h-4 text-gray-400" />}
              >
                <input
                  {...register("dateOfBirth")}
                  type="date"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Gender"
                editing={editing}
                icon={<TbUser className="w-4 h-4 text-gray-400" />}
              >
                <select {...register("gender")} className={inputClass}>
                  <option value="">Select gender</option>
                  {GENDERS.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Fitness Goal"
                editing={editing}
                icon={<TbHeart className="w-4 h-4 text-gray-400" />}
              >
                <select {...register("fitnessGoal")} className={inputClass}>
                  <option value="">Select fitness goal</option>
                  {FITNESS_GOALS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Health Notes"
                editing={editing}
                icon={<TbNotes className="w-4 h-4 text-gray-400" />}
              >
                <textarea
                  {...register("healthNotes")}
                  rows={3}
                  placeholder="Any injuries, conditions, or notes for your trainer..."
                  className={inputClass}
                />
              </Field>

              <div>
                <label className="flex text-sm font-medium text-gray-600 mb-1 items-center gap-1">
                  <TbAlertCircle className="w-4 h-4 text-orange-500" />
                  Emergency Contact
                </label>
                <div className="space-y-2">
                  <input
                    {...register("emergencyName")}
                    type="text"
                    placeholder="Contact name"
                    className={inputClass}
                  />
                  <input
                    {...register("emergencyPhone")}
                    type="tel"
                    placeholder="Contact phone"
                    className={inputClass}
                  />
                </div>
              </div>
            </>
          )}

          {profile.role === "trainer" && (
            <>
              <Field
                label="Bio"
                editing={editing}
                icon={<TbNotes className="w-4 h-4 text-gray-400" />}
              >
                <textarea
                  {...register("bio")}
                  rows={3}
                  placeholder="Tell members about yourself..."
                  className={inputClass}
                />
              </Field>

              <Field
                label="Specialty"
                editing={editing}
                icon={<TbStar className="w-4 h-4 text-gray-400" />}
              >
                <input
                  {...register("specialty")}
                  type="text"
                  placeholder="e.g. Yoga, HIIT, Pilates..."
                  className={inputClass}
                />
              </Field>

              <Field
                label="Phone Number"
                editing={editing}
                icon={<TbPhone className="w-4 h-4 text-gray-400" />}
              >
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+234 800 000 0000"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Years of Experience"
                editing={editing}
                icon={<TbStar className="w-4 h-4 text-gray-400" />}
              >
                <input
                  {...register("experience")}
                  type="number"
                  min={0}
                  placeholder="e.g. 5"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Certifications"
                editing={editing}
                icon={<TbCertificate className="w-4 h-4 text-gray-400" />}
              >
                <input
                  {...register("certifications")}
                  type="text"
                  placeholder="e.g. ACE Certified, NASM (comma separated)"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Availability"
                editing={editing}
                icon={<TbClock className="w-4 h-4 text-gray-400" />}
              >
                <input
                  {...register("availability")}
                  type="text"
                  placeholder="e.g. Mon-Fri 6AM-8PM"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Date of Birth"
                editing={editing}
                icon={<TbCalendar className="w-4 h-4 text-gray-400" />}
              >
                <input
                  {...register("dateOfBirth")}
                  type="date"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Gender"
                editing={editing}
                icon={<TbUser className="w-4 h-4 text-gray-400" />}
              >
                <select {...register("gender")} className={inputClass}>
                  <option value="">Select gender</option>
                  {GENDERS.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </Field>
            </>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={updating}
              className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors disabled:opacity-60"
            >
              <TbCheck className="w-4 h-4" />
              {updating ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={updating}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <TbX className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
