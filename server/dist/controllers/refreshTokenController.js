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
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
function handleRefreshToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
            return res.sendStatus(401);
        }
        const refreshToken = cookies.jwt;
        console.log(refreshToken);
        let foundUser;
        try {
            foundUser = yield userModel_1.default.findOne({ refreshToken });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
        if (!foundUser) {
            return res.sendStatus(403);
        }
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || foundUser.username !== decoded.username) {
                return res.sendStatus(403);
            }
            else {
                const accessToken = jsonwebtoken_1.default.sign({ username: decoded.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
                res.json({
                    userId: foundUser._id,
                    username: decoded.username,
                    accessToken,
                });
            }
        });
    });
}
exports.default = handleRefreshToken;
