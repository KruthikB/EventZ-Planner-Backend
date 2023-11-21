const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    // For security, don't send back the whole user object
    res.status(201).send({ user: { _id: user._id, name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        // Use the method from the user schema to check the password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.send({ user: { _id: user._id, name: user.name, email: user.email }, token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


module.exports = router;
