import { NextFunction, Request, Response } from "express";
import { Roles } from "../utils/roles";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    
    if(req.body.user.role !== Roles.ADMIN){
        return res.status(403).json({message:"Unauthorized"})
    }
    
    next()
}