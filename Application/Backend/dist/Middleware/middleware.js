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
exports.userFound = exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma"));
let userFound;
exports.userFound = userFound;
const userMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).send("No token provided");
    }
    const token = header.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).send("Unauthorized");
    }
    const jwtSecret = process.env.JWT_SECRET;
    const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
    const user = yield prisma_1.default.users.findUnique({
        where: {
            email: decoded
        }
    });
    exports.userFound = userFound = user;
    next();
});
exports.userMiddleware = userMiddleware;
