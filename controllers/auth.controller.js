import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const alreadyExist = await User.findOne({ email })
        if (!alreadyExist) {
            const user = await User.create({ name, email, password, role });
            res.status(201).json({ message: "User created successfully", user })
        }else{
            res.status(400).json({message: "User already exist"})
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

        res.status(200).json({
            message: "login succesfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        })

    } catch (error) {
        res.status(404).json({ message: "error in login", error })

    }
}

