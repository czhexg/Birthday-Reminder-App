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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const refreshRoute_1 = __importDefault(require("./routes/refreshRoute"));
const logoutRoute_1 = __importDefault(require("./routes/logoutRoute"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const verifyJWT_1 = __importDefault(require("./middleware/verifyJWT"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const scheduledEmail_1 = __importDefault(require("./services/scheduledEmail"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || "5000", 10);
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/refresh", refreshRoute_1.default);
app.use("/api/logout", logoutRoute_1.default);
// app.use(verifyJWT);
// app.use("/api/users", userRoutes);
// app.use("/api/events", eventRoutes);
const authenticatedRouter = express_1.default.Router();
authenticatedRouter.use(verifyJWT_1.default);
authenticatedRouter.use("/users", userRoutes_1.default);
authenticatedRouter.use("/events", eventRoutes_1.default);
app.use("/api", authenticatedRouter);
(0, scheduledEmail_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/dist/index.html"), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield mongoose_1.default.connect(process.env.MONGO_DB_URI);
        console.log(`Server listening at http://localhost:${port}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}));
