// routes/enrollmentRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createEnrollment, 
  listEnrollments,
  updateEnrollmentStatus 
} = require('../controllers/enrollmentController');

router.post('/', createEnrollment);
router.get('/', listEnrollments);
router.put('/:id', updateEnrollmentStatus); // Add this route

module.exports = router;