"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

// Feature highlights data
interface Feature {
  icon: string;
  text: string;
}

const FEATURES: Feature[] = [];

// Floating Feature Badge Component
const FeatureBadge: React.FC<{ feature: Feature; index: number }> = ({
  feature,
  index,
}) => {
  const positions = [
    "top-1/4 left-[5%]",
    "top-1/3 right-[8%]",
    "bottom-1/3 left-[10%]",
    "bottom-1/4 right-[5%]",
  ];

  return (
    <div
      className={`absolute hidden lg:block ${positions[index]} animate-float`}
      style={{
        animationDelay: `${index * 0.3}s`,
        animationDuration: `${3 + index * 0.5}s`,
      }}
    >
      <div className="group flex items-center gap-3 rounded-full bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/20 2xl:px-6 2xl:py-4">
        <span className="text-2xl transition-transform group-hover:scale-125 2xl:text-3xl">
          {feature.icon}
        </span>
        <span className="text-sm font-semibold text-white 2xl:text-base">
          {feature.text}
        </span>
      </div>
    </div>
  );
};

// Stat Counter Component
interface StatProps {
  value: string;
  label: string;
}

const StatCounter: React.FC<StatProps> = ({ value, label }) => (
  <div className="group flex flex-col items-center gap-2 rounded-2xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 md:p-6 2xl:p-8">
    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent transition-all group-hover:scale-110 md:text-4xl 2xl:text-6xl">
      {value}
    </span>
    <span className="text-xs font-medium text-white/80 md:text-sm 2xl:text-lg">
      {label}
    </span>
  </div>
);

// Main BookSession Component
const BookSession: React.FC = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black py-24 md:py-32 lg:py-40 2xl:py-48">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/gym2.jpg"
          fill
          sizes="100vw"
          alt="Modern gym facility with professional equipment"
          className="object-cover opacity-40 transition-opacity duration-700 hover:opacity-50"
          priority
          quality={90}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* Floating Feature Badges */}
      {FEATURES.map((feature, index) => (
        <FeatureBadge key={index} feature={feature} index={index} />
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-12 px-4 py-20 md:gap-16 md:px-6 md:py-28 lg:gap-20 lg:px-8 lg:py-36 2xl:gap-28 2xl:py-44">
        {/* Logo/Brand Section */}
        <div className="group flex flex-col items-center gap-8 text-center md:gap-10 2xl:gap-12">
          {/* Decorative Top Line */}
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-blue-400 to-transparent md:w-32 2xl:w-40" />

          {/* Main Logo/Title */}
          <div className="relative">
            <h1 className="relative text-5xl font-extrabold tracking-tight text-white transition-all duration-500 group-hover:scale-105 md:text-6xl lg:text-7xl 2xl:text-9xl">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Gym Ontime
              </span>
              {/* Glow Effect */}
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50">
                Gym Ontime
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <p className="max-w-2xl text-base font-light leading-relaxed text-white/90 md:text-lg lg:text-xl 2xl:max-w-4xl 2xl:text-3xl 2xl:leading-relaxed">
            Transform your fitness journey with personalized training sessions
            and expert guidance
          </p>

          {/* Decorative Bottom Line */}
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-purple-400 to-transparent md:w-32 2xl:w-40" />
        </div>

        {/* CTA Button */}
        <Link href="/schedule" className="group relative mt-4 md:mt-6 2xl:mt-8">
          <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-75 blur transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg" />
          <button className="relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-purple-300 md:gap-4 md:px-12 md:py-6 lg:px-14 lg:py-7 2xl:px-20 2xl:py-10 2xl:text-3xl">
            <span className="relative z-10 text-base md:text-lg lg:text-xl 2xl:text-3xl">
              Book a Session
            </span>
            <svg
              className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-2 md:h-6 md:w-6 2xl:h-10 2xl:w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </button>
        </Link>

        {/* Additional Info Section */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 md:mt-12 md:gap-8 2xl:mt-16 2xl:gap-10">
          <div className="group flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 backdrop-blur-sm transition-all hover:bg-white/10 md:gap-3 md:px-6 md:py-3 2xl:px-8 2xl:py-5">
            <span className="text-xl transition-transform group-hover:scale-125 md:text-2xl 2xl:text-4xl"></span>
            <span
              className={`bg-gradient-to-r  bg-clip-text text-xs font-semibold text-transparent md:text-sm 2xl:text-xl`}
            ></span>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default BookSession;
