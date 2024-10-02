"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import PopupBox from "@/components/PopupBox";
import { useRouter } from "next/navigation";
import { createTimetable, timeSlots, days } from "@/helpers/algorithm";
import { ThreeDot } from "react-loading-indicators";

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
  console.log(
    "$$$$$$$$$$$$$$$$$$-------------- loadedClassData --------------$$$$$$$$$$$$$$$$$$",
    loadedClassData
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedClassData, setSelectedClassData] =
    useState<LoadedClassData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timetableExists, setTimetableExists] = useState(false);
  console.log("----------loadedClassData------------", loadedClassData);
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
      const newClassData: LoadedClassData[] = [
        {
          className: "7A",
          roomCapacity: "45",
          subject: "Math",
          teacherAvailability: ["monday", "wednesday"],
          teacherId: "a123",
          teacherName: "Amila Perera",
          _id: "66b6dabe79106b28447741",
        },
        {
          className: "8B",
          roomCapacity: "55",
          subject: "English",
          teacherAvailability: ["tuesday", "friday"],
          teacherId: "b234",
          teacherName: "Shani Perera",
          _id: "66b6dabe79106b28447742",
        },
        {
          className: "9E",
          roomCapacity: "60",
          subject: "Geography",
          teacherAvailability: ["wednesday", "friday"],
          teacherId: "c345",
          teacherName: "Nalaka Wijesinghe",
          _id: "66b6dabe79106b28447743",
        },
        {
          className: "10B",
          roomCapacity: "50",
          subject: "Chemistry",
          teacherAvailability: ["monday", "thursday"],
          teacherId: "d456",
          teacherName: "Suranga Silva",
          _id: "66b6dabe79106b28447744",
        },
        {
          className: "11C",
          roomCapacity: "65",
          subject: "Physics",
          teacherAvailability: ["monday", "wednesday", "friday"],
          teacherId: "e567",
          teacherName: "Malith Fernando",
          _id: "66b6dabe79106b28447745",
        },
        {
          className: "7B",
          roomCapacity: "40",
          subject: "History",
          teacherAvailability: ["tuesday", "thursday"],
          teacherId: "f678",
          teacherName: "Sasini Perera",
          _id: "66b6dabe79106b28447746",
        },
        {
          className: "8C",
          roomCapacity: "50",
          subject: "Science",
          teacherAvailability: ["wednesday", "thursday"],
          teacherId: "g789",
          teacherName: "Nuwan Perera",
          _id: "66b6dabe79106b28447747",
        },
        {
          className: "9A",
          roomCapacity: "45",
          subject: "Health",
          teacherAvailability: ["monday", "wednesday"],
          teacherId: "h890",
          teacherName: "Harsha Bandara",
          _id: "66b6dabe79106b28447748",
        },
        {
          className: "10D",
          roomCapacity: "70",
          subject: "Biology",
          teacherAvailability: ["tuesday", "friday"],
          teacherId: "i901",
          teacherName: "Ravindra Samaranayake",
          _id: "66b6dabe79106b28447749",
        },
        {
          className: "11B",
          roomCapacity: "75",
          subject: "Math",
          teacherAvailability: ["monday", "tuesday"],
          teacherId: "j012",
          teacherName: "Jayanthi Kumari",
          _id: "66b6dabe79106b28447750",
        },
        {
          className: "7C",
          roomCapacity: "50",
          subject: "Art",
          teacherAvailability: ["wednesday", "thursday"],
          teacherId: "k123",
          teacherName: "Nirosha Rathnayake",
          _id: "66b6dabe79106b28447751",
        },
        {
          className: "8D",
          roomCapacity: "65",
          subject: "Economics",
          teacherAvailability: ["monday", "wednesday"],
          teacherId: "l234",
          teacherName: "Upul Jayasena",
          _id: "66b6dabe79106b28447752",
        },
        {
          className: "9C",
          roomCapacity: "55",
          subject: "History",
          teacherAvailability: ["tuesday", "friday"],
          teacherId: "m345",
          teacherName: "Dinesh Weerakoon",
          _id: "66b6dabe79106b28447753",
        },
        {
          className: "10C",
          roomCapacity: "80",
          subject: "Science",
          teacherAvailability: ["monday", "thursday"],
          teacherId: "n456",
          teacherName: "Suranjith Liyanage",
          _id: "66b6dabe79106b28447754",
        },
        {
          className: "11D",
          roomCapacity: "85",
          subject: "ICT",
          teacherAvailability: ["tuesday", "wednesday"],
          teacherId: "o567",
          teacherName: "Jaliya Hettiarachchi",
          _id: "66b6dabe79106b28447755",
        },
        {
          className: "7D",
          roomCapacity: "45",
          subject: "Math",
          teacherAvailability: ["monday", "friday"],
          teacherId: "p678",
          teacherName: "Kavinda Alwis",
          _id: "66b6dabe79106b28447756",
        },
        {
          className: "8E",
          roomCapacity: "60",
          subject: "Geography",
          teacherAvailability: ["wednesday", "thursday"],
          teacherId: "q789",
          teacherName: "Thushara Perera",
          _id: "66b6dabe79106b28447757",
        },
        {
          className: "9F",
          roomCapacity: "65",
          subject: "Music",
          teacherAvailability: ["monday", "wednesday"],
          teacherId: "r890",
          teacherName: "Dilshan Karunaratne",
          _id: "66b6dabe79106b28447758",
        },
        {
          className: "10E",
          roomCapacity: "90",
          subject: "Commerce",
          teacherAvailability: ["tuesday", "friday"],
          teacherId: "s901",
          teacherName: "Ruwantha Jayasinghe",
          _id: "66b6dabe79106b28447759",
        },
        {
          className: "11E",
          roomCapacity: "95",
          subject: "Sports",
          teacherAvailability: ["monday", "wednesday", "friday"],
          teacherId: "t012",
          teacherName: "Tharindu Prasad",
          _id: "66b6dabe79106b28447760",
        },

        {
          _id: "66b6dabe79106b28447761",
          className: "7E",
          roomCapacity: "50",
          teacherId: "a123",
          teacherName: "Amila Perera",
          subject: "Math",
          teacherAvailability: ["monday", "tuesday"],
        },
        {
          _id: "66b6dabe79106b28447762",
          className: "8A",
          roomCapacity: "55",
          teacherId: "b234",
          teacherName: "Shani Perera",
          subject: "English",
          teacherAvailability: ["tuesday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447763",
          className: "9D",
          roomCapacity: "60",
          teacherId: "d456",
          teacherName: "Suranga Silva",
          subject: "Chemistry",
          teacherAvailability: ["monday", "thursday"],
        },
        {
          _id: "66b6dabe79106b28447764",
          className: "10A",
          roomCapacity: "80",
          teacherId: "e567",
          teacherName: "Malith Fernando",
          subject: "Physics",
          teacherAvailability: ["monday", "wednesday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447765",
          className: "11F",
          roomCapacity: "75",
          teacherId: "f678",
          teacherName: "Sasini Perera",
          subject: "History",
          teacherAvailability: ["tuesday", "thursday"],
        },
        {
          _id: "66b6dabe79106b28447766",
          className: "7C",
          roomCapacity: "50",
          teacherId: "g789",
          teacherName: "Nuwan Perera",
          subject: "Science",
          teacherAvailability: ["wednesday", "thursday"],
        },
        {
          _id: "66b6dabe79106b28447767",
          className: "8F",
          roomCapacity: "65",
          teacherId: "h890",
          teacherName: "Harsha Bandara",
          subject: "Health",
          teacherAvailability: ["monday", "wednesday"],
        },
        {
          _id: "66b6dabe79106b28447768",
          className: "9B",
          roomCapacity: "45",
          teacherId: "i901",
          teacherName: "Ravindra Samaranayake",
          subject: "Biology",
          teacherAvailability: ["tuesday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447769",
          className: "10E",
          roomCapacity: "90",
          teacherId: "j012",
          teacherName: "Jayanthi Kumari",
          subject: "Math",
          teacherAvailability: ["monday", "tuesday"],
        },
        {
          _id: "66b6dabe79106b28447770",
          className: "11A",
          roomCapacity: "100",
          teacherId: "k123",
          teacherName: "Nirosha Rathnayake",
          subject: "Art",
          teacherAvailability: ["wednesday", "thursday"],
        },
        {
          _id: "66b6dabe79106b28447771",
          className: "7B",
          roomCapacity: "60",
          teacherId: "l234",
          teacherName: "Upul Jayasena",
          subject: "Economics",
          teacherAvailability: ["monday", "wednesday"],
        },
        {
          _id: "66b6dabe79106b28447772",
          className: "8E",
          roomCapacity: "65",
          teacherId: "m345",
          teacherName: "Dinesh Weerakoon",
          subject: "History",
          teacherAvailability: ["tuesday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447773",
          className: "9G",
          roomCapacity: "80",
          teacherId: "n456",
          teacherName: "Suranjith Liyanage",
          subject: "Science",
          teacherAvailability: ["monday", "thursday"],
        },
        {
          _id: "66b6dabe79106b28447774",
          className: "10F",
          roomCapacity: "95",
          teacherId: "o567",
          teacherName: "Jaliya Hettiarachchi",
          subject: "ICT",
          teacherAvailability: ["tuesday", "wednesday"],
        },
        {
          _id: "66b6dabe79106b28447775",
          className: "11B",
          roomCapacity: "75",
          teacherId: "p678",
          teacherName: "Kavinda Alwis",
          subject: "Math",
          teacherAvailability: ["monday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447776",
          className: "7D",
          roomCapacity: "40",
          teacherId: "q789",
          teacherName: "Thushara Perera",
          subject: "Geography",
          teacherAvailability: ["wednesday", "thursday"],
        },
        {
          _id: "66b6dabe79106b28447777",
          className: "8C",
          roomCapacity: "60",
          teacherId: "r890",
          teacherName: "Dilshan Karunaratne",
          subject: "Music",
          teacherAvailability: ["monday", "wednesday"],
        },
        {
          _id: "66b6dabe79106b28447778",
          className: "9F",
          roomCapacity: "65",
          teacherId: "s901",
          teacherName: "Ruwantha Jayasinghe",
          subject: "Commerce",
          teacherAvailability: ["tuesday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447779",
          className: "10D",
          roomCapacity: "85",
          teacherId: "t012",
          teacherName: "Tharindu Prasad",
          subject: "Sports",
          teacherAvailability: ["monday", "wednesday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447780",
          className: "11C",
          roomCapacity: "70",
          teacherId: "u123",
          teacherName: "Ajith Karunaratne",
          subject: "Drama",
          teacherAvailability: ["wednesday", "thursday"],
        },

        {
          _id: "66b6dabe79106b28447781",
          className: "7F",
          roomCapacity: "60",
          teacherId: "a123",
          teacherName: "Amila Perera",
          subject: "History",
          teacherAvailability: ["monday", "wednesday"],
        },
        {
          _id: "66b6dabe79106b28447782",
          className: "8A",
          roomCapacity: "55",
          teacherId: "b234",
          teacherName: "Shani Perera",
          subject: "English Literature",
          teacherAvailability: ["tuesday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447783",
          className: "9D",
          roomCapacity: "65",
          teacherId: "c345",
          teacherName: "Nalaka Wijesinghe",
          subject: "Geography",
          teacherAvailability: ["tuesday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447784",
          className: "10A",
          roomCapacity: "75",
          teacherId: "d456",
          teacherName: "Suranga Silva",
          subject: "Physics",
          teacherAvailability: ["monday", "thursday"],
        },
        {
          _id: "66b6dabe79106b28447785",
          className: "11D",
          roomCapacity: "80",
          teacherId: "e567",
          teacherName: "Malith Fernando",
          subject: "Mathematics",
          teacherAvailability: ["monday", "wednesday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447786",
          className: "7B",
          roomCapacity: "55",
          teacherId: "f678",
          teacherName: "Sasini Perera",
          subject: "History",
          teacherAvailability: ["tuesday", "thursday"],
        },
        {
          _id: "66b6dabe79106b28447787",
          className: "8C",
          roomCapacity: "60",
          teacherId: "g789",
          teacherName: "Nuwan Perera",
          subject: "Biology",
          teacherAvailability: ["wednesday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447788",
          className: "9B",
          roomCapacity: "50",
          teacherId: "h890",
          teacherName: "Harsha Bandara",
          subject: "Health Science",
          teacherAvailability: ["monday", "wednesday"],
        },
        {
          _id: "66b6dabe79106b28447789",
          className: "10F",
          roomCapacity: "70",
          teacherId: "i901",
          teacherName: "Ravindra Samaranayake",
          subject: "Biology",
          teacherAvailability: ["tuesday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447790",
          className: "11B",
          roomCapacity: "65",
          teacherId: "j012",
          teacherName: "Jayanthi Kumari",
          subject: "Physics",
          teacherAvailability: ["monday", "tuesday"],
        },
        {
          _id: "66b6dabe79106b28447791",
          className: "7C",
          roomCapacity: "45",
          teacherId: "k123",
          teacherName: "Nirosha Rathnayake",
          subject: "Art",
          teacherAvailability: ["wednesday", "thursday"],
        },
        {
          _id: "66b6dabe79106b28447792",
          className: "8D",
          roomCapacity: "65",
          teacherId: "l234",
          teacherName: "Upul Jayasena",
          subject: "Economics",
          teacherAvailability: ["monday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447793",
          className: "9E",
          roomCapacity: "70",
          teacherId: "m345",
          teacherName: "Dinesh Weerakoon",
          subject: "History",
          teacherAvailability: ["thursday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447794",
          className: "10D",
          roomCapacity: "80",
          teacherId: "n456",
          teacherName: "Suranjith Liyanage",
          subject: "Chemistry",
          teacherAvailability: ["monday", "thursday"],
        },
        {
          _id: "66b6dabe79106b28447795",
          className: "11F",
          roomCapacity: "85",
          teacherId: "o567",
          teacherName: "Jaliya Hettiarachchi",
          subject: "ICT",
          teacherAvailability: ["tuesday", "wednesday"],
        },
        {
          _id: "66b6dabe79106b28447796",
          className: "7A",
          roomCapacity: "50",
          teacherId: "p678",
          teacherName: "Kavinda Alwis",
          subject: "Geography",
          teacherAvailability: ["monday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447797",
          className: "8E",
          roomCapacity: "60",
          teacherId: "q789",
          teacherName: "Thushara Perera",
          subject: "Music",
          teacherAvailability: ["wednesday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447798",
          className: "9F",
          roomCapacity: "75",
          teacherId: "r890",
          teacherName: "Dilshan Karunaratne",
          subject: "Music",
          teacherAvailability: ["monday", "wednesday"],
        },
        {
          _id: "66b6dabe79106b28447799",
          className: "10E",
          roomCapacity: "90",
          teacherId: "s901",
          teacherName: "Ruwantha Jayasinghe",
          subject: "Commerce",
          teacherAvailability: ["tuesday", "friday"],
        },
        {
          _id: "66b6dabe79106b28447800",
          className: "11A",
          roomCapacity: "100",
          teacherId: "t012",
          teacherName: "Tharindu Prasad",
          subject: "Physical Education",
          teacherAvailability: ["monday", "wednesday", "friday"],
        },
      ];
      try {
        const res = await axios.get("/api/get-data");
        console.log("API Response:", res.data);
        setLoadedClassData(newClassData);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    const checkTimetableExists = async () => {
      try {
        const res = await axios.get("/api/check-timetable");
        if (res.data.exists) {
          setTimetableExists(true);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    };
    getClassesData();
    checkTimetableExists();
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
      const generatedSchedule = createTimetable(
        loadedClassData,
        timeSlots,
        days
      );
      const response = await axios.post(
        "/api/save-timetable",
        generatedSchedule
      );
      console.log("Timetable saved:", response.data);
      toast("Timetable Data Generated!", {
        icon: "🚀",
      });
      router.push(`/timetable-data`);
    } catch (error) {
      console.error("Error generating timetable:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/4 flex-shrink-0 ">
          <div className="py-5">
            <h1 className="text-3xl text-purple font-bold px-16">Add Data</h1>
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
                onClick={handleSubmit}
                className="pink-button p-2 font-bold"
              >
                Add Data
              </button>
            </form>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center w-[70%] h-[42rem]">
            <ThreeDot
              variant="bounce"
              color="#3A0CA3"
              style={{ fontSize: "50px" }}
            />
          </div>
        ) : (
          <div className="w-3/4 flex flex-col items-center gap-10 flex-shrink-0 py-5">
            <h1 className="text-3xl text-purple font-bold text-center">
              Classess 🧑‍🏫
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
            {!timetableExists && (
              <button
                onClick={generateTimetable}
                className="pink-button p-2 font-bold"
              >
                Generate Time tables 🚀
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
