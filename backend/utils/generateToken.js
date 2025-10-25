// utils/generateToken.js
// Generates a JWT signed token for a user id.

const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'change_this_secret', {
    expiresIn: '7d',
  });
};

module.exports = generateToken;
