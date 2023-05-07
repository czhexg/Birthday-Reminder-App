import express from "express";
import { handleLogin, handleRegister } from "../controllers/authControllers";

const router = express.Router();

router.post("/login", handleLogin);
router.post("/register", handleRegister);

export default router;
