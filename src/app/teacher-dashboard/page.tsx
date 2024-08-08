"use client";
import Navbar from "@/components/Navbar";
import PopupBox from "@/components/PopupBox";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";

type LoadedClassData = {
  _id: string;
  className: string;
  roomCapacity: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  teacherAvailability: string[];
};

const TeacherDashboard = () => {
  const [loadedClassData, setLoadedClassData] = useState<LoadedClassData[]>([]);
  const [selectedClassData, setSelectedClassData] =
    useState<LoadedClassData | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleEditClick = (data: LoadedClassData) => {
    setSelectedClassData(data);
    setIsPopupOpen(true);
  };

  const handleSave = (updatedClass: LoadedClassData) => {
    const updatedData = loadedClassData.map((classData) =>
      classData._id === updatedClass._id ? updatedClass : classData
    );

    setLoadedClassData(updatedData);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const getClassesData = async () => {
      try {
        const res = await axios.get("/api/get-data");
        console.log("API Response:", res.data);

        if (Array.isArray(res.data.data)) {
          setLoadedClassData(res.data.data);
        } else {
          console.error("Data is not an array", res.data);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    };
    getClassesData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center gap-10 flex-shrink-0 py-5">
        <h1 className="text-3xl text-dark-blue font-bold text-center">
          Classess
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-head bg-dark-blue text-white">
              <tr>
                <th>Class name</th>
                <th>Room capacity</th>
                <th>Teacher ID</th>
                <th>Teacher name</th>
                <th>Subject</th>
                <th>Teacher availability</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loadedClassData.map((data, index) => (
                <tr key={index}>
                  <td>{data.className}</td>
                  <td>{data.roomCapacity}</td>
                  <td>{data.teacherId}</td>
                  <td>{data.teacherName}</td>
                  <td>{data.subject}</td>
                  <td>{data.teacherAvailability.filter(day => day !== "").join(", ")}</td>
                  <td>
                    <MdModeEditOutline
                      onClick={() => handleEditClick(data)}
                      className="w-6 h-6 cursor-pointer"
                      title="Edit Class"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isPopupOpen && selectedClassData && (
        <PopupBox
          data={selectedClassData}
          onClose={() => setIsPopupOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
