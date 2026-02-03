"use client";

import Image from "next/image";
import React from "react";

// Constants for better maintainability
const PARTNER_LOGOS = [
  { src: "/image1.webp", alt: "Partner logo 1" },
  { src: "/image2.webp", alt: "Partner logo 2" },
  { src: "/image3.webp", alt: "Partner logo 3" },
  { src: "/image4.webp", alt: "Partner logo 4" },
  { src: "/image5.webp", alt: "Partner logo 5" },
  { src: "/image6.webp", alt: "Partner logo 6" },
] as const;

const CTA_BUTTONS = [
  {
    label: "Get Demo & Pricing",
    variant: "primary" as const,
    onClick: () => console.log("Demo & Pricing clicked"),
  },
  {
    label: "Watch Customer Stories",
    variant: "secondary" as const,
    onClick: () => console.log("Customer Stories clicked"),
  },
] as const;

// Separate Button component for reusability
interface ButtonProps {
  variant: "primary" | "secondary";
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out text-white focus:outline-none focus:ring-2 focus:ring-offset-2 md:px-6 md:py-3 text-xs md:text-base 2xl:text-2xl hover:shadow-lg transform hover:-translate-y-0.5";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-blue-500 hover:to-blue-600 focus:ring-orange-500",
    secondary:
      "bg-gray-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 focus:ring-gray-500",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
      type="button"
    >
      {children}
    </button>
  );
};

// Partner Logo component
interface PartnerLogoProps {
  src: string;
  alt: string;
}

const PartnerLogo: React.FC<PartnerLogoProps> = ({ src, alt }) => (
  <div className="relative h-8 w-12 flex-shrink-0 transition-transform duration-300 hover:scale-110 md:h-10 md:w-16 2xl:h-16 2xl:w-24">
    <Image
      src={src}
      fill
      sizes="(max-width: 768px) 48px, (max-width: 1536px) 64px, 96px"
      className="object-contain"
      alt={alt}
      priority={false}
    />
  </div>
);

// Main Hero Component
const Hero: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12 2xl:py-16">
      <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:items-start md:justify-between lg:gap-12 2xl:gap-16">
        {/* Content Section */}
        <div className="flex flex-1 flex-col space-y-6 md:space-y-10 2xl:space-y-16">
          {/* Heading */}
          <header className="space-y-2">
            <h1 className="text-2xl font-extrabold leading-tight text-blue-500 md:text-4xl lg:text-5xl 2xl:text-6xl">
              <span className="block">Gym Management</span>
              <span className="block">Software Fit For You</span>
            </h1>
          </header>

          {/* Description and CTA Section */}
          <div className="flex flex-col space-y-6 md:space-y-8 2xl:space-y-12">
            {/* Description */}
            <p className="max-w-xl text-xs leading-relaxed text-gray-200 md:text-base lg:text-lg 2xl:text-2xl 2xl:leading-relaxed">
              An all-in-one gym membership management software system made for
              gyms and health clubs of all sizes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              {CTA_BUTTONS.map((button) => (
                <Button
                  key={button.label}
                  variant={button.variant}
                  onClick={button.onClick}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Partner Logos */}
          <div className="pt-4 md:pt-6 2xl:pt-8">
            <div className="flex flex-wrap items-center gap-3 md:gap-5 2xl:gap-6">
              {PARTNER_LOGOS.map((logo, index) => (
                <PartnerLogo key={index} src={logo.src} alt={logo.alt} />
              ))}
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-square w-64 flex-shrink-0 overflow-hidden rounded-full shadow-2xl ring-4 ring-blue-500/20 transition-transform duration-500 hover:scale-105 md:w-80 lg:w-96 2xl:h-[40rem] 2xl:w-[40rem]">
          <Image
            src="/gym1.png"
            fill
            sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, (max-width: 1536px) 384px, 640px"
            className="object-cover"
            alt="Professional gym facility showcasing modern equipment and training area"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
