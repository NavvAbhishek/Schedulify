"use client";
import { useEffect, useState } from "react";
import {
  formatTimetable,
  createTimetable,
  timeSlots,
  days,
} from "@/helpers/algorithm.js";
import axios from "axios";

const TimetableDataPage = () => {
  const [formattedTimetable, setFormattedTimetable] = useState("");

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        const res = await axios.get("api/timetable-data");
        const timetableData = res.data;
        const schedule = createTimetable(timetableData, timeSlots, days);
        setFormattedTimetable(formatTimetable(schedule));
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    };

    fetchTimetableData();
  }, []);

  return (
    <div className="p-6">
      <pre className="bg-gray-100 p-4 rounded">{formattedTimetable}</pre>
    </div>
  );
};

export default TimetableDataPage;
