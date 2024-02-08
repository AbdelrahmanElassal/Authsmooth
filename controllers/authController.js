// controller actions
import {validateCred} from './credentialVal.js'
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
    validateCred(name , email, password);
    
    const u = await addUser(name , email , password);
    
    res.status(201).json(u);
  }catch(err){
    console.log(err)
    
    if(err.code == 'P2002'){
      let error = "Email is already used";
      res.status(400).send(error);
    }
    
    res.status(400).send(err); 
  }
}

export const login_post = async (req, res) => {
  const { email, password } = req.body;
  
  console.log(email, password);
  res.send('user login');
}