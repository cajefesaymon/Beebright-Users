// middleware/authMiddleware.js
// Verifies JWT tokens from Authorization header or cookie and attaches user info to req.user

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
	try {
		let token;

		// Check Authorization header
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}

		// Fallback to cookie
		if (!token && req.cookies && req.cookies.token) {
			token = req.cookies.token;
		}

		if (!token) {
			return res.status(401).json({ message: 'Not authorized, token missing' });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// attach minimal user info, avoid sending password
		req.user = await User.findById(decoded.id).select('-password');

		if (!req.user) {
			return res.status(401).json({ message: 'Not authorized, user not found' });
		}

		next();
	} catch (err) {
		console.error('authMiddleware error', err.message);
		return res.status(401).json({ message: 'Not authorized, token failed' });
	}
};

// simple role guard
const adminOnly = (req, res, next) => {
	if (!req.user || req.user.role !== 'admin') {
		return res.status(403).json({ message: 'Require admin role' });
	}
	next();
};

module.exports = { protect, adminOnly };
