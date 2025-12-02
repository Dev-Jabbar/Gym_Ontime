"use client";

import React, { useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import { IoReorderThreeOutline } from "react-icons/io5";
type Props = {};

const Header = (props: Props) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleButtonClick = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <div className="flex  justify-between md:items-center  text-white">
      <div
        className={`flex flex-col md:hidden space-y-2 ${
          isRevealed ? "pb-6 " : ""
        }`}
      >
        <IoReorderThreeOutline
          className={`md:hidden h-10 w-10 cursor-pointer transition-transform transform ${
            isRevealed ? "rotate-180" : ""
          }`}
          onClick={handleButtonClick}
        />
        <div
          className={`flex flex-col space-y-4 overflow-hidden transition-all duration-300 ${
            isRevealed ? " opacity-100 max-h-52" : "max-h-0 opacity-0"
          }`}
        >
          <Link href="/">
            <div className=" font-extrabold lg:text-xl   md:hidden">
              Gym_Ontime
            </div>
          </Link>

          <Link href="/dashboard">
            <span className="cursor-pointer">Dashboard</span>
          </Link>

          <Link href="/schedule">
            <span className="cursor-pointer">Schedule</span>
          </Link>

          <Link href="/members">
            <span className="cursor-pointer">Members</span>
          </Link>

          <span className="bg-orange-500  md:hidden px-4 hover:bg-blue-500 cursor-pointer py-2 rounded-md ">
            Payments
          </span>
        </div>
      </div>

      <Link href="/">
        <div className=" font-extrabold lg:text-xl 2xl:text-3xl hidden md:block">
          Gym_Ontime
        </div>
      </Link>

      <div className=" lg:space-x-10 md:space-x-2 items-center hidden 2xl:text-2xl md:flex">
        <div className="flex items-center space-x-2 ">
          <span className="p-1 bg-gray-400 rounded-full">
            <ArrowDownIcon className="w-3 h-3 text-black "></ArrowDownIcon>
          </span>
          <Link href="/dashboard">
            <span className="cursor-pointer">Dashboard</span>
          </Link>
        </div>
        <div className="flex items-center space-x-2 ">
          <span className="p-1 bg-gray-400 rounded-full">
            <ArrowDownIcon className="w-3 h-3 text-black "></ArrowDownIcon>
          </span>

          <Link href="/schedule">
            <span className="cursor-pointer">Schedule</span>
          </Link>
        </div>
        <div className="flex items-center space-x-2 ">
          <span className="p-1 bg-gray-400 rounded-full">
            <ArrowDownIcon className="w-3 h-3 text-black"></ArrowDownIcon>
          </span>
          <Link href="/members">
            <span className="cursor-pointer">Members</span>
          </Link>
        </div>
        {/** <div className="flex items-center space-x-2 ">
          <span className="p-1 bg-gray-400 rounded-full">
            <ArrowDownIcon className="w-3 h-3 text-black"></ArrowDownIcon>
          </span>
        
          <Link href="/dashboard">
            <span className="cursor-pointer">Alert</span>
          </Link>
        </div> */}
      </div>
      <div className="flex space-x-4 md:items-center text-sm 2xl:text-lg">
        <span className="bg-orange-500 hidden md:block px-4 hover:bg-blue-500 cursor-pointer py-2 rounded-md ">
          Payments
        </span>
        <span className="bg-gray-200 mt-2 md:mt-0 h-10 overflow-hidden w-10 rounded-full  cursor-pointer text-black">
          <Image
            src="/jabbar2.jpg"
            alt="LoggedInUser"
            width={500}
            height={500}
            className="h-full w-full"
          />
        </span>
      </div>
    </div>
  );
};

export default Header;
