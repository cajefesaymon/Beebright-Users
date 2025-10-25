// routes/users.js
// User management routes (protected)

const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');

// Get all users (admin)
router.get('/', protect, adminOnly, getUsers);

// Get, update, delete by id
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;
