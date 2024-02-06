import Image from "next/image";
import React from "react";

type Props = {};

const WhatWeOffer = (props: Props) => {
  return (
    <div className="md:my-[12rem] 2xl:my-[20rem] my-32 ">
      <h1
        className="text-center md:text-4xl text-2xl 2xl:text-6xl font-extrabold text-gray-700 italic  tracking-widest"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
      >
        What we offer
      </h1>

      <div className="flex justify-center md:space-x-40 space-x-2 items-center mt-10">
        <span className="h-[10rem] w-[10rem] 2xl:h-[20rem] 2xl:w-[20rem] cursor-pointer ">
          <Image
            width={500}
            height={500}
            src="/class_booking.jpg"
            alt="arnold Image"
            className="w-full h-full"
          />
          <span className=" md:text-xs text-[0.6rem] 2xl:text-lg text-red-900 font-extrabold">
            Users can easily browse and book fitness classes based on their
            preferences, including type, instructor, and time
          </span>
        </span>

        <span className="h-[10rem] w-[10rem] 2xl:h-[20rem] 2xl:w-[20rem]  cursor-pointer ">
          <Image
            width={500}
            height={500}
            src="/Real-TimeScheduleUpdates.png"
            alt="arnold Image"
            className="w-full h-full "
          />
          <span className="md:text-xs text-[0.6rem] 2xl:text-lg text-blue-900 pt-4 font-extrabold">
            The platform provides real-time updates on class availability,
            ensuring users have the latest information.
          </span>
        </span>
      </div>
      <div className="md:flex md:justify-around 2xl:pb-20  md:items-center gap-y-[10rem] grid grid-cols-2 mt-40">
        <span className="md:h-[10rem] md:w-[10rem] 2xl:h-[20rem] 2xl:w-[20rem]  h-[7rem] w-[7rem] cursor-pointer ">
          <Image
            width={500}
            height={500}
            src="/UserProfiles.jpg"
            alt="arnold Image"
            className="w-full h-full"
          />
          <span className=" md:text-xs text-[0.6rem] 2xl:text-lg text-black font-extrabold">
            Members can create and manage their profiles, including personal
            information, fitness preferences, and booking history.
          </span>
        </span>

        <span className="md:h-[20rem] md:w-[20rem] h-[10rem] w-[10rem] cursor-pointer ">
          <Image
            width={500}
            height={500}
            src="/Dashboard.gif"
            alt="arnold Image"
            className="w-full h-full rounded-full "
          />
          <span className="md:text-xs text-[0.6rem] 2xl:text-lg text-blue-900 pt-4 font-extrabold">
            A user-friendly dashboard offers a quick overview of upcoming
            classes, recent bookings, and notifications.
          </span>
        </span>

        <span className="md:h-[10rem] md:w-[10rem] 2xl:h-[20rem] 2xl:w-[20rem]  h-[10rem] w-[15rem] cursor-pointer ">
          <Image
            width={500}
            height={500}
            src="/CalendarIntegration.webp"
            alt="arnold Image"
            className="w-full h-full "
          />
          <span className="md:text-xs text-[0.6rem] 2xl:text-lg text-blue-900 pt-4 font-extrabold">
            GymOnTime integrates a monthly calendar view, allowing users to plan
            and track their fitness schedules efficiently.
          </span>
        </span>
      </div>

      <div className="md:flex md:justify-center md:space-x-10 2xl:space-x-28 grid grid-cols-2 gap-y-32   md:items-center md:mt-20 mt-28 ">
        <span className="h-[10rem] w-[10rem]  2xl:h-[20rem] 2xl:w-[20rem]  cursor-pointer ">
          <Image
            width={500}
            height={500}
            src="/InstructorProfiles.webp"
            alt="arnold Image"
            className="w-full h-full"
          />
          <span className=" md:text-xs text-[0.6rem] 2xl:text-lg text-black font-extrabold">
            Detailed profiles of gym instructors, showcasing expertise,
            schedules, and member reviews.
          </span>
        </span>

        <span className="md:h-[20rem] md:w-[20rem] h-[10rem] w-[10rem] cursor-pointer ">
          <Image
            width={500}
            height={500}
            src="/FeedbackandRatings.gif"
            alt="arnold Image"
            className="w-full h-full rounded-full  "
          />
          <span className="md:text-xs text-[0.6rem] 2xl:text-lg text-blue-900  font-extrabold">
            Users can provide feedback and ratings for classes and instructors,
            fostering a community-driven approach.
          </span>
        </span>

        <span className="h-[10rem] md:w-[10rem] 2xl:h-[20rem] 2xl:w-[20rem]  w-[15rem] cursor-pointer ">
          <Image
            width={500}
            height={500}
            src="/PaymentIntegration.png"
            alt="arnold Image"
            className="w-full h-full "
          />
          <span className=" md:text-xs text-[0.6rem] 2xl:text-lg text-blue-900 pt-4 font-extrabold">
            For applicable services, GymOnTime integrates a secure payment
            system for paid classes or memberships.
          </span>
        </span>
      </div>
    </div>
  );
};

export default WhatWeOffer;
