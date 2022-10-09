import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

router.post("/register", async (req, res) => {
    // Get all form data
    const { firstName, lastName, email, password } = req.body;

    // Check if user exists with same email
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(406).json({ message: "User already exists" });
        return;
    }

    // Hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    // Store user
    const user = await User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    const savedUser = await user.save();
    console.log(savedUser);

    res.status(201).json({ message: "user is created" });
});

router.post("/login", async (req, res) => {
    // Get all form data
    const { email, password } = req.body;

    // Check user exists or not with email
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404).json({
            message: "User is not found with this credentials",
        });
        return;
    }

    // Check user exists or not with password
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
        res.status(404).json({
            message: "User is not found with this credentials",
        });
        return;
    }

    // create jwt token
    const payload = {
        username: email,
        _id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({ message: "Successfully logged in.", token });
});

export default router;
