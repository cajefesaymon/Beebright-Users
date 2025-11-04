const express = require('express');
const router = express.Router();
const { createEnrollment, listEnrollments } = require('../controllers/enrollmentController');

// Public: submit enrollment
router.post('/', createEnrollment);

// Admin / debug: list enrollments (consider protecting this route later)
router.get('/', listEnrollments);

module.exports = router;
