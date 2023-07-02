import "dotenv/config";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel";

async function handleLogin(req: Request, res: Response) {
    console.log(req.body);

    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username and Password are required." });
    }

    let foundUser;
    try {
        foundUser = await User.findOne({ username });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
    if (!foundUser) {
        return res.status(401).json({ message: "Incorrect Username." });
    }

    const checkPassword = await bcrypt.compare(password, foundUser.password);
    if (checkPassword) {
        const accessToken = jwt.sign(
            {
                username: foundUser.username,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1m",
            }
        );
        const refreshToken = jwt.sign(
            {
                username: foundUser.username,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        );

        foundUser.refreshToken = refreshToken;

        try {
            await foundUser.save();
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({ userId: foundUser._id, accessToken });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    } else {
        return res.status(401).json({ message: "Incorrect Password." });
    }
}

async function handleRegister(req: Request, res: Response) {
    const { fullname, username, email, password } = req.body;

    if (!fullname || !username || !email || !password) {
        return res.status(400).json({
            message: "Fullname, Username, Email and Password are required.",
        });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({
            $or: [
                { username: req.body.username },
                { fullname: req.body.fullname },
                { email: req.body.email },
            ],
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }

    if (existingUser) {
        if (existingUser.username === username) {
            return res.status(409).json({
                message: "Username taken.",
            });
        } else if (existingUser.fullname === fullname) {
            return res.status(409).json({
                message: "Fullname taken.",
            });
        } else if (existingUser.email === email) {
            return res.status(409).json({
                message: "Email taken.",
            });
        }
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            fullname: fullname,
            email: email,
            password: hashedPassword,
        });

        const accessToken = jwt.sign(
            {
                username: newUser.username,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1m",
            }
        );
        const refreshToken = jwt.sign(
            {
                username: newUser.username,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        );

        newUser.refreshToken = refreshToken;

        try {
            const user = await newUser.save();
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({ userId: user._id, accessToken });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    }
}

export { handleLogin, handleRegister };
