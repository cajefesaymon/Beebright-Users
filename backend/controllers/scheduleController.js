import Schedule from "../models/Schedule.js";
import moment from "moment";

// ✅ Get all classes scheduled for today for a specific student
export const getTodaysClasses = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Get current date (YYYY-MM-DD)
    const today = moment().startOf("day");
    const tomorrow = moment(today).add(1, "day");

    // Fetch all classes for this student that are scheduled today
    const classes = await Schedule.find({
      studentId,
      createdAt: { $gte: today.toDate(), $lt: tomorrow.toDate() },
    })
      .populate("tutorId", "firstName lastName")
      .populate("studentId", "firstName lastName");

    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching today's classes:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
