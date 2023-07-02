import "dotenv/config";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import User from "../models/userModel";

async function handleRefreshToken(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;

    console.log(refreshToken);

    let foundUser;
    try {
        foundUser = await User.findOne({ refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
    if (!foundUser) {
        return res.sendStatus(403);
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded: JwtPayload) => {
            if (err || foundUser.username !== decoded.username) {
                return res.sendStatus(403);
            } else {
                const accessToken = jwt.sign(
                    { username: decoded.username },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "1m" }
                );
                res.json({
                    userId: foundUser._id,
                    username: decoded.username,
                    accessToken,
                });
            }
        }
    );
}

export default handleRefreshToken;
