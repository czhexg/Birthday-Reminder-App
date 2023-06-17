import express from "express";
import { getProfile, editProfile } from "../controllers/userControllers";

const router = express.Router();

router.route("/profile").get(getProfile).put(editProfile);

export default router;
