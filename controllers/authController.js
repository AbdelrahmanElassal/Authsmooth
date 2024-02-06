// controller actions
import {validateEmail , validatePass , validateName } from './credentialVal.js'
import { addUser } from "../prisma/script.js"
import { json } from 'express';


export  const signup_get = (req, res) => {
  res.render('signup');
}

export  const login_get = (req, res) => {
  res.render('login');
}

export const signup_post = async (req, res) => {
  const { name , email, password } = req.body;
  try{
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
    const u = await addUser(name , email , password);
    res.status(201).json(u);
  }catch(err){
    console.log(err)
    let error = ""
    if(err.code == 'P2002'){
      error = "Email is already used";
    }
    res.status(400).send(error); 
  }
}

export const login_post = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  res.send('user login');
}