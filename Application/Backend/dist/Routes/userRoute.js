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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma"));
const zod_1 = require("zod");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
const signInSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username is required"),
    password: zod_1.z.string().min(8, "Minimum 8 length Password is required"),
});
const signUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username is required"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(8, "Minimum 8 length Password is required"),
});
userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the details"
        });
    }
    if (signInSchema.safeParse(req.body).success === false) {
        return res.status(400).json({
            success: false,
            message: "Incorrect inputs"
        });
    }
    const user = yield prisma_1.default.users.findFirst({
        where: {
            username: username
        }
    });
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid username or password"
        });
    }
    const token = jsonwebtoken_1.default.sign(user.email, process.env.JWT_SECRET);
    res.json({
        success: true,
        message: "Signed in successfully",
        token: token
    });
}));
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        });
        ;
    }
    if (signUpSchema.safeParse(req.body).success === false) {
        return res.status(400).json({
            success: false,
            message: "Something is wrong with the input . Please check the input"
        });
        ;
    }
    const user = yield prisma_1.default.users.findUnique({
        where: {
            email: email
        }
    });
    if (user) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }
    const newUser = yield prisma_1.default.users.create({
        data: {
            username: username,
            email: email,
            password: password
        }
    });
    const token = jsonwebtoken_1.default.sign(email, process.env.JWT_SECRET);
    res.json({
        success: true,
        token: token,
        message: "User created successfully",
    });
}));
