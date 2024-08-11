"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import PopupBox from "@/components/PopupBox";
import { useRouter } from "next/navigation";

type LoadedClassData = {
  _id: string;
  className: string;
  roomCapacity: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  teacherAvailability: string[];
};

const AdminDashboard = () => {
  const router = useRouter();
  const [classData, setClassData] = useState({
    className: "",
    roomCapacity: "",
    teacherId: "",
    teacherName: "",
    subject: "",
    teacherAvailability: "",
  });
  const [loadedClassData, setLoadedClassData] = useState<LoadedClassData[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedClassData, setSelectedClassData] =
    useState<LoadedClassData | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      console.log("Sending class data:", classData);
      const response = await axios.post("/api/add-data", classData);
      console.log("Class Data addedd successfully", response.data);
      // Update the table with newly added class
      setLoadedClassData((prevData) => [...prevData, response.data.savedClass]);
      // Reset the form
      setClassData({
        className: "",
        roomCapacity: "",
        teacherId: "",
        teacherName: "",
        subject: "",
        teacherAvailability: "",
      });
      toast("Class Added Successfully!", {
        icon: "🎓",
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

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

  const handleDeleteClass = async (classId: string) => {
    try {
      const res = await axios.delete(`/api/delete-class?id=${classId}`);
      console.log(res.data);
      toast.success("Class deleted successfully");

      setLoadedClassData((prevData) =>
        prevData.filter((classData) => classData._id !== classId)
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  const generateTimetable = async () => {
    try {
      const response = await axios.get("/api/get-data");
      console.log(response);

      router.push(
        `/timetable-data?timetableData=${encodeURIComponent(
          JSON.stringify(response.data.data)
        )}`
      );
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col sm:flex-row">
        <div className="w-1/4 flex-shrink-0 ">
          <div className="py-5">
            <h1 className="text-3xl text-purple font-bold text-center">
              Add Data
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start px-10 py-10"
            >
              <div className="mb-4">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-bold text-purple"
                >
                  Enter class name (Ex: 9B)
                </label>
                <input
                  type="text"
                  value={classData.className}
                  onChange={(e) =>
                    setClassData({ ...classData, className: e.target.value })
                  }
                  className="px-4 py-2 border-2 text-black border-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="room_capacity"
                  className="block mb-2 text-sm font-bold text-purple"
                >
                  Room Capacity
                </label>
                <select
                  id="room_capacity"
                  value={classData.roomCapacity}
                  onChange={(e) =>
                    setClassData({ ...classData, roomCapacity: e.target.value })
                  }
                  className="px-4 py-2 border-2 text-black border-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                >
                  <option value="" disabled hidden>
                    Choose
                  </option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="75">75</option>
                  <option value="100">100</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Add Data
              </button>
            </form>
          </div>
        </div>
        <div className="w-3/4 flex flex-col items-center gap-10 flex-shrink-0 py-5">
          <h1 className="text-3xl text-purple font-bold text-center">
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
                  <th>Delete</th>
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
                    <td>
                      {data.teacherAvailability
                        .filter((day) => day !== "")
                        .join(", ")}
                    </td>
                    <td>
                      <MdDelete
                        onClick={() => handleDeleteClass(data._id)}
                        className="w-6 h-6 cursor-pointer"
                        title="Delete Class"
                      />
                    </td>
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
            {isPopupOpen && selectedClassData && (
              <PopupBox
                data={selectedClassData}
                onClose={() => setIsPopupOpen(false)}
                onSave={handleSave}
              />
            )}
          </div>
          <button
            onClick={generateTimetable}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Generate Time tables
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
