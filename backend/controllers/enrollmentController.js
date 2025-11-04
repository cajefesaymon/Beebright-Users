const Enrollment = require('../models/enrollment');

// Create a new enrollment
const createEnrollment = async (req, res) => {
  const {
    studentName,
    age,
    grade,
    school,
    contactEmail,
    contactPhone,
    address,
    schedule,
    notes
  } = req.body;

  if (!studentName || !age || !grade || !school || !contactEmail) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const enrollment = new Enrollment({
    studentName,
    age,
    grade,
    school,
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
