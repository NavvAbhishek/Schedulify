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
      {Object.keys(schedule).map((day) => (
        <div key={day}>
          <h2 className="mt-5">{day.toUpperCase()}</h2>
          {Object.keys(schedule[day]).map((slot) => (
            <div key={slot}>
              <strong>{slot}: </strong>
              {schedule[day][slot].length > 0 ? (
                schedule[day][slot].map((cls, index) => (
                  <span key={index}>
                    {cls.className} ({cls.subject}, {cls.teacherId})
                    {index < schedule[day][slot].length - 1 && " | "}
                  </span>
                ))
              ) : (
                <span>No Class</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TimetableDataPage;
