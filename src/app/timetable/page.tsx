"use client";
import React, { useState } from "react";
import { useSchedule } from "@/context/ScheduleContext";
import { days, timeSlots } from "@/helpers/algorithm";

const Timetable = () => {
  const { schedule } = useSchedule();
  const [filterClassName, setFilterClassName] = useState<string>("");
  const [filterTeacherId, setFilterTeacherId] = useState<string>("");
  const [filteredSchedule, setFilteredSchedule] = useState(schedule);

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
      case "java":
        return "bg-indigo-500 text-white";
      default:
        return "bg-gray-200 text-black";
    }
  };

  const formatTeacherName = (fullName: string) => {
    const [firstName, lastName] = fullName.split(" ");
    const initial = firstName.charAt(0);
    return `${initial} ${lastName}`;
  };

  const handleSearch = () => {
    if (!filterClassName && !filterTeacherId) {
      setFilteredSchedule(schedule);
      return;
    }

    //? declares a new object, newSchedule, which will store the filtered timetable data
    const newSchedule: typeof schedule = {};

    days.forEach((day) => {
      newSchedule[day] = {};
      timeSlots.forEach((slot) => {
        newSchedule[day][slot] = schedule[day][slot].filter((cls) => {
          return (
            (!filterClassName || cls.className.toLowerCase().includes(filterClassName.toLowerCase())) &&
            (!filterTeacherId || cls.teacherId.toLowerCase().includes(filterTeacherId.toLowerCase()))
          );
        });
      });
    });

    setFilteredSchedule(newSchedule);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div>
        <div className="capitalize text-dark-blue text-center mt-4 text-3xl font-bold">
          Timetable 📅
        </div>
        <div className="mb-5">
          <input
            className="p-2 mr-3 border border-purple rounded-lg text-purple mb-4 focus:border-purple focus:ring focus:ring-purple transition duration-200"
            type="text"
            id="className"
            value={filterClassName}
            onChange={(e) => setFilterClassName(e.target.value)}
            placeholder="Enter class name"
          />
          <input
            className="p-2 mr-3 border border-purple rounded-lg text-purple mb-4 focus:border-purple focus:ring focus:ring-purple transition duration-200"
            type="text"
            id="teacherId"
            value={filterTeacherId}
            onChange={(e) => setFilterTeacherId(e.target.value)}
            placeholder="Enter teacher id"
          />
          <button
            className="pink-button p-2 font-bold"
            onClick={handleSearch}
          >
            Search 🔍
          </button>
        </div>
      </div>
      <div
        className="grid grid-cols-6 gap-3"
        style={{ gridTemplateColumns: "1fr 2fr 2fr 2fr 2fr 2fr" }}
      >
        <div></div>
        {days.map((day) => (
          <div key={day} className="text-center font-semibold">
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </div>
        ))}

        {timeSlots.map((slot) => (
          <React.Fragment key={slot}>
            <div className="font-semibold text-center my-auto">{slot}</div>
            {days.map((day) => (
              <div
                key={day}
                className="flex justify-center items-center h-24 border border-gray-300"
              >
                {filteredSchedule[day] && filteredSchedule[day][slot].length > 0 ? (
                  filteredSchedule[day][slot].map((cls, index) => (
                    <div
                      key={index}
                      className={`w-[80px] h-[60px] flex flex-col justify-center rounded-lg ${getClassStyle(
                        cls.subject
                      )} text-center`}
                    >
                      <span className="block font-bold text-xs">
                        {cls.className}
                      </span>
                      <span className="block text-xs">{cls.subject}</span>
                      <span className="block text-[10px]">
                        {formatTeacherName(cls.teacherName)}
                      </span>
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
