import * as dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import AuthRequest from "../types/AuthRequest";

function verifyJWT(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.sendStatus(401);
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded: JwtPayload) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.username = decoded.username;
            console.log(req.username);

            next();
        }
    );
}

export default verifyJWT;
