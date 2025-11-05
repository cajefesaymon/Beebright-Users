const Enrollment = require('../models/enrollment');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Create a new enrollment
const createEnrollment = async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    grade,
    school,
    password,
    contactEmail,
    contactPhone,
    address,
    schedule,
    notes
  } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password is required and must be at least 8 characters long' });
  }

  const studentName = `${firstName} ${lastName}`;
  
  if (!firstName || !lastName || !age || !grade || !school || !password || !contactEmail) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const enrollment = new Enrollment({
    studentName,
    age,
    grade,
    school,
    password: hashedPassword,
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

// UPDATE enrollment status (approve/reject)
const updateEnrollmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const enrollment = await Enrollment.findById(id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Update enrollment status
    enrollment.status = status;
    await enrollment.save();

    // If approved, create a User account
    if (status === 'approved') {
      // Check if user already exists
      const existingUser = await User.findOne({ email: enrollment.contactEmail });
      
      if (!existingUser) {
        
        // --- START OF FIX ---
        // Check if the password from enrollment is already hashed or is plain text
        // A real bcrypt hash starts with '$2a$', '$2b$', or '$2y$'
        let passwordToStore;
        const isHashed = enrollment.password.startsWith('$2a$') || 
                         enrollment.password.startsWith('$2b$') || 
                         enrollment.password.startsWith('$2y$');

        if (isHashed) {
          // It's already a hash, use it as-is
          console.log(`Password for ${enrollment.contactEmail} is already hashed.`);
          passwordToStore = enrollment.password;
        } else {
          // It's plain text (like 'HAROLD123'), so we MUST hash it
          console.log(`Password for ${enrollment.contactEmail} is plain text. Hashing now...`);
          const salt = await bcrypt.genSalt(10);
          passwordToStore = await bcrypt.hash(enrollment.password, salt);
        }
        // --- END OF FIX ---

        // DIRECT DATABASE INSERT to bypass pre-save hooks
        // This ensures the correct password (now definitely hashed) is used
        await User.collection.insertOne({
          name: enrollment.studentName,
          email: enrollment.contactEmail,
          password: passwordToStore, // Use the correctly hashed password
          role: 'student',
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        console.log(`✅ User account created for: ${enrollment.contactEmail}`);
        
        return res.json({ 
          message: 'Enrollment approved and user account created',
          enrollment
        });
      }
    }

    res.json({ message: `Enrollment ${status}`, enrollment });
  } catch (error) {
    console.error('❌ Error updating enrollment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createEnrollment,
  listEnrollments,
  updateEnrollmentStatus
};