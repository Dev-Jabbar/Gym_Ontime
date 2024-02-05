import React, { useState } from "react";
import MyModal from "../Modal/MyModal";
import { Listbox, Transition } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type Props = {
  open: boolean;
  onClose: () => void;
};

const classesType = [
  { name: "Yoga" },
  { name: "Calisthenics" },
  { name: "Boxing" },
  { name: "Pilates" }, // Added a new class type
];

function CreateClassModal({ onClose, open }: Props) {
  const [selected, setSelected] = useState(classesType[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      className: selected.name,
      startDate,
      endDate,
    });
  };

  return (
    <MyModal onClose={onClose} open={open}>
      <div
        className="p-20 relative" // Add position: relative
        style={{
          backgroundImage: `url(/Gymclass.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-2xl font-bold text-black font-extrabold bg-gray-300 mb-4">
          Create a New Class
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Class Type */}
          <div className="mb-4 relative">
            {" "}
            {/* Add position: relative */}
            <label
              className="block text-gray-700 text-sm text-white font-bold mb-2"
              htmlFor="classType"
            >
              Class Type
            </label>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1 z-10">
                {" "}
                {/* Add z-10 for higher z-index */}
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {classesType.map((classType, classIdx) => (
                      <Listbox.Option
                        key={classIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={classType}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {classType.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm text-white font-bold mb-2"
              htmlFor="startDate"
            >
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date as Date)}
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm text-white font-bold mb-2"
              htmlFor="endDate"
            >
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date as Date)}
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Class Image */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm text-white font-bold mb-2"
              htmlFor="classImage"
            >
              Class Image URL
            </label>
            <input
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              type="text"
              id="classImage"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Create Class
          </button>
        </form>
      </div>
    </MyModal>
  );
}

export default CreateClassModal;
