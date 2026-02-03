import Image from "next/image";
import React from "react";

// Review data with proper typing
interface Review {
  id: string;
  name: string;
  role: string;
  company?: string;
  image: string;
  testimonial: string;
  rating: number;
}

const REVIEWS: Review[] = [
  {
    id: "paul-smith",
    name: "Paul Smith",
    role: "Sports & Massage Therapist",
    company: "Fibre Tense",
    image: "/paul smith.jpg",
    testimonial:
      "GymOnTime transformed my fitness routine with real-time updates, an intuitive dashboard, and user-friendly scheduling. It's my go-to tool for convenient and secure workouts.",
    rating: 5,
  },
  {
    id: "trevor-rowland",
    name: "Trevor Rowland",
    role: "Fitness Enthusiast",
    image: "/trevor rowland.jpg",
    testimonial:
      "GymOnTime revolutionizes my workouts. With real-time updates, an intuitive dashboard, and user-friendly scheduling, it's my ultimate fitness companion. Kudos to the GymOnTime team!",
    rating: 5,
  },
  {
    id: "helen-micheal",
    name: "Helen Micheal",
    role: "Lead Software Engineer",
    image: "/helen micheal.jpg",
    testimonial:
      "GymOnTime is a game-changer for my fitness as a lead software engineer. Real-time updates and user-friendly scheduling align seamlessly with my busy lifestyle. Kudos to the GymOnTime team for delivering efficiency in fitness!",
    rating: 5,
  },
  {
    id: "ken-ben",
    name: "Ken Ben",
    role: "Athletics Coach",
    image: "/ken ben.jpg",
    testimonial:
      "As an athletics coach, GymOnTime improves my fitness routine. Real-time updates and user-friendly scheduling seamlessly integrate into my dynamic schedule. Kudos to the GymOnTime team for delivering efficiency!",
    rating: 5,
  },
  {
    id: "john-mark",
    name: "John Mark",
    role: "Writer & Poet",
    image: "/john mark.png",
    testimonial:
      "As a writer and poet, GymOnTime weaves fitness seamlessly into my schedule. Real-time updates, a user-friendly dashboard, and poetic class planning make it a perfect companion. Cheers to GymOnTime for harmonizing with my writerly lifestyle.",
    rating: 5,
  },
  {
    id: "christy",
    name: "Christy",
    role: "Yoga Mentor & Trainer",
    image: "/christy.png",
    testimonial:
      "As a yoga mentor, GymOnTime seamlessly integrates into my day. Real-time updates, a serene dashboard, and user-friendly scheduling align with my yogic principles. It's not just an app; it's a mindful wellness companion. Kudos to GymOnTime!",
    rating: 5,
  },
];

// Star Rating Component
interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`h-5 w-5 transition-all duration-300 ${
            index < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-300 text-gray-300"
          } 2xl:h-7 2xl:w-7`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Review Card Component
interface ReviewCardProps {
  review: Review;
  index: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, index }) => {
  return (
    <article
      className="group relative flex h-full flex-col transition-all duration-500 hover:-translate-y-2"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Card Container */}
      <div className="relative flex h-full flex-col  rounded-2xl bg-white shadow-xl transition-all duration-500 group-hover:shadow-2xl">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40" />

        {/* Avatar Section */}
        <div className="relative -mt-16 flex justify-center px-4 md:-mt-20 2xl:-mt-24">
          <div className="relative">
            {/* Avatar Container with Gradient Ring */}
            <div className="relative overflow-hidden rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
              <div className="relative h-32 w-32 overflow-hidden rounded-full bg-white p-1 md:h-40 md:w-40 2xl:h-48 2xl:w-48">
                <Image
                  src={review.image}
                  alt={`${review.name} - ${review.role}`}
                  fill
                  sizes="(max-width: 768px) 128px, (max-width: 1536px) 160px, 192px"
                  className="rounded-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Verified Badge */}
            <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg ring-4 ring-white 2xl:h-12 2xl:w-12">
              <svg
                className="h-6 w-6 text-white 2xl:h-7 2xl:w-7"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col space-y-4 p-6 pt-8 md:space-y-5 md:p-8 2xl:space-y-6 2xl:p-10">
          {/* Name and Role */}
          <div className="space-y-2 text-center">
            <h3 className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-xl font-bold text-transparent md:text-2xl 2xl:text-3xl">
              {review.name}
            </h3>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600 md:text-base 2xl:text-xl">
                {review.role}
              </p>
              {review.company && (
                <p className="text-xs text-gray-500 md:text-sm 2xl:text-base">
                  {review.company}
                </p>
              )}
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center py-2">
            <StarRating rating={review.rating} />
          </div>

          {/* Testimonial */}
          <div className="relative flex-1">
            {/* Quote Icon */}
            <div className="absolute -left-2 -top-2 text-4xl text-blue-200 opacity-50 2xl:text-5xl">
              "
            </div>
            <blockquote className="relative z-10 text-center text-sm leading-relaxed text-gray-600 md:text-base 2xl:text-lg 2xl:leading-relaxed">
              {review.testimonial}
            </blockquote>
          </div>

          {/* Decorative Bottom Border */}
          <div className="flex justify-center pt-4">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-24 2xl:h-1.5" />
          </div>
        </div>
      </div>
    </article>
  );
};

// Main Reviews Component
const Reviews: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 md:py-28 lg:py-36 2xl:py-48">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-300 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-300 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-300 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <header className="mb-20 text-center md:mb-28 lg:mb-32 2xl:mb-40">
          <div className="relative inline-block">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-lg backdrop-blur-sm 2xl:px-6 2xl:py-3">
              <svg
                className="h-5 w-5 text-yellow-500 2xl:h-6 2xl:w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700 2xl:text-lg">
                Trusted by 50,000+ Members
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="relative mb-4 text-3xl font-extrabold italic tracking-wide md:text-4xl lg:text-5xl 2xl:text-7xl">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                What Our Members Say
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mx-auto max-w-2xl text-sm text-gray-600 md:text-base lg:text-lg 2xl:text-xl">
              Real stories from real people who transformed their fitness
              journey with GymOnTime
            </p>

            {/* Decorative underline */}
            <div className="mt-6 flex justify-center">
              <div className="h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 md:w-32 2xl:h-2 2xl:w-48" />
            </div>
          </div>
        </header>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 pt-16 md:grid-cols-2 md:gap-x-10 md:gap-y-32 md:pt-20 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-36 2xl:gap-x-16 2xl:gap-y-40 2xl:pt-24">
          {REVIEWS.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Bottom Stats Section */}
        <div className="mt-20 md:mt-28 lg:mt-32 2xl:mt-40">
          <div className="rounded-3xl bg-white/80 p-8 shadow-2xl backdrop-blur-sm md:p-12 2xl:p-16">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 2xl:gap-12">
              {[
                { label: "Average Rating", value: "4.9/5", icon: "⭐" },
                { label: "Total Reviews", value: "12,500+", icon: "💬" },
                { label: "Happy Members", value: "50K+", icon: "😊" },
                { label: "Success Stories", value: "8,900+", icon: "🎯" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 text-center"
                >
                  <span className="text-3xl 2xl:text-5xl">{stat.icon}</span>
                  <p className="text-2xl font-bold text-gray-800 md:text-3xl 2xl:text-5xl">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-600 md:text-sm 2xl:text-lg">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center md:mt-16 2xl:mt-20">
          <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 md:px-10 md:py-5 2xl:px-14 2xl:py-6 2xl:text-xl">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Join Our Community
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
