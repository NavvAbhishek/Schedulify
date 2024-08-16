"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { days, timeSlots } from "@/helpers/algorithm";
interface ClassDetails {
  className: string;
  roomCapacity: string;
  subject: string;
  teacherAvailability: string[];
  teacherId: string;
  teacherName: string;
}

type Schedule = {
  [day: string]: {
    [timeSlot: string]: ClassDetails[];
  };
};

const TimetableDataPage = () => {
  const [schedule, setSchedule] = useState<Schedule>({});
  console.log("----------------schedule data------------------",schedule)
  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        console.log("Fetching timetable data from API...");
        const res = await axios.get("/api/get-timetable"); // Fetch from MongoDB via the new API route
        const timetableData = res.data.data.schedule;
        console.log("Fetched Timetable Data:", timetableData);
        setSchedule(timetableData); // Set the fetched schedule to state
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    };

    fetchTimetableData();
  }, []);

  return (
    <div className="p-6">
      <div>
        <div className="capitalize text-dark-blue text-center mb-8 text-3xl font-bold">
          Full Overview of Timetable Data
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
                  {schedule[day] && schedule[day][slot] && schedule[day][slot].length > 0 ? (
                    schedule[day][slot].map((cls, index) => (
                      <span key={index} className="block">
                        {cls.className} ({cls.subject}, {cls.teacherName})
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
