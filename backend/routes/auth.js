const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const USER = require("../models/User.js");
const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password, address } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashed,
        address
    });

    await user.save();
    res.json({ message: "Registered successfully" });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.json({ token });
})


module.exports = router;