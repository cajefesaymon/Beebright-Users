// checkUsers.js - See what's in your database
const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function checkUsers() {
  try {
    // Connect to MongoDB
    const dbType = process.env.DB_TYPE || 'local';
    const dbURI = dbType === 'atlas' ? process.env.ATLAS_URI : process.env.LOCAL_URI;
    
    await mongoose.connect(dbURI);
    console.log(`✅ Connected to ${dbType} database\n`);

    // Get all users
    const users = await User.find();
    
    if (users.length === 0) {
      console.log('❌ No users found in database!');
      console.log('💡 Try registering a new user first.');
    } else {
      console.log(`Found ${users.length} user(s):\n`);
      
      users.forEach((user, index) => {
        console.log(`--- User ${index + 1} ---`);
        console.log(`Email: ${user.email}`);
        console.log(`Password: ${user.password}`);
        
        // Check if password is hashed
        if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
          console.log(`Status: ✅ HASHED (correct)`);
        } else {
          console.log(`Status: ⚠️  PLAIN TEXT (needs hashing!)`);
        }
        console.log(`Created: ${user.createdAt}\n`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  }
}

checkUsers();