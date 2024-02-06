import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function addUser(name , em , pass){
    const user = await prisma.user.create({
        data:{
            email: em,
            username: name,
            password: pass
        }
    })

    return user;
}
