// fixPassword.js - Hash the plain text password
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function fixPassword() {
  try {
    // Connect to MongoDB
    const dbType = process.env.DB_TYPE || 'local';
    const dbURI = dbType === 'atlas' ? process.env.ATLAS_URI : process.env.LOCAL_URI;
    
    await mongoose.connect(dbURI);
    console.log(`✅ Connected to ${dbType} database\n`);

    // Find the user
    const user = await User.findOne({ email: 'marc@example.com' });
    
    if (!user) {
      console.log('❌ User not found!');
      return;
    }

    console.log('Found user:', user.email);
    console.log('Current password (plain text):', user.password);
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    // Update the user
    user.password = hashedPassword;
    await user.save();
    
    console.log('\n✅ Password has been hashed successfully!');
    console.log('New hashed password:', hashedPassword);
    console.log('\n🎉 You can now login with:');
    console.log('   Email: marc@example.com');
    console.log('   Password: 123456');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from database');
  }
}

fixPassword();