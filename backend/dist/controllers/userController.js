import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/tokenManager.js";
export const getAllUsers = async (req, res, next) => {
    try {
        //get all users
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(409).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        //user signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send("User already registered");
        const hashedPassword = await hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        //create token & store cookie
        res.clearCookie("auth_token", {
            httpOnly: true,
            domain: "localhost",
            path: "/",
            signed: true,
        });
        const token = createToken(existingUser._id.toString(), existingUser.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({ message: "OK", id: newUser._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(409).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        //user login
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).send("User not found");
        }
        const isPasswordCorrect = await compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        //create token & store cookie
        res.clearCookie("auth_token", {
            httpOnly: true,
            domain: "localhost",
            path: "/",
            signed: true,
        });
        const token = createToken(existingUser._id.toString(), existingUser.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(201)
            .json({ message: "OK", id: existingUser._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(409).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=userController.js.map