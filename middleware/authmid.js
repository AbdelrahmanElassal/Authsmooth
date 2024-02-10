import  Jwt  from "jsonwebtoken";
import dotenv from "dotenv";
import { findUserbyID } from "../prisma/script.js";
dotenv.config();

export function checkTokenMid(req , res , next){
    const token = req.cookies.jwt;

    if(token){
        Jwt.verify(token , process.env.SECRET_STRING , (err , decodedToken)=>{
            if(err){
                res.redirect('/login');
            }
            else{
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}


export async function checkUser(req , res , next){
    const token = req.cookies.jwt;

    if(token){
        Jwt.verify(token , process.env.SECRET_STRING , async (err , decodedToken)=>{
            if(err){
                res.locals.u = null ;
                next(); 
            }
            else{
                const user = await findUserbyID(decodedToken.id)
                res.locals.u = user ;
                next();
            }
        })
    }
    else{
        res.locals.u = null ;
        next();
    }
}




