import Image from "next/image";
import React from "react";

type Props = {};

const Reviews = (props: Props) => {
  return (
    <div className="md:px-16 pb-40 pt-20 bg-blue-100 ">
      <h1
        className="text-center md:text-4xl text-2xl font-extrabold text-gray-700 mb-40 italic  tracking-widest"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
      >
        Some Cool Reviews
      </h1>

      <div className="  flex items-center justify-center ">
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-x-10 gap-y-40 ">
          <div className="h-[25rem] w-[20rem] pb-2 px-4 shadow-lg shadow-black flex justify-center bg-white relative">
            <div className="absolute h-[10rem] w-[10rem] rounded-full -top-20  overflow-hidden bg-gray-300">
              <Image
                src="/paul smith.png"
                alt="paul smith"
                height={500}
                width={500}
                className="h-full w-full"
              />
            </div>
            <div className="mt-20 flex space-y-4 items-center flex-col">
              <div className="font-bold pt-1">Paul smith</div>
              <div className="font-extralight text-sm">
                Sports & massage therapist,Fibre tense
              </div>

              <div className="font-light text-sm text-gray-500 pt-6">
                "GymOnTime transformed my fitness routine with real-time
                updates, an intuitive dashboard, and user-friendly scheduling.
                It's my go-to tool for convenient and secure workouts."
              </div>
            </div>
          </div>
          <div className="h-[25rem] w-[20rem] pb-2 px-4 shadow-lg shadow-black flex justify-center bg-white relative">
            <div className="absolute h-[10rem] w-[10rem] rounded-full -top-20  overflow-hidden bg-gray-300">
              <Image
                src="/trevor rowland.png"
                alt="trevor rowland"
                height={500}
                width={500}
                className="h-full w-full"
              />
            </div>
            <div className="mt-20 flex space-y-4 items-center flex-col">
              <div className="font-bold pt-1">trevor rowland</div>
              <div className="font-extralight text-sm">Fitness Ethausiat</div>

              <div className="font-light text-sm text-gray-600 pt-6">
                "GymOnTime revolutionizes my workouts. With real-time updates,
                an intuitive dashboard, and user-friendly scheduling, it's my
                ultimate fitness companion. Kudos to the GymOnTime team!"
              </div>
            </div>
          </div>
          <div className="h-[25rem] w-[20rem] pb-2 px-4 shadow-lg shadow-black flex justify-center bg-white relative">
            <div className="absolute h-[10rem] w-[10rem] rounded-full -top-20  overflow-hidden bg-gray-300">
              <Image
                src="/helen micheal.png"
                alt="helen micheal"
                height={500}
                width={500}
                className="h-full w-full"
              />
            </div>
            <div className="mt-20 flex space-y-4 items-center flex-col">
              <div className="font-bold">helen micheal</div>
              <div className="font-extralight text-sm">
                lead, software Engineer
              </div>

              <div className="font-light text-sm text-gray-600 pt-6">
                "GymOnTime is a game-changer for my fitness as a lead software
                engineer. Real-time updates and user-friendly scheduling align
                seamlessly with my busy lifestyle. Kudos to the GymOnTime team
                for delivering efficiency in fitness!"
              </div>
            </div>
          </div>
          <div className="h-[25rem] w-[20rem] pb-2 px-4 shadow-lg shadow-black flex justify-center bg-white relative">
            <div className="absolute h-[10rem] w-[10rem] rounded-full -top-20  overflow-hidden bg-gray-300">
              <Image
                src="/ken ben.png"
                alt="ken ben"
                height={500}
                width={500}
                className="h-full w-full"
              />
            </div>
            <div className="mt-20 flex space-y-2 items-center flex-col">
              <div className="font-bold">ken ben</div>
              <div className="font-extralight text-sm">Athletics coach</div>

              <div className="font-light text-sm text-gray-600 pt-6">
                "As an athletics coach, GymOnTime improves my fitness routine.
                Real-time updates and user-friendly scheduling seamlessly
                integrate into my dynamic schedule. Kudos to the GymOnTime team
                for delivering efficiency!"
              </div>
            </div>
          </div>
          <div className="h-[25rem] w-[20rem] pb-2 px-4 shadow-lg shadow-black flex justify-center bg-white relative">
            <div className="absolute h-[10rem] w-[10rem] rounded-full -top-20  overflow-hidden bg-gray-300">
              <Image
                src="/john mark.png"
                alt="john mark"
                height={500}
                width={500}
                className="h-full w-full"
              />
            </div>
            <div className="mt-20 flex space-y-4 items-center flex-col">
              <div className="font-bold">john mark</div>
              <div className="font-extralight text-sm">writer & poet</div>

              <div className="font-light text-sm text-gray-600 pt-6">
                "As a writer and poet, GymOnTime weaves fitness seamlessly into
                my schedule. Real-time updates, a user-friendly dashboard, and
                poetic class planning make it a perfect companion. Cheers to
                GymOnTime for harmonizing with my writerly lifestyle."
              </div>
            </div>
          </div>
          <div className="h-[25rem] w-[20rem] pb-2 px-4 shadow-lg shadow-black flex justify-center bg-white relative">
            <div className="absolute h-[10rem] w-[10rem] rounded-full -top-20  overflow-hidden bg-gray-300">
              <Image
                src="/christy.png"
                alt="christy"
                height={500}
                width={500}
                className="h-full w-full"
              />
            </div>
            <div className="mt-20 flex space-y-4 items-center flex-col">
              <div className="font-bold">christy</div>
              <div className="font-extralight text-sm">Yoga mentor/trainer</div>

              <div className="font-light text-sm text-gray-600 pt-6">
                "As a yoga mentor, GymOnTime seamlessly integrates into my day.
                Real-time updates, a serene dashboard, and user-friendly
                scheduling align with my yogic principles. It's not just an app;
                it's a mindful wellness companion. Kudos to GymOnTime!"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
