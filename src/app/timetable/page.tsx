"use client"
import React from "react";
import { useSchedule } from "@/context/ScheduleContext";
import { days, timeSlots } from "@/helpers/algorithm";

const Timetable = () => {
  const { schedule } = useSchedule();

  return (
    <div>
      <div className="capitalize text-dark-blue text-center mb-8 text-3xl font-bold mt-5">
        Time Table
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {days.map((day) => (
          <div key={day} className="flex flex-col">
            <h2 className="text-lg font-bold mb-2 text-pink">
              {day.toUpperCase()}
            </h2>
            {timeSlots.map((slot) => (
              <div key={slot} className="mb-2 flex gap-3">
                <strong className="block text-dark-blue">{slot}: </strong>
                {schedule[day] && schedule[day][slot].length > 0 ? (
                  schedule[day][slot].map((cls, index) => (
                    <span key={index} className="block">
                      {cls.className} ({cls.subject}, {cls.teacherId})
                    </span>
                  ))
                ) : (
                  <span className="block">No Class</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
