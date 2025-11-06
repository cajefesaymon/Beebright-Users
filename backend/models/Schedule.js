import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  time: { type: String, required: true },
  room: { type: String, required: true },
  date: { type: Date, required: true }, // ✅ New field
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Schedule", scheduleSchema);
