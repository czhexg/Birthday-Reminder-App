import express from "express";
import { getProfile, editProfile } from "../controllers/userControllers";

const router = express.Router();

router.route("/profile").get(getProfile).put(editProfile);

// router.route("/register").post(registerUser);

// router.route("/login").post(loginUser);

export default router;
