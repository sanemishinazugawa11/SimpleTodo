import express, { Request } from "express";
import {userMiddleware , userFound} from "../Middleware/middleware";
import prisma from "../prisma";
const todoRouter = express.Router();



todoRouter.post("/createTodo", userMiddleware , async(req , res) => {
    const { title , description } = req.body;
    if(!title || !description){
        return res.status(400).json({
            success : false,
            message : "Please fill all the fields"
        });
    }
    const user = userFound;
    
    const newTodo = await prisma.todos.create({
        data : {
            title : title,
            description : description,
            completed: false,
            user_id : user.id
        }
    });

    res.status(201).json({
        success : true,
        message : "Todo created successfully"
    });
})

todoRouter.get("/getTodos", userMiddleware,async(req,res)=>{
    const user = userFound;

    const todos = await prisma.todos.findMany({
        where:{
            user_id : user.id
        }
    })

    if(!todos) return res.status(404).json({
        success:false,
        message : "No todos found"
    });

    res.status(200).json({
        success:true,
        todos : todos
    })
})

todoRouter.post("/updateTodo" , userMiddleware , async(req, res) => {
    const user = userFound;
    
    const todoId = req.query.id;
    console.log(req.query)
    const todo = await prisma.todos.update({
        where : {
            todo_id : Number(todoId)
        }, 
        data : {
            completed : true
        }
    })

    res.status(200).json({
        success : true,
        todo : todo,
        message : "Todo updated successfully"
    })
   
})



 export default todoRouter;