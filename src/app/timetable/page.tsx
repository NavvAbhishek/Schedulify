"use client";
import React from "react";
import { useSchedule } from "@/context/ScheduleContext";
import { days, timeSlots } from "@/helpers/algorithm";

const Timetable = () => {
  const { schedule } = useSchedule();

  const getClassStyle = (subject: string) => {
    switch (subject.toLowerCase()) {
      case "math":
        return "bg-blue-500 text-white";
      case "history":
        return "bg-red-500 text-white";
      case "science":
        return "bg-yellow-500 text-black";
      case "geography":
        return "bg-gray-500 text-white";
      case "english":
        return "bg-green-500 text-white";
      case "art":
        return "bg-purple-500 text-white";
      case "music":
        return "bg-pink-500 text-white";
      case "pe":
        return "bg-indigo-500 text-white";
      default:
        return "bg-gray-200 text-black";
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="capitalize text-dark-blue text-center mt-4 mb-8 text-3xl font-bold">
        Curriculum Schedule
      </div>
      <div className="grid grid-cols-6 gap-3" style={{ gridTemplateColumns: '1fr 2fr 2fr 2fr 2fr 2fr' }}>
        {/* Header for time slots */}
        <div></div>
        {days.map((day) => (
          <div key={day} className="text-center font-semibold">
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </div>
        ))}

        {/* Rows for each time slot */}
        {timeSlots.map((slot, slotIndex) => (
          <React.Fragment key={slot}>
            <div className="font-semibold text-center my-auto">
              {slot}
            </div>
            {days.map((day) => (
              <div key={day} className="flex justify-center items-center h-16 border border-gray-300">
                {schedule[day] && schedule[day][slot].length > 0 ? (
                  schedule[day][slot].map((cls, index) => (
                    <div
                      key={index}
                      className={`w-[60px] h-[50px] flex flex-col justify-center rounded-lg ${getClassStyle(cls.subject)} text-center`}
                    >
                      <span className="block font-bold text-xs">{cls.className}</span>
                      <span className="block text-xs">{cls.subject}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500">No Class</span>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
