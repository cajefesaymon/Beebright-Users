// controllers/authController.js
// Handles registration, login and logout. Uses JWT for authentication.

const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Enrollment = require('../models/enrollment');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email and password' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    const token = generateToken(user._id);
    // set httpOnly cookie for convenience
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  }

  res.status(400).json({ message: 'Invalid user data' });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(`🔐 Login attempt for: ${email}`);

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const user = await User.findOne({ email });
  console.log(`👤 User found: ${!!user}`);

  // If a user exists, only allow login via that user's credentials
  if (user) {
    if (await user.matchPassword(password)) {
      const token = generateToken(user._id);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      // Safely handle name splitting with fallback
      let firstName = user.name;
      let lastName = '';
      
      if (user.name && user.name.includes(' ')) {
        const nameParts = user.name.split(' ');
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(' ');
      }
      
      return res.json({
        _id: user._id,
        firstName,
        lastName,
        email: user.email,
        role: user.role,
        token,
      });
    }

    // If email found but password incorrect, reject immediately
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // No user exists with this email
  // Check if there's a pending enrollment
  const enrollment = await Enrollment.findOne({ contactEmail: email });
  
  if (enrollment) {
    // Check enrollment password
    const isValidPassword = await bcrypt.compare(password, enrollment.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (enrollment.status !== 'approved') {
      return res.status(403).json({ 
        message: 'Your enrollment is pending approval. Please wait for admin confirmation.' 
      });
    }

    // Safely handle name splitting with fallback
    let firstName = enrollment.studentName;
    let lastName = '';
    
    if (enrollment.studentName && enrollment.studentName.includes(' ')) {
      const nameParts = enrollment.studentName.split(' ');
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(' ');
    }

    // For approved enrollments, return enrollment info
    return res.json({
      _id: enrollment._id,
      firstName,
      lastName,
      email: enrollment.contactEmail,
      role: 'student',
      status: enrollment.status
    });
  }

  // If no user found and no enrollment exists, credentials are invalid
  return res.status(401).json({ message: 'Invalid email or password' });
});

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Public
const logout = asyncHandler(async (req, res) => {
  // Clear cookie
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
  res.json({ message: 'Logged out successfully' });
});

module.exports = { register, login, logout };