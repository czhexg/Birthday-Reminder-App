import { Request, Response } from "express";

import User from "../models/userModel";

async function handleLogout(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }
    const refreshToken = cookies.jwt;

    let foundUser;
    try {
        foundUser = await User.findOne({ refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }

    if (!foundUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.sendStatus(204);
    }

    try {
        foundUser.refreshToken = null;
        foundUser.save();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }

    res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204);
}

export default handleLogout;
