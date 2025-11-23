const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();

// Token blacklist (consider using Redis in production)
const tokenBlacklist = new Set();

// Register Route
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create a new user
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: "User Registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_TOKEN,
            { expiresIn: "1h" }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/logout", (req, res) => {
    try {
        // Extract the token from the Authorization header
        const token = req.header("Authorization");
        
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        // Remove "Bearer " prefix if it exists
        const actualToken = token.startsWith("Bearer ") ? token.slice(7) : token;

        // Verify the token is valid before blacklisting
        jwt.verify(actualToken, process.env.JWT_TOKEN);

        // Add token to blacklist
        tokenBlacklist.add(actualToken);

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
});

module.exports = router;
module.exports.tokenBlacklist = tokenBlacklist;
