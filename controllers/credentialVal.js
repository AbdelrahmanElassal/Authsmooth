import validator from "validator";
import { findUser } from "../prisma/script.js"


export function validateEmail(email){
    if(email === undefined || !validator.isEmail(email)){
        return true
    }
    return false
}

export function validatePass(password){
    if(password === undefined || password.length <= 6 ){
        return true
    }
    return false
}

export function validateName(name){
    if(name === undefined || name === '' ){
        return true
    }
    return false
}