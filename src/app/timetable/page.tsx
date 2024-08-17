"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { days, timeSlots } from "@/helpers/algorithm";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { ThreeDot } from "react-loading-indicators";

interface ClassDetails {
  className: string;
  roomCapacity: string;
  subject: string;
  teacherAvailability: string[];
  teacherId: string;
  teacherName: string;
}

type UserData = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  className?: string;
};

type Schedule = {
  [day: string]: {
    [timeSlot: string]: ClassDetails[];
  };
};

const Timetable = () => {
  const [schedule, setSchedule] = useState<Schedule>({});
  const [filterClassName, setFilterClassName] = useState<string>("");
  const [filterTeacherId, setFilterTeacherId] = useState<string>("");
  const [filteredSchedule, setFilteredSchedule] = useState<Schedule>({});
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true); // Start loading as true

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        const res = await axios.get("/api/get-timetable");
        const timetableData = res.data.data.schedule;
        setSchedule(timetableData);

        if (userData?.role === "student") {
          setFilteredSchedule(
            filterByClassName(timetableData, userData.className!)
          );
        } else if (userData?.role === "teacher") {
          const teacherIdSnippet = userData._id.slice(6, 10);
          setFilteredSchedule(
            filterByTeacherId(timetableData, teacherIdSnippet)
          );
        } else {
          setFilteredSchedule(timetableData);
        }
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchTimetableData();
  }, [userData]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUserData(res.data.data);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    getUserDetails();
  }, []);

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

  const filterByClassName = (
    schedule: Schedule,
    className: string
  ): Schedule => {
    const newSchedule: Schedule = {};
    days.forEach((day) => {
      newSchedule[day] = {};
      timeSlots.forEach((slot) => {
        newSchedule[day][slot] = schedule[day][slot].filter((cls) => {
          return cls.className.toLowerCase() === className.toLowerCase();
        });
      });
    });

    return newSchedule;
  };

  const filterByTeacherId = (
    schedule: Schedule,
    teacherIdSnippet: string
  ): Schedule => {
    const newSchedule: Schedule = {};
    days.forEach((day) => {
      newSchedule[day] = {};
      timeSlots.forEach((slot) => {
        newSchedule[day][slot] = schedule[day][slot].filter((cls) => {
          return cls.teacherId === teacherIdSnippet;
        });
      });
    });

    return newSchedule;
  };

  const handleSearch = () => {
    if (!filterClassName && !filterTeacherId) {
      setFilteredSchedule(schedule);
      return;
    }

    const newSchedule: Schedule = {};

    days.forEach((day) => {
      newSchedule[day] = {};
      timeSlots.forEach((slot) => {
        newSchedule[day][slot] = schedule[day][slot].filter((cls) => {
          return (
            (!filterClassName ||
              cls.className
                .toLowerCase()
                .includes(filterClassName.toLowerCase())) &&
            (!filterTeacherId ||
              cls.teacherId
                .toLowerCase()
                .includes(filterTeacherId.toLowerCase()))
          );
        });
      });
    });

    setFilteredSchedule(newSchedule);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <Link href="/timetable-data">
        <BackButton
          title="Back"
          className="top-[20px] cursor-pointer text-sm"
        />
      </Link>
      <div>
        <div className="capitalize text-dark-blue text-center mt-4 text-3xl font-bold">
          Timetable 📅
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[41.4rem]">
          <ThreeDot
            variant="bounce"
            color="#3A0CA3"
            style={{ fontSize: "50px" }}
          />
        </div>
      ) : (
        <div>
          {" "}
          {userData?.role === "admin" ? (
            <div>
              <input
                className="p-2 mr-3 border border-purple rounded-lg text-purple focus:border-purple focus:ring focus:ring-purple transition duration-200"
                type="text"
                id="className"
                value={filterClassName}
                onChange={(e) => setFilterClassName(e.target.value)}
                placeholder="Enter class name"
              />
              <input
                className="p-2 mr-3 border border-purple rounded-lg text-purple focus:border-purple focus:ring focus:ring-purple transition duration-200"
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
              <div className="mb-5 text-xs">
                (you can input class name or id to search)
              </div>
            </div>
          ) : null}
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
                    {filteredSchedule[day] &&
                    filteredSchedule[day][slot].length > 0 ? (
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
      )}
    </div>
  );
};

export default Timetable;
