import Image from "next/image";
import React from "react";

type Props = {};

const Author = (props: Props) => {
  return (
    <div className="pt-16">
      <div className="md:flex flex flex-col md:flex-row md:space-x-10 2xl:space-x-80 space-y-5">
        <div className="md:h-[25rem] md:w-[30rem] 2xl:h-[50rem] 2xl:w-[60rem] h-[15rem] w-[25rem] overflow-hidden">
          <Image
            width={500}
            height={500}
            src="/abs-banner.png"
            alt="author"
            className=" h-full w-full"
          />
        </div>

        <div className="flex flex-col space-y-2 2xl:space-y-10">
          <div className="overflow-hidden 2xl:h-[10rem] 2xl:w-[10rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] rounded-full shadow-lg shadow-black">
            <Image
              height={500}
              width={500}
              src="/Paul Vincent.gif"
              alt="owner image"
              className="h-full w-full"
            />
          </div>
          <div className="text-gray-400 font-bold text-lg 2xl:text-2xl">
            Paul Vincent
          </div>
          <div className="text-gray-800  2xl:text-xl">Founder , Gym Ontime</div>

          <div className="flex flex-col max-w-2xl 2xl:max-w-5xl ">
            <div className="pt-10 font-light text-gray-600 2xl:text-xl">
              "Frustrated by scheduling conflicts, Paul envisioned a fitness
              platform that simplifies class booking. GymOnTime is the result—a
              user-friendly app fostering a wellness community. Paul's
              dedication shaped GymOnTime into a success story. Here's to making
              fitness accessible globally!"
            </div>

            <div className="flex justify-end">
              <div className="md:h-[6rem] md:w-[5rem] h-[3rem] w-[2rem]">
                <Image
                  width={500}
                  height={500}
                  src="/arnold.png"
                  alt="arnold Image"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
