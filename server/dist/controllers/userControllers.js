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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfile = exports.getProfile = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
function getProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.username;
        let foundUser;
        try {
            foundUser = yield userModel_1.default.findOne({ username });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
        if (foundUser) {
            res.json(foundUser);
        }
        else {
            return res.sendStatus(404);
        }
    });
}
exports.getProfile = getProfile;
function editProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.username;
        const _a = req.body, { username: updatedUsername } = _a, updatedFields = __rest(_a, ["username"]);
        if (updatedUsername) {
            return res
                .status(400)
                .json({ success: false, error: "Cannot update username" });
        }
        let updatedUser;
        try {
            updatedUser = yield userModel_1.default.findOneAndUpdate({ username }, updatedFields, {
                new: true,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
        if (updatedUser) {
            res.json(updatedUser);
        }
        else {
            return res.sendStatus(404);
        }
    });
}
exports.editProfile = editProfile;
