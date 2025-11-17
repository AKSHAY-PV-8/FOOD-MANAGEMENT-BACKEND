import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config()


export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const alreadyExist = await User.findOne({ email })
        if (!alreadyExist) {
            const user = await User.create({ name, email, password, role });
            res.status(201).json({ message: "User created successfully", user })
        } else {
            res.status(400).json({ message: "User already exist" })
        }

    } catch (error) {
        res.status(400).json({ message: "error in register", error })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "user not found" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "User not found" })

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.status(200).json({ message: "Login successfully" })

    } catch (error) {
        res.status(404).json({ message: "error in login", error })

    }
}

export const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    })

    res.status(200).json({message: "Logged out succesfully"});
}
