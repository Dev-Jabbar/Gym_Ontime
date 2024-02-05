"use client";

import Image from "next/image";
import React from "react";
import classNames from "classnames";

import { Doughnut } from "react-chartjs-2";

import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

type Props = {};

const new_members = [
  { id: 1, src: "/christy.png", time: "2 days ago", name: "Christy" },
  {
    id: 2,
    src: "/helen micheal.png",
    time: "18 seconds ago",
    name: "helen micheal",
  },
  { id: 3, src: "/john mark.png", time: "1 minute ago", name: "john mark" },
  { id: 4, src: "/paul smith.png", time: "1 hour ago", name: "paul smith" },
  {
    id: 5,
    src: "/trevor rowland.png",
    time: " 1 week ago",
    name: "trevor rowland",
  },
  { id: 6, src: "/ken ben.png", time: "3 days ago", name: "ken ben" },
  {
    id: 7,
    src: "/helen micheal.png",
    time: "20 minutes ago",
    name: "helen micheal",
  },
  { id: 8, src: "/paul smith.png", time: "5 hours ago", name: "rowland boy" },
  {
    id: 9,
    src: "/arnold.png",
    time: " 5 seconds ago",
    name: "Arnold swarzenneger",
  },
  { id: 10, src: "/christy.png", time: "10 minutes ago", name: "Christian" },
];

const classes = [
  {
    id: 1,
    time: "2:00 am - 3:00 am",
    status: "upcoming",
    classType: "Yoga class",
    capacity: 5,
  },
  {
    id: 2,
    time: "10:00 am - 11:00 am",
    status: "ongoing",
    classType: "Pilates session",
    capacity: 8,
  },
  {
    id: 3,
    time: "3:30 pm - 4:30 pm",
    status: "canceled",
    classType: "Cardio workout",
    capacity: 12,
  },
  {
    id: 4,
    time: "6:00 am - 7:00 am",
    status: "upcoming",
    classType: "Meditation class",
    capacity: 6,
  },
  {
    id: 5,
    time: "5:30 pm - 6:30 pm",
    status: "ongoing",
    classType: "Zumba dance",
    capacity: 10,
  },
  {
    id: 6,
    time: "8:00 am - 9:00 am",
    status: "canceled",
    classType: "Strength training",
    capacity: 7,
  },
  {
    id: 7,
    time: "1:00 pm - 2:00 pm",
    status: "upcoming",
    classType: "Spinning class",
    capacity: 9,
  },
  {
    id: 8,
    time: "4:00 pm - 5:00 pm",
    status: "ongoing",
    classType: "Piloxing session",
    capacity: 8,
  },
  {
    id: 9,
    time: "9:30 am - 10:30 am",
    status: "upcoming",
    classType: "HIIT workout",
    capacity: 5,
  },
  {
    id: 10,
    time: "7:30 pm - 8:30 pm",
    status: "canceled",
    classType: "Barre exercise",
    capacity: 10,
  },
  {
    id: 11,
    time: "12:00 pm - 1:00 pm",
    status: "upcoming",
    classType: "Kickboxing",
    capacity: 10,
  },
  {
    id: 12,
    time: "11:00 am - 12:00 pm",
    status: "ongoing",
    classType: "Yoga for Beginners",
    capacity: 8,
  },
  {
    id: 13,
    time: "6:30 am - 7:30 am",
    status: "canceled",
    classType: "Prenatal Yoga",
    capacity: 4,
  },
  {
    id: 14,
    time: "3:00 pm - 4:00 pm",
    status: "upcoming",
    classType: "Aerobics",
    capacity: 12,
  },
  {
    id: 15,
    time: "7:00 am - 8:00 am",
    status: "ongoing",
    classType: "Functional Fitness",
    capacity: 10,
  },
  {
    id: 16,
    time: "2:30 pm - 3:30 pm",
    status: "canceled",
    classType: "Dance Fusion",
    capacity: 15,
  },
  {
    id: 17,
    time: "5:00 pm - 6:00 pm",
    status: "upcoming",
    classType: "CrossFit",
    capacity: 12,
  },
  {
    id: 18,
    time: "8:30 am - 9:30 am",
    status: "ongoing",
    classType: "Circuit Training",
    capacity: 8,
  },
  {
    id: 19,
    time: "1:30 pm - 2:30 pm",
    status: "canceled",
    classType: "Stretching Session",
    capacity: 6,
  },
  {
    id: 20,
    time: "4:30 pm - 5:30 pm",
    status: "upcoming",
    classType: "Bodyweight Exercises",
    capacity: 10,
  },
  {
    id: 21,
    time: "8:30 pm - 9:30 pm",
    status: "canceled",
    classType: "High-Intensity Interval Training (HIIT)",
    capacity: 10,
  },
];

const calculateUsedCapacityPercentage = () => {
  const totalCapacity = classes.reduce((acc, myclass) => acc + 20, 0); // Assuming the maximum capacity is 20 for each class
  const usedCapacity = classes.reduce(
    (acc, myclass) => acc + myclass.capacity,
    0
  );
  return Math.floor((usedCapacity / totalCapacity) * 100);
};

