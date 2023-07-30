"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = [
    "https://remindify.vercel.app",
    "https://remindify-git-main-czhexg.vercel.app",
    "https://remindify-czhexg.vercel.app",
    "http://localhost:5173",
    "http://localhost:5000",
];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};
exports.default = corsOptions;
