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
        include:{
            _count:{
                select:{
                    sent:{
                        where:{
                            createdAt:{
                                gte:startDate,
                                lt:endDate
                            }
                        }
                    }
                }
            }
        }
    })


    return users.map(({username, email, _count})=>({username,email,qty:_count.sent}))
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
    return await prisma.email.count({
        where:{
            senderId:userId,
            createdAt:{
                gte:startDate,
                lt:endDate
            }
        }
    })
}