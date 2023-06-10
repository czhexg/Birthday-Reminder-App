import { Request, Response } from "express";

import User from "../models/userModel";

async function handleLogout(req: Request, res: Response) {
    const cookies = req.cookies;

    console.log("logout route called");

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
            sameSite: "none",
            secure: true,
        });
        console.log("wtf");
        console.log(cookies.jwt);
        return res.sendStatus(204);
    }

    try {
        foundUser.refreshToken = null;
        await foundUser.save();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }

    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    console.log("wtf");
    console.log(cookies.jwt);

    res.sendStatus(204);
}

export default handleLogout;
