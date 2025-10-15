// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Choose which DB to connect to
const dbType = process.env.DB_TYPE || 'local';
let dbURI = '';

if (dbType === 'atlas') {
  dbURI = process.env.ATLAS_URI;
} else {
  dbURI = process.env.LOCAL_URI;
}

// Connect to MongoDB
mongoose.connect(dbURI)
.then(() => console.log(`✅ MongoDB Connected (${dbType})`))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Sample route
app.get('/api', (req, res) => {
  res.send(`Backend is running! Connected to ${dbType} DB.`);
});

// ========== USER MODEL ==========
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// ========== AUTH ROUTES ==========

// Register Route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ 
      message: 'Login successful', 
      user: { email: user.email } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ========== EXAMPLE ROUTES ==========
const exampleSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
const Example = mongoose.model('Example', exampleSchema);

app.post('/api/examples', async (req, res) => {
  try {
    const example = new Example(req.body);
    await example.save();
    res.json(example);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/examples', async (req, res) => {
  try {
    const examples = await Example.find();
    res.json(examples);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));