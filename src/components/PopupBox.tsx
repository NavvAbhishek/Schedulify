import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";

type PopupBoxProps = {
  data: {
    _id: string;
    className: string;
    roomCapacity: string;
    teacherId: string;
    teacherName: string;
    subject: string;
    teacherAvailability: string[];
  };
  onClose: () => void;
  onSave: (updatedClass: any) => void;
};

type UserData = {
  _id: string;
  role: string;
};

const PopupBox: React.FC<PopupBoxProps> = ({ data, onClose, onSave }) => {
  const [formData, setFormData] = React.useState({
    ...data,
    teacherAvailability: data.teacherAvailability || [],
  });
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setUserData(res.data.data);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    getUserDetails();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prevState) => {
        const updatedAvailability = checked
          ? [...prevState.teacherAvailability, value]
          : prevState.teacherAvailability.filter((day) => day !== value);
        return { ...prevState, teacherAvailability: updatedAvailability };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdateClass = async () => {
    try {
      const res = await axios.put("/api/update-data", formData);
      console.log("Updated data:", res.data);
      onSave(formData); // Use formData to ensure the updated class data is passed to the onSave function
    } catch (error) {
      console.error("Failed to update class", error);
    }
    onClose();
  };

  const days = [
    { name: "monday", checkboxName: "monday" },
    { name: "tuesday", checkboxName: "tuesday" },
    { name: "wednesday", checkboxName: "wednesday" },
    { name: "thursday", checkboxName: "thursday" },
    { name: "friday", checkboxName: "friday" },
  ];

  return (
    <Popup open={true} closeOnDocumentClick onClose={onClose}>
      <div className="modal custom-popup">
        <div className="header">Edit Class Data</div>
        <div className="content">
          <div className="flex gap-10">
            <div>
              <label
                htmlFor="className"
                className="block mb-2 text-md font-bold"
              >
                Class Name
              </label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleInputChange}
                className="px-4 py-2 border-2 text-black border-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                disabled={userData?.role === "teacher"}
              />
            </div>
            <div>
              <label
                htmlFor="roomCapacity"
                className="block mb-2 text-md font-bold"
              >
                Room Capacity
              </label>
              <input
                type="text"
                name="roomCapacity"
                value={formData.roomCapacity}
                onChange={handleInputChange}
                className="px-4 py-2 border-2 text-black border-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                disabled={userData?.role === "teacher"}
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div>
              <label
                htmlFor="teacherId"
                className="block mb-2 text-md font-bold"
              >
                Teacher ID
              </label>
              <input
                type="text"
                name="teacherId"
                value={formData.teacherId}
                onChange={handleInputChange}
                className="px-4 py-2 border-2 text-black border-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>
            <div>
              <label
                htmlFor="teacherName"
                className="block mb-2 text-md font-bold"
              >
                Teacher Name
              </label>
              <input
                type="text"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleInputChange}
                className="px-4 py-2 border-2 text-black border-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div>
              <label htmlFor="subject" className="block mb-2 text-md font-bold">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="px-4 py-2 border-2 text-black border-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>
          </div>
        </div>
        {/* --------------------------- Teacher Availability ------------------- */}
        <div>
          <p className="block mb-2 text-md font-bold">Teacher Availability</p>
          <div className="flex flex-row flex-wrap gap-5">
            {days.map((day, index) => (
              <div key={index} className="flex gap-5">
                <div className="flex items-center gap-4 mb-4 justify-center">
                  <label htmlFor={day.checkboxName} className="block text-sm">
                    {day.name}
                  </label>
                  <input
                    type="checkbox"
                    name={day.checkboxName}
                    value={day.name}
                    checked={formData.teacherAvailability.includes(day.name)}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                  ></input>
                </div>
              </div>
            ))}
          </div>
          <br />
        </div>
        <div className="actions">
          <button onClick={handleUpdateClass} className="">
            Save
          </button>
          <button onClick={onClose} className="">
            Close
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default PopupBox;
