import bcrypt from 'bcrypt'
import { findUser} from "../prisma/script.js"

export async function validateLogin (email , password){
    
    const u = await findUser(email);
    if(!u){
        let error = {email : "Incorrect E-mail, Enter a valid email"}
        throw(error);
    }
    else{
        let flag = await bcrypt.compare(password || "", u.password);
        if(!flag){
            let error = {password : "the password isn't correct, enter a correct password"}
            throw(error);
        }
    }
    
}