import "dotenv/config";

// import cors from "cors";
import express, { Request, Response } from "express";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";

// import authRoutes from "./routes/authRoutes";
// import userRoutes from "./routes/userRoutes";
// import refreshRoute from "./routes/refreshRoute";
// import logoutRoute from "./routes/logoutRoute";
// import eventRoutes from "./routes/eventRoutes";

// import verifyJWT from "./middleware/verifyJWT";
// // import corsOptions from "./config/corsOptions";
// import scheduledEmail from "./services/scheduledEmail";

const app: express.Express = express();
const port: number = parseInt(process.env.PORT || "5000", 10);

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Remindify API running");
});

// app.use("/api/auth", authRoutes);
// app.use("/api/refresh", refreshRoute);
// app.use("/api/logout", logoutRoute);

// app.use(verifyJWT);
// app.use("/api/users", userRoutes);
// app.use("/api/events", eventRoutes);

// scheduledEmail();

// app.listen(port, async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_DB_URI);
//         console.log(`Server listening at http://localhost:${port}`);
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// });

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
