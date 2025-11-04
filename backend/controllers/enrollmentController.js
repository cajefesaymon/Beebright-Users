const Enrollment = require('../models/enrollment');

// Create a new enrollment
const createEnrollment = async (req, res) => {
  const {
    studentName,
    age,
    grade,
    school,
    password,  // <-- ADD THIS: Extract password from req.body
    contactEmail,
    contactPhone,
    address,
    schedule,
    notes
  } = req.body;

  // ADD THIS: Validate that password is provided and meets basic criteria (e.g., length)
  // This is optional but recommended to fail early before hitting Mongoose validation
  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password is required and must be at least 8 characters long' });
  }

  // Update the required fields check to include password
  if (!studentName || !age || !grade || !school || !password || !contactEmail) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const enrollment = new Enrollment({
    studentName,
    age,
    grade,
    school,
    password,  // <-- ADD THIS: Include password in the Enrollment constructor
    contactEmail,
    contactPhone,
    address,
    schedule,
    notes
  });

  await enrollment.save();

  res.status(201).json({ message: 'Enrollment submitted', enrollment });
};

// Simple GET to list enrollments (for admin/debug - could be protected later)
const listEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find().sort('-createdAt');
  res.json(enrollments);
};

module.exports = {
  createEnrollment,
  listEnrollments
};