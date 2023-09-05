import prisma from "../prisma/prisma";
import { Roles } from "./roles";

export async function createUser(username:string,password:string,email:string) {
    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: password,
            email: email,
            role: Roles.USER
        }
    })
    return newUser
}


export async function getUserById(id:number) {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return user
}

export async function getUserByEmail(email:string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    return user
}


export async function getEmailStats(startDate:Date, endDate:Date){
    const users = await prisma.user.findMany({
        where:{
            sent: {
                some:{
                    createdAt:{
                        gte:startDate,
                        lt:endDate
                    }
                }
            },
        },
        select:{
            username:true,
            email:true
        }
    })
    return users
}

export async function addEmailToDatabase(senderId:number, content:string, receiverId:number){
    

    await prisma.email.create({
            data:{
                content:content,
                senderId:senderId,
                receiverId: receiverId
            }
        })
}

export async function getEmailsQtyFromUser(userId:number, startDate:Date, endDate:Date) {
    await prisma.email.count({
        where:{
            senderId:userId,
            createdAt:{
                gte:startDate,
                lt:endDate
            }
        }
    })
}