import "dotenv/config";

import cors from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import refreshRoute from "./routes/refreshRoute";
import logoutRoute from "./routes/logoutRoute";
import eventRoutes from "./routes/eventRoutes";

import verifyJWT from "./middleware/verifyJWT";
import corsOptions from "./config/corsOptions";
import scheduledEmail from "./services/scheduledEmail";
import path from "path";

const app: express.Application = express();
const port: number = parseInt(process.env.PORT || "5000", 10);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/refresh", refreshRoute);
app.use("/api/logout", logoutRoute);

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../client/dist/index.html"),
        (err) => {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

app.use(verifyJWT);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

scheduledEmail();

app.listen(port, async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`Server listening at http://localhost:${port}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
});
