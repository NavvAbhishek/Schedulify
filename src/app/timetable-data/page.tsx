"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { days, timeSlots } from "@/helpers/algorithm";
import toast from "react-hot-toast";
import BackButton from "@/components/BackButton";
import PrintAsPdf from "@/components/PrintAsPdf";
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
  console.log(
    "$$$$$$$$$$$$$$$$$$-------------- schedule --------------$$$$$$$$$$$$$$$$$$",
    schedule
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        console.log("Fetching timetable data from API...");
        const res = await axios.get("/api/get-timetable"); // Fetch from MongoDB via the new API route
        const timetableData = res.data.data.schedule;
        console.log("Fetched Timetable Data:", timetableData);
        setSchedule(timetableData); // Set the fetched schedule to state
        console.log(
          "$$$$$$$$$$$$$$$$$$-------------- schedule --------------$$$$$$$$$$$$$$$$$$",
          schedule
        );
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    };

    fetchTimetableData();
  }, []);

  const deleteSheduleData = async () => {
    try {
      const res = await axios.delete("/api/delete-timetable");
      console.log("Delete Response", res.data);
      setSchedule({});
      toast("Timetable Shedules Deleted!", {
        icon: "🚮",
      });
    } catch (error) {
      console.error("Error deleting timetable data:", error);
    }
  };

  return (
    <div className="p-6">
      <Link href="/admin-dashboard">
        <BackButton
          title="Back to Dashboard"
          className="top-[20px] cursor-pointer text-sm"
        />
      </Link>
      <div className="printableArea" ref={contentRef}>
        <div className="capitalize text-dark-blue text-center mb-8 text-3xl font-bold">
          Full Overview of Timetable Data 📋
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
                  {schedule[day] &&
                  schedule[day][slot] &&
                  schedule[day][slot].length > 0 ? (
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
      <div className="flex items-center justify-end gap-6">
        <PrintAsPdf text="Print Timetable Data" contentRef={contentRef} />
        <Link href="/timetable">
          <button className="pink-button p-2 font-bold">View Timetable</button>
        </Link>
        <button
          onClick={deleteSheduleData}
          className="pink-button p-2 font-bold"
        >
          Delete Shedule Data
        </button>
      </div>
    </div>
  );
};

export default TimetableDataPage;
