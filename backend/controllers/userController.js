import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from 'bcrypt';


const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checking required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // create new user
        const hashedPasword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPasword });

        // return success message
        const token = generateToken(newUser._id);
        return res.status(201).json({ message: "User account created successfully!", token, user: newUser });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // verify password
        if (!user.comparePassword(password)) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // return success message
        const token = generateToken(user._id);
        user.password = undefined;

        return res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}