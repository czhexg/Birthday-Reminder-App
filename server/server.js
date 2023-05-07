"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv = require("dotenv");
dotenv.config();
var app = (0, express_1.default)();
var port = parseInt(process.env.PORT || "5000", 10);
// Middleware for parsing incoming requests with URL-encoded payloads
app.use(express_1.default.urlencoded({ extended: true }));
// Middleware for parsing incoming requests with JSON payloads
app.use(express_1.default.json());
// Middleware for enabling CORS
app.use((0, cors_1.default)());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(port, function () {
    console.log("Server listening at http://localhost:".concat(port));
});
