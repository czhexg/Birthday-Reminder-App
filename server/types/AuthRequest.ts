import { Request } from "express";

interface AuthRequest extends Request {
    username?: string;
}

export default AuthRequest;
