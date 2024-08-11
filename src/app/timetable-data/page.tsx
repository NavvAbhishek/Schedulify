"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatTimetable, createTimetable, timeSlots, days } from '@/helpers/algorithm.js';

const TimetableDataPage = () => {
  const searchParams = useSearchParams();
  const [formattedTimetable, setFormattedTimetable] = useState("");

  useEffect(() => {
    const timetableDataParam = searchParams.get("timetableData");
    const timetableData = timetableDataParam
      ? JSON.parse(timetableDataParam)
      : [];
      
    const schedule = createTimetable(timetableData, timeSlots, days);
    setFormattedTimetable(formatTimetable(schedule));
  }, [searchParams]);

  return (
    <div className="p-6">
      <pre className="bg-gray-100 p-4 rounded">{formattedTimetable}</pre>
    </div>
  );
};

export default TimetableDataPage;
