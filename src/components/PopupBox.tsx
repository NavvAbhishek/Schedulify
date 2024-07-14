import React from "react";
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
    teacherAvailability: string;
  };
  onClose: () => void;
  onSave: (updatedClass: any) => void;
};

const PopupBox: React.FC<PopupBoxProps> = ({ data, onClose, onSave }) => {
  const [formData, setFormData] = React.useState({
    ...data,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  return (
    <Popup open={true} closeOnDocumentClick onClose={onClose}>
      <div className="modal custom-popup">
        <div className="header">Edit Class Data</div>
        <div className="content">
          <div className="mb-4 flex gap-10">
            <div>
              <label
                htmlFor="className"
                className="block mb-2 text-sm"
              >
                Class Name
              </label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleInputChange}
                className="px-4 py-2 border-2 text-black border-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="roomCapacity"
                className="block mb-2 text-sm"
              >
                Room Capacity
              </label>
              <input
                type="text"
                name="roomCapacity"
                value={formData.roomCapacity}
                onChange={handleInputChange}
                className="px-4 py-2 border-2 text-black border-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                disabled
              />
            </div>
          </div>
          <div className="mb-4 flex gap-10">
            <div>
              <label
                htmlFor="teacherId"
                className="block mb-2 text-sm"
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
                className="block mb-2 text-sm"
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
          <div className="mb-4 flex gap-10">
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm"
              >
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
            <div>
              <label
                htmlFor="teacherAvailability"
                className="block mb-2 text-sm"
              >
                Teacher Availability
              </label>
              <input
                type="text"
                name="teacherAvailability"
                value={formData.teacherAvailability}
                onChange={handleInputChange}
                className="px-4 py-2 border-2 text-black border-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>
          </div>
        </div>
        <div className="actions">
          <button
            onClick={handleUpdateClass}
            className=""
          >
            Save
          </button>
          <button
            onClick={onClose}
            className=""
          >
            Close
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default PopupBox;
