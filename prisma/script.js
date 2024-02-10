import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

export async function addUser(name , em , pass){
    const salt = await bcrypt.genSalt();
    pass = await bcrypt.hash(pass , salt);
    const user = await prisma.user.create({
        data:{
            email: em,
            username: name,
            password: pass
        }
    })

    return user;
}
export async function findUser(em){
    const user = await prisma.user.findUnique({
    where: {
    email: em,
    },
})
    return user;
}

export async function findUserbyID(id){
    const user = await prisma.user.findUnique({
    where: {
    id: id,
    },
})
    return user;
}



