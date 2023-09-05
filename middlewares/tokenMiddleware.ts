import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { Roles } from "../utils/roles";

export default function tokenMiddleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers.authorization?.split(" ")[1]
    
    if(!token){
        return res.status(401).json({message:"No token provided"})
    }

    jwt.verify(token,process.env.TOKEN_KEY as Secret,async(err,decoded)=>{
        if(err){
            return res.status(401).json({message:"Invalid token"})
        }

        const user = decoded as {id:number,role:Roles,email:string, username:string}

        req.body.user = user

        next()
    })
}