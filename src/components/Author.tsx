import Image from "next/image";
import React from "react";

// Author data with proper typing
interface AuthorData {
  name: string;
  title: string;
  company: string;
  image: string;
  quote: string;
  bannerImage: string;
  iconImage: string;
}

const AUTHOR_DATA: AuthorData = {
  name: "Paul Vincent",
  title: "Founder & CEO",
  company: "Gym Ontime",
  image: "/Paul Vincent.gif",
  quote:
    "Frustrated by scheduling conflicts, Paul envisioned a fitness platform that simplifies class booking. GymOnTime is the result—a user-friendly app fostering a wellness community. Paul's dedication shaped GymOnTime into a success story. Here's to making fitness accessible globally!",
  bannerImage: "/abs-banner.png",
  iconImage: "/arnold.png",
};

// Social Links Component
const SocialLinks: React.FC = () => {
  const links = [
    {
      name: "LinkedIn",
      icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
      href: "#",
    },
    {
      name: "Twitter",
      icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
      href: "#",
    },
  ];

  return (
    <div className="flex gap-3">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg 2xl:h-14 2xl:w-14"
          aria-label={link.name}
        >
          <svg
            className="h-5 w-5 fill-gray-600 transition-colors group-hover:fill-blue-600 2xl:h-6 2xl:w-6"
            viewBox="0 0 24 24"
          >
            <path d={link.icon} />
          </svg>
        </a>
      ))}
    </div>
  );
};

// Quote Card Component
interface QuoteCardProps {
  quote: string;
  iconImage: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, iconImage }) => {
  return (
    <div className="relative">
      {/* Opening Quote Mark */}
      <div className="absolute -left-4 -top-6 text-6xl font-serif text-blue-200 md:-left-6 md:-top-8 md:text-7xl 2xl:-left-8 2xl:-top-12 2xl:text-9xl">
        "
      </div>

      {/* Quote Content */}
      <blockquote className="relative rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl md:p-8 2xl:p-12">
        <p className="relative z-10 font-light leading-relaxed text-gray-700 md:text-base lg:text-lg 2xl:text-2xl 2xl:leading-relaxed">
          {quote}
        </p>

        {/* Decorative Icon */}
        <div className="mt-6 flex justify-end md:mt-8 2xl:mt-10">
          <div className="relative h-16 w-12 transition-transform duration-300 hover:scale-110 md:h-20 md:w-16 2xl:h-28 2xl:w-20">
            <Image
              src={iconImage}
              alt="Inspiration icon"
              fill
              sizes="(max-width: 768px) 48px, (max-width: 1536px) 64px, 80px"
              className="object-contain opacity-80"
            />
          </div>
        </div>

        {/* Gradient Border Effect */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
      </blockquote>

      {/* Closing Quote Mark */}
      <div className="absolute -bottom-6 -right-4 text-6xl font-serif text-blue-200 md:-bottom-8 md:-right-6 md:text-7xl 2xl:-bottom-12 2xl:-right-8 2xl:text-9xl">
        "
      </div>
    </div>
  );
};

// Main Author Component
const Author: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-12 md:py-16 lg:py-20 2xl:py-32">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-300 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-300 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12 lg:gap-16 2xl:gap-24">
          {/* Banner Image Section */}
          <div className="group relative w-full overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl md:w-1/2 lg:w-2/5">
            <div className="relative aspect-video w-full md:aspect-[4/5]">
              <Image
                src={AUTHOR_DATA.bannerImage}
                alt="Fitness inspiration banner"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm md:bottom-6 md:left-6 2xl:px-6 2xl:py-3">
                <p className="text-xs font-semibold text-gray-800 md:text-sm 2xl:text-lg">
                  🏆 Fitness Innovation Award 2024
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex w-full flex-col space-y-6 md:w-1/2 md:space-y-8 lg:w-3/5 2xl:space-y-12">
            {/* Profile Card */}
            <div className="flex items-center gap-4 md:gap-6 2xl:gap-8">
              {/* Avatar */}
              <div className="group relative overflow-hidden rounded-full shadow-xl ring-4 ring-blue-500/20 transition-all duration-500 hover:ring-8 hover:ring-blue-500/30">
                <div className="relative h-20 w-20 md:h-28 md:w-28 2xl:h-40 2xl:w-40">
                  <Image
                    src={AUTHOR_DATA.image}
                    alt={AUTHOR_DATA.name}
                    fill
                    sizes="(max-width: 768px) 80px, (max-width: 1536px) 112px, 160px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Online Status Indicator */}
                <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 md:h-5 md:w-5 2xl:h-7 2xl:w-7" />
              </div>

              {/* Name and Title */}
              <div className="flex flex-col space-y-1 2xl:space-y-2">
                <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent md:text-3xl 2xl:text-5xl">
                  {AUTHOR_DATA.name}
                </h2>
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
                  <p className="text-sm font-semibold text-gray-600 md:text-base 2xl:text-2xl">
                    {AUTHOR_DATA.title}
                  </p>
                  <span className="hidden text-gray-400 md:inline">•</span>
                  <p className="text-sm text-gray-500 md:text-base 2xl:text-xl">
                    {AUTHOR_DATA.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600 2xl:text-lg">
                Connect:
              </span>
              <SocialLinks />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-6 2xl:p-8">
              {[
                { label: "Members", value: "50K+" },
                { label: "Classes", value: "200+" },
                { label: "Cities", value: "15" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl font-bold text-blue-600 md:text-2xl 2xl:text-4xl">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-600 md:text-sm 2xl:text-lg">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Quote Section */}
            <div className="group">
              <QuoteCard
                quote={AUTHOR_DATA.quote}
                iconImage={AUTHOR_DATA.iconImage}
              />
            </div>

            {/* CTA Button */}
            <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 md:px-8 md:py-4 2xl:px-12 2xl:py-6 2xl:text-xl">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Read Full Story
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1 2xl:h-6 2xl:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Author;
