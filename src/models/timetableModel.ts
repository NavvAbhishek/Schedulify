import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema({
  schedule: {
    type: Map,
    of: Map,
    required: true,
  },
});

const Timetable = mongoose.models.Timetable || mongoose.model("Timetable", TimetableSchema);

export default Timetable;
