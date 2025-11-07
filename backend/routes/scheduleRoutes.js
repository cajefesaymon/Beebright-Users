// routes/scheduleRoutes.js
import express from 'express';
import mongoose from 'mongoose';
import Schedule from '../models/Schedule.js';

const router = express.Router();

// GET all schedules for the logged-in student
router.get('/:studentId', async (req, res) => {
  try {
    const studentObjectId = new mongoose.Types.ObjectId(req.params.studentId);
    
    // Populate tutorId to get tutor details
    const schedules = await Schedule.find({ studentId: studentObjectId })
      .populate('tutorId', 'name email') // Get tutor's name and email
      .sort({ date: 1, time: 1 }); // Sort by date and time
    
    console.log('Looking for studentId:', studentObjectId);
    console.log('Found schedules:', schedules.length);
    
    res.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;