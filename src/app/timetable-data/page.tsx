"use client";
import { useEffect, useState } from "react";
import {
  createTimetable,
  timeSlots,
  days,
} from "@/helpers/algorithm";
import axios from "axios";

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

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        const res = await axios.get("api/timetable-data");
        const timetableData = res.data;
        console.log("-----------timetableData---------",timetableData)
        const generatedSchedule = createTimetable(timetableData, timeSlots, days);
        console.log("-----------schedule---------",generatedSchedule)
        setSchedule(generatedSchedule);
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    };

    fetchTimetableData();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4">
        {days.map((day) => (
          <div key={day} className="flex flex-col">
            <h2 className="text-lg font-bold mb-2">{day.toUpperCase()}</h2>
            {timeSlots.map((slot) => (
              <div key={slot} className="mb-2 flex gap-3">
                <strong className="block">{slot}: </strong>
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

export default TimetableDataPage;
