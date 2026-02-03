import Image from "next/image";
import React from "react";

// Feature data with proper typing
interface Feature {
  id: string;
  image: string;
  alt: string;
  title: string;
  description: string;
  accentColor: string;
  size?: "small" | "medium" | "large";
}

const FEATURES: Feature[] = [
  {
    id: "class-booking",
    image: "/class_booking.png",
    alt: "Class booking interface",
    title: "Smart Class Booking",
    description:
      "Browse and book fitness classes effortlessly based on your preferences, including type, instructor, and time slots.",
    accentColor: "from-red-500 to-red-700",
    size: "medium",
  },
  {
    id: "real-time-updates",
    image: "/Real-TimeScheduleUpdates.png",
    alt: "Real-time schedule updates",
    title: "Real-Time Updates",
    description:
      "Stay informed with instant updates on class availability and schedule changes.",
    accentColor: "from-blue-500 to-blue-700",
    size: "medium",
  },
  {
    id: "user-profiles",
    image: "/UserProfiles.png",
    alt: "User profile management",
    title: "Personal Profiles",
    description:
      "Create and manage your profile with personal information, fitness goals, and complete booking history.",
    accentColor: "from-purple-500 to-purple-700",
    size: "small",
  },
  {
    id: "dashboard",
    image: "/Dashboard.gif",
    alt: "User dashboard interface",
    title: "Intuitive Dashboard",
    description:
      "Access a comprehensive overview of upcoming classes, recent bookings, and important notifications at a glance.",
    accentColor: "from-indigo-500 to-indigo-700",
    size: "large",
  },
  {
    id: "calendar",
    image: "/CalendarIntegration.webp",
    alt: "Calendar integration",
    title: "Calendar Integration",
    description:
      "Plan ahead with our monthly calendar view, making it easy to organize and track your fitness journey.",
    accentColor: "from-teal-500 to-teal-700",
    size: "small",
  },
  {
    id: "instructors",
    image: "/gym_instructor.png",
    alt: "Gym instructor profiles",
    title: "Expert Instructors",
    description:
      "Explore detailed instructor profiles showcasing their expertise, availability, and member reviews.",
    accentColor: "from-orange-500 to-orange-700",
    size: "medium",
  },
  {
    id: "ratings",
    image: "/ratings.png",
    alt: "Ratings and reviews",
    title: "Community Feedback",
    description:
      "Share your experience and read reviews from fellow members to build a supportive fitness community.",
    accentColor: "from-pink-500 to-pink-700",
    size: "large",
  },
  {
    id: "payments",
    image: "/stripe.png",
    alt: "Secure payment integration",
    title: "Secure Payments",
    description:
      "Process payments safely through our integrated payment system for classes and memberships.",
    accentColor: "from-green-500 to-green-700",
    size: "small",
  },
];

// Feature Card Component
interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const sizeClasses = {
    small: "h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 2xl:h-64 2xl:w-64",
    medium: "h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 2xl:h-72 2xl:w-72",
    large: "h-48 w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 2xl:h-80 2xl:w-80",
  };

  const isRounded = feature.id === "dashboard" || feature.id === "ratings";

  return (
    <article
      className="group flex flex-col items-center space-y-4 transition-all duration-500 hover:scale-105"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${feature.accentColor} p-1 shadow-xl transition-all duration-500 group-hover:shadow-2xl ${
          isRounded ? "rounded-full" : "rounded-2xl"
        } ${sizeClasses[feature.size || "medium"]}`}
      >
        <div
          className={`relative h-full w-full overflow-hidden bg-white ${
            isRounded ? "rounded-full" : "rounded-xl"
          }`}
        >
          <Image
            src={feature.image}
            alt={feature.alt}
            fill
            sizes="(max-width: 768px) 160px, (max-width: 1024px) 224px, (max-width: 1536px) 256px, 320px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Gradient Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
            isRounded ? "rounded-full" : "rounded-2xl"
          }`}
        />
      </div>

      {/* Content */}
      <div className="flex max-w-xs flex-col items-center space-y-2 text-center 2xl:max-w-md">
        <h3
          className={`bg-gradient-to-r ${feature.accentColor} bg-clip-text text-sm font-bold text-transparent md:text-base lg:text-lg 2xl:text-2xl`}
        >
          {feature.title}
        </h3>
        <p className="text-xs leading-relaxed text-gray-600 md:text-sm lg:text-base 2xl:text-lg">
          {feature.description}
        </p>
      </div>
    </article>
  );
};

// Main Component
const WhatWeOffer: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 lg:py-32 2xl:py-40">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-200 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-200 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <header className="mb-12 text-center md:mb-16 lg:mb-20 2xl:mb-24">
          <h2 className="relative inline-block text-3xl font-extrabold italic tracking-wide text-gray-800 md:text-4xl lg:text-5xl 2xl:text-7xl">
            <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              What We Offer
            </span>
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 md:w-32 2xl:-bottom-4 2xl:h-2 2xl:w-48" />
          </h2>
          <p className="mt-6 text-sm text-gray-600 md:text-base lg:text-lg 2xl:mt-8 2xl:text-xl">
            Discover the comprehensive features designed to elevate your fitness
            experience
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-3 lg:gap-16 xl:grid-cols-4 2xl:gap-20">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center md:mt-20 lg:mt-24 2xl:mt-32">
          <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 md:px-10 md:py-5 2xl:px-14 2xl:py-6 2xl:text-xl">
            <span className="relative z-10">Explore All Features</span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
