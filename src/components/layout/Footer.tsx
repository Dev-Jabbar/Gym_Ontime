import Image from "next/image";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="pt-6 pb-20 md:px-10 px-4 flex flex-col md:space-y-6 2xl:space-y-80 space-y-20  bg-green-950">
      <div className=" md:flex md:space-x-20 md:flex-row grid grid-cols-2 gap-y-20   ">
        <div className=" flex flex-col space-y-2 ">
          <h1 className="text-white text-xs 2xl:text-2xl">CERTIFICATIONS</h1>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Why Choose Gym ontime
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Personal Trainer
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Health coach
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Group fitness instructor
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Medical exercise specialist
          </div>
        </div>
        <div className=" flex flex-col space-y-2 ">
          <h1 className="text-white text-xs 2xl:text-2xl">PROFESSIONALS</h1>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Career Support
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Job Board
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Continuing Education
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Specialist Programs
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Certification Renewal
          </div>
        </div>
        <div className=" flex flex-col space-y-2 ">
          <h1 className="text-white text-xs 2xl:text-2xl">RESOURCES</h1>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Gym ontime Healthy Living Blog
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Exercise Library
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Tools & Calculators
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Find a Gymontime Pro
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Store
          </div>
        </div>
        <div className=" flex flex-col space-y-2 ">
          <h1 className="text-white text-xs 2xl:text-2xl">CERTIFICATIONS</h1>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Why Choose Gym ontime
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Personal Trainer
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Health coach
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Group fitness instructor
          </div>
          <div className="text-gray-400 text-xs cursor-pointer 2xl:text-xl">
            Medical exercise specialist
          </div>
        </div>
      </div>
      <div className="flex md:justify-end ">
        <div className=" flex flex-col space-y-2 md:mr-20 ">
          <h1 className="text-white text-xs 2xl:text-2xl">CONTACT US</h1>
          <div className="text-gray-400 text-xs 2xl:text-xl">
            American Council on Exercise
          </div>
          <div className="text-gray-400 text-xs 2xl:text-xl">
            4933 Paramount Drive
          </div>
          <div className="text-gray-400 text-xs 2xl:text-xl">
            San Diego, California 92123
          </div>
          <div className="text-gray-400 text-xs 2xl:text-xl">
            G1 (888) 825-3636
          </div>
          <div className="text-gray-400 text-xs 2xl:text-xl">
            Medical exercise specialist
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 pt-20">
        <span className="w-12 h-12 cursor-pointer">
          <Image
            src="/Footer-NCCA-logo.png"
            width={500}
            height={500}
            alt="img"
            className="h-full w-full"
          />
        </span>
        <span className="w-28 h-12 cursor-pointer">
          <Image
            src="/charity-navigator-logo.webp"
            width={500}
            height={500}
            alt="img"
            className="h-full w-full"
          />
        </span>

        <span className="w-28 h-12 cursor-pointer">
          <Image
            src="/Footer-bbb-logo.png"
            width={500}
            height={500}
            alt="img"
            className="h-full w-full"
          />
        </span>
        <span className="w-14 h-12 cursor-pointer">
          <Image
            src="/footer-authorizenet-logo.png"
            width={500}
            height={500}
            alt="img"
            className="h-full w-full"
          />
        </span>
        <span className="w-24 cursor-pointer h-12">
          <Image
            src="/download.png"
            width={500}
            height={500}
            alt="img"
            className="h-full w-full"
          />
        </span>
      </div>
    </div>
  );
};

export default Footer;
