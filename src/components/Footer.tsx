import Image from "next/image";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="pt-6 pb-20 md:px-10 px-4 flex flex-col md:space-y-6 space-y-20  bg-green-950">
      <div className=" md:flex md:space-x-20 md:flex-row grid grid-cols-2 gap-y-20   ">
        <div className=" flex flex-col space-y-2 ">
          <h1 className="text-white text-xs">CERTIFICATIONS</h1>
          <div className="text-gray-400 text-xs cursor-pointer">
            Why Choose Gym ontime
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">
            Personal Trainer
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">
            Health coach
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">
            Group fitness instructor
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">
            Medical exercise specialist
          </div>
        </div>
        <div className=" flex flex-col space-y-2 ">
          <h1 className="text-white text-xs">PROFESSIONALS</h1>
          <div className="text-gray-400 text-xs cursor-pointer">
            Career Support
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">Job Board</div>
          <div className="text-gray-400 text-xs cursor-pointer">
            Continuing Education
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">
            Specialist Programs
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">
            Certification Renewal
          </div>
        </div>
        <div className=" flex flex-col space-y-2 ">
          <h1 className="text-white text-xs">RESOURCES</h1>
          <div className="text-gray-400 text-xs cursor-pointer">
            Gym ontime Healthy Living Blog
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">
            Exercise Library
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">
            Tools & Calculators
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">
            Find a Gymontime Pro
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">Store</div>
        </div>
        <div className=" flex flex-col space-y-2 ">
          <h1 className="text-white text-xs">CERTIFICATIONS</h1>
          <div className="text-gray-400 text-xs cursor-pointer">
            Why Choose Gym ontime
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">
            Personal Trainer
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">
            Health coach
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">
            Group fitness instructor
          </div>
          <div className="text-gray-400 text-xs cursor-pointer">
            Medical exercise specialist
          </div>
        </div>
      </div>
      <div className="flex md:justify-end ">
        <div className=" flex flex-col space-y-2 md:mr-20 ">
          <h1 className="text-white text-xs">CONTACT US</h1>
          <div className="text-gray-400 text-xs">
            American Council on Exercise
          </div>
          <div className="text-gray-400 text-xs">4933 Paramount Drive</div>
          <div className="text-gray-400 text-xs">
            San Diego, California 92123
          </div>
          <div className="text-gray-400 text-xs">G1 (888) 825-3636</div>
          <div className="text-gray-400 text-xs">
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
