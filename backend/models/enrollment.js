const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true },
    school: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String },
    address: { type: String },
    schedule: { type: String },
    notes: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Enrollment || mongoose.model('Enrollment', enrollmentSchema);
