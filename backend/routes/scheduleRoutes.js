// routes/scheduleRoutes.js
import express from 'express';
import Schedule from '../models/Schedule.js'; // your Mongoose model

const router = express.Router();

// GET all schedules for the logged-in student
router.get('/:studentId', async (req, res) => {
  try {
    const schedules = await Schedule.find({ studentId: req.params.studentId });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
