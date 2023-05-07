import { Request, Response } from "express";
import User from "../models/userModel";
import AuthRequest from "../types/AuthRequest";

async function getProfile(req: AuthRequest, res: Response) {
    const username = req.username;
    let foundUser;
    try {
        foundUser = await User.findOne({ username });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }

    if (foundUser) {
        res.json(foundUser);
    } else {
        return res.sendStatus(404);
    }
}

async function editProfile(req: AuthRequest, res: Response) {
    const username = req.username;
    const { username: updatedUsername, ...updatedFields } = req.body;
    if (updatedUsername) {
        return res
            .status(400)
            .json({ success: false, error: "Cannot update username" });
    }

    let updatedUser;
    try {
        updatedUser = await User.findOneAndUpdate({ username }, updatedFields, {
            new: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }

    if (updatedUser) {
        res.json(updatedUser);
    } else {
        return res.sendStatus(404);
    }
}

export { getProfile, editProfile };