const unusedCapacityPercentage = 100 - calculateUsedCapacityPercentage();

const capacityData = {
  labels: ["Used Capacity", "Available Capacity"],
  datasets: [
    {
      label: "My First Dataset",
      data: [calculateUsedCapacityPercentage(), unusedCapacityPercentage],
      backgroundColor: ["rgb(16, 185, 129)", "rgb(229, 231, 235)"],
      hoverOffset: 4,
    },
  ],
};

const capacityOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {}, // Add this line
};

const Dashboard = (props: Props) => {
  return (
    <div className="pt-24  py-5  bg-gray-300 w-full  md:px-16 px-4">
      <div className="grid md:grid-cols-2 md:gap-x-10 grid-cols-1 gap-y-10  ">
        <div className="h-[50rem]   flex space-y-8 flex-col">
          <div className=" w-full h-[50%] space-y-4 flex flex-col ">
            <div
              className="h-[50%] w-full bg-cover bg-center"
              style={{ backgroundImage: 'url("/gym5.gif")' }}
            >
              <div className="z-10 w-full h-full text-gray-400 flex justify-center flex-col space-y-2  pl-5">
                <div className="md:text-sm text-xs font-extrabold">
                  Members: 1480
                </div>
                <div className="md:text-sm text-xs font-extrabold">
                  Trainers: 20
                </div>
              </div>
            </div>

            <div className="h-[50%] w-full  flex space-x-4">
              <div className="h-full w-[50%] bg-white  flex justify-center items-center">
                <div className="flex md:space-x-4 space-x-2  ">
                  <span className=" font-extrabold md:text-base text-[0.6rem]  ">
                    Total Community
                  </span>
                  <span className="italic text-gray-600 outline-dotted outline-4 outline-gray-300 md:p-5 p-1">
                    1500
                  </span>
                </div>
              </div>
              <div className="h-full w-[50%] bg-white p-5">
                <Doughnut
                  data={capacityData}
                  options={capacityOptions}
                  className=""
                />
                <div className="flex justify-end">
                  <div className="flex space-x-1 items-center">
                    <span className="bg-green-500 h-2 w-2"></span>
                    <span className="italic text-[0.6rem] semi-bold">
                      Used Capacity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full pb-6 px-6 pt-6  h-[50%] bg-white ">
            <div className="pb-2 border-b-[0.2px] flex space-x-4  border-gray-300">
              <h1 className="font-bold text-xs">NEWEST SIGNUPS</h1>

              <span className="md:text-xs text-[0.6rem] font-bold text-gray-300 italic">
                WELCOME FITFAM
              </span>
            </div>

            <div className="  overflow-y-auto h-full ">
              <div className="flex space-y-2 flex-col">
                {new_members.map((member) => {
                  return (
                    <div
                      key={member.id}
                      className="flex py-2 border-b-[0.2px]  md:pr-4 items-center justify-between w-full"
                    >
                      <div className=" flex items-center  space-x-4">
                        <div className="overflow-hidden rounded-full h-8 w-8">
                          <Image
                            src={member.src}
                            alt="user"
                            height={500}
                            width={500}
                            className="h-full w-full"
                          />
                        </div>

                        <div className="md:text-xs text-[0.6rem] text-gray-500 font-bold">
                          {member.name}
                        </div>
                      </div>

                      <span className="md:text-xs text-[0.6rem] text-gray-400 font-bold">
                        {member.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="h-[50rem]  bg-white pb-9 ">
          <div className=" w-full pb-6 px-6 pt-6  h-full bg-white  ">
            <h2 className="font-bold text-xs mb-4">CLASSES</h2>
            <div className="flex w-full justify-between border-gray-300 border-b-[0.2px] ">
              <div className="pb-2  flex space-x-4  ">
                <h2 className="font-bold md:text-xs text-[0.6rem] italic text-gray-500">
                  TODAY
                </h2>

                <span className="md:text-xs text-[0.6rem] font-bold text-gray-300 italic">
                  April 08 2020
                </span>
              </div>

              <span className="md:text-xs text-[0.6rem] font-bold text-gray-300 italic">
                Used Capacity:{calculateUsedCapacityPercentage()}%
              </span>
            </div>

            <div className="  overflow-y-scroll h-full ">
              <div className="flex space-y-2 flex-col">
                {classes.map((myclass) => {
                  return (
                    <div
                      key={myclass.id}
                      className="flex py-2 border-b-[0.2px]  pr-4 items-center justify-between w-full"
                    >
                      <div className=" flex items-center justify-between w-full  ">
                        <div className="md:text-xs text-[0.6rem] text-gray-400 font-bold">
                          {myclass.time}
                        </div>

                        <div className="md:text-xs text-[0.6rem] text-gray-500    flex space-x-2 font-bold">
                          <span
                            className={classNames("", {
                              "rounded-full bg-green-900 h-3 shadow-red-700 w-3  animate-pulse":
                                myclass.status === "ongoing",
                            })}
                          ></span>
                          <span className=" italic text-yellow-950">
                            {myclass.classType}
                          </span>
                        </div>

                        <span className="md:text-xs text-[0.6rem] text-blue-400 font-bold ">
                          ({myclass.capacity}/20)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
