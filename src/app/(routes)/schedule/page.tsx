"use client";

import React, { useState } from "react";

import Image from "next/image";
import MemberModal from "@/components/ModalContent/UserModal";
import CreateClassModal from "@/components/ModalContent/CreateClassModal";

import { ForwardIcon, BackwardIcon } from "@heroicons/react/24/solid";
import { useTypewriter } from "react-simple-typewriter";

type User = {
  id: number;
  name: string;
  image: string;
  height: string;
  weight: string;
  email: string;
  type: string;
  phone: string;
};
type Props = {};

const Schedule = (props: Props) => {
  const members = [
    {
      id: 1,
      name: "Momoh Abdul Jabbar ",
      image: "jabbar2.jpg",
      height: "6ft",
      weight: "10lbs",
      email: "momohabduljabbar@gmail.com",
      type: "member",
      phone: "+2347066986305",
    },
    {
      id: 2,
      name: " helen micheal",
      image: "helen micheal.png",
      height: "6ft",
      weight: "10lbs",
      email: "momohabduljabbar@gmail.com",
      type: "member",
      phone: "+2347066986305",
    },
    {
      id: 3,
      name: "paul smith ",
      image: "paul smith.png",
      height: "6ft",
      weight: "10lbs",
      email: "momohabduljabbar@gmail.com",
      type: "member",
      phone: "+2347066986305",
    },
    {
      id: 4,
      name: "ken ben ",
      image: "ken ben.png",
      height: "6ft",
      weight: "10lbs",
      email: "momohabduljabbar@gmail.com",
      type: "member",
      phone: "+2347066986305",
    },
    {
      id: 5,
      name: "Momoh Abdul Jabbar ",
      image: "jabbar2.jpg",
      height: "6ft",
      weight: "10lbs",
      email: "momohabduljabbar@gmail.com",
      type: "member",
      phone: "+2347066986305",
    },
    {
      id: 6,
      name: "Momoh Abdul Jabbar ",
      image: "jabbar2.jpg",
      height: "6ft",
      weight: "10lbs",
      email: "momohabduljabbar@gmail.com",
      type: "member",
      phone: "+2347066986305",
    },
    {
      id: 7,
      name: "Momoh Abdul Jabbar ",
      image: "jabbar2.jpg",
      height: "6ft",
      weight: "10lbs",
      email: "momohabduljabbar@gmail.com",
      type: "member",
      phone: "+2347066986305",
    },
    {
      id: 8,
      name: "Momoh Abdul Jabbar ",
      image: "jabbar2.jpg",
      height: "6ft",
      weight: "10lbs",
      email: "momohabduljabbar@gmail.com",
      type: "member",
      phone: "+2347066986305",
    },
    {
      id: 9,
      name: "Momoh Abdul Jabbar ",
      image: "jabbar2.jpg",
      height: "6ft",
      weight: "10lbs",
      email: "momohabduljabbar@gmail.com",
      type: "member",
      phone: "+2347066986305",
    },
  ];

  const trainers = [
    {
      id: 1,
      name: "Susan wellson ",
      image: "trainer2.jpg",
      height: "5'6ft",
      weight: "13lbs",
      email: "Susan wellson@gmail.com",
      type: "trainer",
      phone: "+26379292020",
    },
    {
      id: 2,
      name: "Momoh Abdul Jabbar ",
      image: "jabbar2.jpg",
      height: "6ft",
      weight: "10lbs",
      email: "momohabduljabbar@gmail.com",
      type: "member",
      phone: "+2347066986305",
    },
    {
      id: 3,
      name: "Momoh Abdul Jabbar ",
      image: "jabbar2.jpg",
      height: "6ft",
      weight: "10lbs",
      email: "momohabduljabbar@gmail.com",
      type: "member",
      phone: "+2347066986305",
    },
  ];

  const [modalChoice, setModalChoice] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [userForModal, setUserForModal] = useState<User | undefined>();

  const handleOpenUser = (userType: User) => {
    setModalChoice("userModal");
    setUserForModal(userType);
    setOpenModal(true);
  };

  const handleOpenCreateClass = () => {
    setModalChoice("createClass");

    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const wordsArray = [
    "Welcome to the Yoga Journey",
    "Find inner peace through practice",
    "Connect your mind, body, and soul",
    "Balance and harmony await you",
    "Breathe, stretch, and let go",
  ];

  const [text] = useTypewriter({
    words: wordsArray,
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <>
      {modalChoice === "userModal" && (
        <MemberModal
          open={openModal}
          onClose={handleClose}
          userForModal={userForModal}
        />
      )}

      {modalChoice === "createClass" && (
        <CreateClassModal open={openModal} onClose={handleClose} />
      )}

      <div className="pt-24 p-10 md:px-20 px-4 bg-gray-300">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-y-0 gap-y-10 ">
          <div className="h-[600px] bg-gray-700 flex justify-center items-center md:w-[400px] rounded-lg relative ">
            <div className="flex w-full justify-around items-center absolute  top-10">
              <BackwardIcon className="h-7 w-7 cursor-pointer text-green-700 shadow-lg  hover:text-white  font-extrabold" />
              <div className=" text-green-500  decoration-dotted">
                YOGA CLASS
              </div>
              <ForwardIcon className="h-7 w-7 cursor-pointer text-green-700 shadow-lg  hover:text-white  font-extrabold" />
            </div>

            <div className="h-56 w-56 rounded-full flex justify-center items-center bg-green-500 absolute">
              <div className="relative top-0 z-10 h-[350px] w-[300px]">
                <Image
                  src="/bodybuilder.webp"
                  width={500}
                  height={500}
                  alt="strong_man"
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="text-green-500 pt-20 absolute bottom-10 italic ">
              {text}
            </div>
          </div>

          <div className="md:h-[600px] flex flex-col md:w-[600px] md:space-y-10 space-y-32">
            <div className="h-[80%] md:flex md:flex-row flex space-y-5 md:space-y-0 flex-col">
              <div className="md:w-[50%]  bg-white  p-5">
                <h2 className="font-bold text-xs mb-8">Members</h2>

                <div className=" overflow-y-auto h-[86%]  relative ">
                  <div className="flex space-y-2  flex-col">
                    {members.map((member) => {
                      return (
                        <div
                          key={member.id}
                          className="flex py-2 border-b-[0.2px]  cursor-pointer pr-4 items-center justify-between w-full"
                          onClick={() => handleOpenUser(member)}
                        >
                          <span className="text-xs text-gray-500 max-w-[180px] ">
                            {member.name}
                          </span>
                          <span className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={`/${member.image}`}
                              alt="jabbar"
                              width={500}
                              height={500}
                              className="w-full h-full"
                            />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="md:w-[50%]  bg-white flex flex-col  space-y-2 p-5 pt-16">
                <div className="h-[70%] bg-black">
                  <Image
                    src="/yoga.gif"
                    alt="classType"
                    height={500}
                    width={500}
                    className="w-full h-full"
                  />
                </div>
                <h2 className="font-bold text-xs mb-4 pt-4">Trainers</h2>
                <div className="h-[30%] overflow-y-auto">
                  <div className="flex space-y-2  flex-col">
                    {trainers.map((trainer) => {
                      return (
                        <div
                          key={trainer.id}
                          className="flex py-2 border-b-[0.2px]  cursor-pointer pr-4 items-center justify-between w-full"
                          onClick={() => handleOpenUser(trainer)}
                        >
                          <span className="text-xs text-gray-500 max-w-[180px] ">
                            {trainer.name}
                          </span>
                          <span className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={`/${trainer.image}`}
                              alt="jabbar"
                              width={500}
                              height={500}
                              className="w-full h-full"
                            />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:h-[30%] bg-gray-400 flex items-center  justify-between  p-4">
              <div className="flex space-x-4 items-center">
                <div
                  className="h-[2.2rem] w-[6rem] flex items-center justify-center align-middle text-sm bg-gradient-to-r from-green-400 via-cyan-900 to-blue-500 cursor-pointer  shadow-sm rounded-md shadow-gray-200 text-gray-200"
                  onClick={handleOpenCreateClass}
                >
                  <span>Create Class</span>
                </div>
                <div className="h-[2.2rem] w-[6rem] flex items-center justify-center align-middle text-sm bg-gradient-to-r  via-cyan-400 from-green-900 font-bold to-blue-500 cursor-pointer  shadow-sm rounded-md shadow-gray-200 text-gray-200">
                  <span>Join Class</span>
                </div>
              </div>

              <div className="flex space-x-4 items-center">
                <div className="h-[2.2rem] w-[6rem] flex items-center justify-center align-middle text-sm bg-gradient-to-r    font-bold from-red-900 to-pink-400 via-yellow-600 cursor-pointer  shadow-sm rounded-md shadow-gray-200 text-gray-200">
                  <span>Quit Class</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;
