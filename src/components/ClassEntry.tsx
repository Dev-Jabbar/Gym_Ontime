// Example usage in a TypeScript React component

import React from "react";

interface ClassEntry {
  day: string;
  time: string;
  type: string;
  instructor: string;
  duration: string;
  location: string;
}

const ClassSchedule: React.FC = () => {
  // Dummy data for demonstration purposes
  const scheduleData: ClassEntry[] = [
    {
      day: "Monday",
      time: "8:00 AM",
      type: "Yoga",
      instructor: "John Doe",
      duration: "1 hour",
      location: "Studio A",
    },
    {
      day: "Wednesday",
      time: "6:00 PM",
      type: "Cardio",
      instructor: "Jane Smith",
      duration: "45 minutes",
      location: "Studio B",
    },
    // Add more class entries as needed
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Class Schedule</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scheduleData.map((classEntry, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{classEntry.type}</h3>
            <p className="text-gray-600 mb-2">
              {classEntry.day} - {classEntry.time}
            </p>
            <p className="text-gray-600 mb-2">
              Instructor: {classEntry.instructor}
            </p>
            <p className="text-gray-600 mb-2">
              Duration: {classEntry.duration}
            </p>
            <p className="text-gray-600">Location: {classEntry.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassSchedule;
