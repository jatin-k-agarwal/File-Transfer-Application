const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(" Registration attempt:", email);

    const exists = await User.findOne({ email });
    if (exists) {
      console.log(" Email already in use:", email);
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    console.log(" User registered:", user.email);
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error(" Registration error:", err.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login an existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(" Login attempt:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log(" No user found with email:", email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(" Password mismatch for:", email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      console.error(" JWT_SECRET is not set in .env file!");
      return res.status(500).json({ message: 'Server misconfiguration' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    console.log(" Login successful:", email);
    res.status(200).json({ token, user });

  } catch (err) {
    console.error(" Login error:", err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};
