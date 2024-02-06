import Image from "next/image";
import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="md:flex md:justify-between md:flex-row flex flex-col-reverse">
      <div className="text-blue-500 md:space-y-10 2xl:space-y-32 space-y-6 flex flex-col pb-10 md:pb-20">
        <div className="text-blue-500 space-y-2 flex flex-col">
          <span className=" md:text-4xl 2xl:text-6xl text-2xl font-extrabold">
            Gym Management
          </span>
          <span className=" md:text-4xl 2xl:text-6xl  text-2xl font-extrabold">
            Software Fit For You
          </span>
        </div>

        <div className="flex flex-col space-y-8 2xl:space-y-20">
          <div className="flex flex-col space-y-1 md:text-base text-xs 2xl:text-3xl text-white">
            <span>An all-in-one gym membership management software</span>
            <span>system made for gyms and health clubs of all sizes.</span>
          </div>

          <div className="flex space-x-4  items-center text-sm">
            <span className="bg-orange-500 md:px-4 2xl:text-2xl px-2 font-light text-white hover:bg-blue-500 cursor-pointer md:py-2 py-1 rounded-md ">
              Get Demo & Pricing
            </span>
            <span className="bg-gray-500 md:px-4 px-2 2xl:text-2xl rounded-md md:py-2 py-1 cursor-pointer hover:bg-blue-500 text-white opacity-80">
              Watch Customer Stories
            </span>
          </div>
        </div>
        <div className="flex md:space-x-5 space-x-2">
          <span className=" h-[2rem] w-[3rem] 2xl:h-[4rem] 2xl:w-[8rem] ">
            <Image
              src="/image1.webp"
              width={500}
              height={500}
              className="h-full w-full object-contain "
              alt="Gym image"
            />
          </span>
          <span className=" h-[2rem] w-[4rem] 2xl:h-[4rem] 2xl:w-[8rem] ">
            <Image
              src="/image2.webp"
              width={500}
              height={500}
              className="h-full w-full object-contain "
              alt="Gym image"
            />
          </span>
          <span className=" h-[2rem] w-[4rem] 2xl:h-[4rem] 2xl:w-[8rem] ">
            <Image
              src="/image3.webp"
              width={500}
              height={500}
              className="h-full w-full object-contain "
              alt="Gym image"
            />
          </span>
          <span className=" h-[2rem] w-[4rem] 2xl:h-[4rem] 2xl:w-[8rem]  ">
            <Image
              src="/image4.webp"
              width={500}
              height={500}
              className="h-full w-full object-contain  "
              alt="Gym image"
            />
          </span>

          <span className=" h-[2rem] w-[4rem] 2xl:h-[4rem] 2xl:w-[8rem] ">
            <Image
              src="/image5.webp"
              width={500}
              height={500}
              className="h-full w-full object-contain  "
              alt="Gym image"
            />
          </span>

          <span className=" h-[2rem] w-[4rem] 2xl:h-[4rem] 2xl:w-[8rem] ">
            <Image
              src="/image6.webp"
              width={500}
              height={500}
              className="h-full w-full  object-contain  "
              alt="Gym image"
            />
          </span>
        </div>
      </div>

      <div className="w-[15rem] rounded-full overflow-hidden mb-5 md:mb-0 2xl:h-[40rem] 2xl:w-[25rem]">
        <Image
          src="/gym1.png"
          width={500}
          height={500}
          className="h-full w-full "
          alt="Gym image"
        />
      </div>
    </div>
  );
};

export default Hero;
