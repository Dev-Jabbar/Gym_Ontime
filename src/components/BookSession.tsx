import Image from "next/image";
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

      <div className="font-extrabold text-4xl  text-white rounded-full  z-10">
        Gym Ontime
      </div>
      <div className="font-bold text-lg p-3 cursor-pointer bg-blue-400 text-gray-300 rounded-full shadow-2xl shadow-black z-10">
        Book a session
      </div>
    </div>
  );
};

export default BookSession;
