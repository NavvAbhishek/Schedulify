"use client";
import { useEffect, useState } from "react";
import { createTimetable, timeSlots, days } from "@/helpers/algorithm";
import axios from "axios";
import Link from "next/link";
import { useSchedule } from "@/context/ScheduleContext";

const TimetableDataPage = () => {
  const { schedule, setSchedule } = useSchedule();

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        const res = await axios.get("api/timetable-data");
        const timetableData = res.data;
        console.log("-----------timetableData---------", timetableData);
        const generatedSchedule = createTimetable(
          timetableData,
          timeSlots,
          days
        );
        console.log("-----------schedule---------", generatedSchedule);
        setSchedule(generatedSchedule);
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    };

    fetchTimetableData();
  }, [setSchedule]);

  return (
    <div className="p-6">
      <div>
        <div className="capitalize text-dark-blue text-center mb-8 text-3xl font-bold">
          Full overview of time table Data
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
      <div className="text-right sm:mr-16">
        <Link href="/timetable">
          <button className="pink-button p-2 font-bold">View Timetable</button>
        </Link>
      </div>
    </div>
  );
};

export default TimetableDataPage;
