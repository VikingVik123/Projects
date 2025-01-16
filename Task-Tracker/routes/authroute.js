const bcrypt = require('bcrypt');
const user = require('../models/user.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const express = require('express');

const router = express.Router();

router.post ("/register", (req, res) => {
    const {username, password} = req.body
    try {
        const user = new user({username, password});
        user.save();
        res.status(201).json({message: "User Registered successfully"});
    } catch(error) {
        res.status(400).json({error: error.message})
    }
})

router.post("/login", (req, res) => {
    const user = {username, password} = req.body;
    try {
        const user = user.findOne({username})
        if (!user || !(bcrypt.compare(password, user.password))) {
            return res.status(401).json({message: "invalid credentials"});
        }
        const token = jwt.sign({"userID": user._id}, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({token})
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;