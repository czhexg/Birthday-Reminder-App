"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = [
    "https://remindify.vercel.app/",
    "https://remindify-git-main-czhexg.vercel.app",
    "https://remindify-alorzt30j-czhexg.vercel.app",
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
