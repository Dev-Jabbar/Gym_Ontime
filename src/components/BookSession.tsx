import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const BookSession = (props: Props) => {
  return (
    <div className="h-screen flex justify-center flex-col space-y-4 items-center">
      <Image
        src="/gym2.jpg"
        width={500}
        height={500}
        alt="gym sessions"
        className="h-full w-full opacity-40  hover:opacity-50 absolute"
      />

      <div className="font-extrabold text-4xl 2xl:text-6xl  text-white rounded-full  z-10">
        Gym Ontime
      </div>
      <Link href="/schedule" className="z-10">
        <div className="font-bold text-lg p-3 cursor-pointer 2xl:text-xl cursor-pointer bg-blue-400 text-gray-300 rounded-full shadow-2xl shadow-black ">
          Book a session
        </div>
      </Link>
    </div>
  );
};

export default BookSession;
