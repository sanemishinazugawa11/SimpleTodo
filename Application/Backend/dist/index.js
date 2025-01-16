"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = require("./Routes/userRoute");
const todoRoutes_1 = __importDefault(require("./Routes/todoRoutes"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/user', userRoute_1.userRouter);
app.use('/api/todo', todoRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
