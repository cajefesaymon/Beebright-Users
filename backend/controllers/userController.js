// controllers/userController.js
// CRUD operations for users. Sensitive operations are protected.

const asyncHandler = require('express-async-handler');
const User = require('../models/user');

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private (admin or owner)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  // allow owner or admin
  if (req.user.role !== 'admin' && req.user._id.toString() !== user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  res.json(user);
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (admin or owner)
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (req.user.role !== 'admin' && req.user._id.toString() !== user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  const { name, email, role } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (role && req.user.role === 'admin') user.role = role; // only admin can change role

  const updated = await user.save();
  res.json({ _id: updated._id, name: updated.name, email: updated.email, role: updated.role });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  await user.remove();
  res.json({ message: 'User removed' });
});

module.exports = { getUsers, getUserById, updateUser, deleteUser };
