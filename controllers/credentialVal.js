import validator from "validator";


function validateEmail(email){
    if(email === undefined || !validator.isEmail(email)){
        return true
    }
    return false
}

function validatePass(password){
    if(password === undefined || password.length <= 6 ){
        return true
    }
    return false
}

function validateName(name){
    if(name === undefined || name === '' ){
        return true
    }
    return false
}

export function validateCred(name , email, password ){
    if(validateName(name) || validateEmail(email) || validatePass(password)){
        const error = { name: "", email : "" , password:""}
        if(validateName(name)){
            error.name = "Enter a username"
        }
        if(validateEmail(email)){
            error.email = "Enter a valid email"
        }
        
        if(validatePass(password)){
            error.password = "password shoud be more than six charecters"
        }
        
        throw(error);
    }
}