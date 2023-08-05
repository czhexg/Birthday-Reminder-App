"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRegister = exports.handleLogin = void 0;
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const { username, password } = req.body;
        res.send(req.body);
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Username and Password are required." });
        }
        let foundUser;
        try {
            foundUser = yield userModel_1.default.findOne({ username });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
        if (!foundUser) {
            return res.status(401).json({ message: "Incorrect Username." });
        }
        const checkPassword = yield bcrypt_1.default.compare(password, foundUser.password);
        if (checkPassword) {
            const accessToken = jsonwebtoken_1.default.sign({
                username: foundUser.username,
            }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "1m",
            });
            const refreshToken = jsonwebtoken_1.default.sign({
                username: foundUser.username,
            }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "1d",
            });
            foundUser.refreshToken = refreshToken;
            try {
                yield foundUser.save();
                res.cookie("jwt", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.json({ userId: foundUser._id, accessToken });
            }
            catch (error) {
                console.error(error);
                res.status(500).send("Internal server error");
            }
        }
        else {
            return res.status(401).json({ message: "Incorrect Password." });
        }
    });
}
exports.handleLogin = handleLogin;
function handleRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fullname, username, email, password } = req.body;
        if (!fullname || !username || !email || !password) {
            return res.status(400).json({
                message: "Fullname, Username, Email and Password are required.",
            });
        }
        let existingUser;
        try {
            existingUser = yield userModel_1.default.findOne({
                $or: [
                    { username: req.body.username },
                    { fullname: req.body.fullname },
                    { email: req.body.email },
                ],
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(409).json({
                    message: "Username taken.",
                });
            }
            else if (existingUser.fullname === fullname) {
                return res.status(409).json({
                    message: "Fullname taken.",
                });
            }
            else if (existingUser.email === email) {
                return res.status(409).json({
                    message: "Email taken.",
                });
            }
        }
        else {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = new userModel_1.default({
                username: username,
                fullname: fullname,
                email: email,
                password: hashedPassword,
            });
            const accessToken = jsonwebtoken_1.default.sign({
                username: newUser.username,
            }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "1m",
            });
            const refreshToken = jsonwebtoken_1.default.sign({
                username: newUser.username,
            }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "1d",
            });
            newUser.refreshToken = refreshToken;
            try {
                const user = yield newUser.save();
                res.cookie("jwt", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.json({ userId: user._id, accessToken });
            }
            catch (error) {
                console.error(error);
                res.status(500).send("Internal server error");
            }
        }
    });
}
exports.handleRegister = handleRegister;
