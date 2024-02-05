import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="pt-24 px-16 pb-20 bg-gray-300 h-full">
      <div className=" text-white bg-gray-600  w-full h-20 mb-20 overflow-auto fixed"></div>
      <div className="flex flex-col ">
        <div className=" bg-black  w-full  h-20  border-b-[0.5px] border-white"></div>
        <div className=" bg-black  w-full  h-20  border-b-[0.5px] border-white"></div>
        <div className=" bg-black  w-full  h-20  border-b-[0.5px] border-white"></div>
        <div className=" bg-black  w-full  h-20  border-b-[0.5px] border-white"></div>
      </div>
    </div>
  );
};

export default page;
