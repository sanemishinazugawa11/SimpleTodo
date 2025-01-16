import jwt from "jsonwebtoken";
import prisma from "../prisma";

let userFound;

const userMiddleware = async(req,res,next)=>{
    const header = req.headers.authorization;
    if(!header){
        return res.status(401).send("No token provided");
    }

    const token = header.split(' ')[1];
    console.log(token)
    if(!token){
        return res.status(401).send("Unauthorized");
    }
    const jwtSecret : string  = process.env.JWT_SECRET as string;
    const decoded  = jwt.verify(token,jwtSecret) as string; 

    const user = await prisma.users.findUnique({
        where : {
            email : decoded
        }
    });

    userFound = user;
    next();


}
export { userMiddleware, userFound };
