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
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../Middleware/middleware");
const prisma_1 = __importDefault(require("../prisma"));
const todoRouter = express_1.default.Router();
todoRouter.post("/createTodo", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        });
    }
    const user = middleware_1.userFound;
    const newTodo = yield prisma_1.default.todos.create({
        data: {
            title: title,
            description: description,
            completed: false,
            user_id: user.id
        }
    });
    res.status(201).json({
        success: true,
        message: "Todo created successfully"
    });
}));
todoRouter.get("/getTodos", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = middleware_1.userFound;
    const todos = yield prisma_1.default.todos.findMany({
        where: {
            user_id: user.id
        }
    });
    if (!todos)
        return res.status(404).json({
            success: false,
            message: "No todos found"
        });
    res.status(200).json({
        success: true,
        todos: todos
    });
}));
todoRouter.post("/updateTodo", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = middleware_1.userFound;
    const todoId = req.query.id;
    console.log(req.query);
    const todo = yield prisma_1.default.todos.update({
        where: {
            todo_id: Number(todoId)
        },
        data: {
            completed: true
        }
    });
    res.status(200).json({
        success: true,
        todo: todo,
        message: "Todo updated successfully"
    });
}));
exports.default = todoRouter;
