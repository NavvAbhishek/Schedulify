import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
    className: {
        type: String,
        required: [true, "Please provide the class name"]
    },
    roomCapacity: {
        type: String,
        required: [true, "Please provide room capacity"]
    },
    teacherId: {
        type: String,
    },
    teacherName: {
        type: String,

    },
    subject: {
        type: String,

    },
    teacherAvailability: {
        type: [String],
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        default: []
    },
})

const Class = mongoose.models.classes || mongoose.model("classes", ClassSchema)

export default Class








