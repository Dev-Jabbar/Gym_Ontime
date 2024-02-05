"use client";

import React, { useState } from "react";

import Image from "next/image";
import MyModal from "../Modal/MyModal";

type Props = {
  open: boolean;
  onClose: () => void;
  userForModal: UserForModal | undefined;
};

type UserForModal = {
  name: string;
  image: string;
  height: string;
  weight: string;
  email: string;
  type: string;
  phone: string;
};
const MemberModal = ({ open, onClose, userForModal }: Props) => {
  return (
    <>
      <MyModal open={open} onClose={onClose}>
        <span className=" bg-yellow-500 text-sm text-black p-1">
          {userForModal?.type}
        </span>
        <div className="h-[400px] w-[270px] flex flex-col items-center  space-y-4">
          <div className="h-[155px] w-[155px] flex justify-center items-center border-4 border-purple-600 rounded-full ">
            <div className="  h-[150px] w-[150px] border-8 border-black rounded-full overflow-hidden  ">
              <Image
                alt="memberImage"
                src={`/${userForModal?.image}`}
                width={500}
                height={500}
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="text-white text-center">{userForModal?.name}</div>
            <div className=" w-full font-bold text-purple-600  text-center">
              {userForModal?.phone}
            </div>
            <div className=" w-full font-bold text-gray-300  text-center">
              {userForModal?.email}
            </div>
          </div>

          <div className="pt-4">
            <span className="text-white bg-purple-600 border-purple-600 border-2 py-2 px-4 text-sm">
              height {userForModal?.height}
            </span>

            <span className=" bg-black border-2 py-2 px-4 ml-2 text-sm border-purple-600 text-purple-200">
              weight {userForModal?.weight}
            </span>
          </div>
        </div>
      </MyModal>
    </>
  );
};

export default MemberModal;
