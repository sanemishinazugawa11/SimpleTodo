import express from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import { z } from 'zod';

const userRouter = express.Router();
const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Minimum 8 length Password is required"),
});

const signUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Minimum 8 length Password is required"),
});


userRouter.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success:false,
      message:"Please fill all the details"
    });
  }
  if(signInSchema.safeParse(req.body).success === false){
    return res.status(400).json({
      success:false,
      message:"Incorrect inputs"
    });
  }

  const user = await prisma.users.findFirst({
    where:{
      username:username
    }

  })
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password"
    });
  }

  const token = jwt.sign(user.email, process.env.JWT_SECRET as string);
  
  res.json({
    success:true,
    message:"Signed in successfully",
    token : token
  })

});

userRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields"
    });;
  }

  if(signUpSchema.safeParse(req.body).success === false){
    return res.status(400).json({
      success: false,
      message: "Something is wrong with the input . Please check the input"
    });;
  }

  const user = await prisma.users.findUnique({
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

  const newUser = await prisma.users.create({
    data: {
      username: username,
      email: email,
      password: password
    }
  });

  const token = jwt.sign(email, process.env.JWT_SECRET as string);


  res.json({
    success: true,
    token: token,
    message: "User created successfully",
  })
})



export { userRouter };
