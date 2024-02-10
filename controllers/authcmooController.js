// controller actions
import {validateCred} from './credentialVal.js'
import {validateLogin} from './loginVal.js'
import { addUser , findUser} from "../prisma/script.js"
import { json } from 'express';
import  Jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function doToken(id){
  return Jwt.sign({id} , process.env.SECRET_STRING , {
    expiresIn: 24 * 60 * 60
  })
}

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
    // create jwt and pass it to the front
    const token = doToken(u.id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ u : u.id });
  }catch(err){
    if(err.code == 'P2002'){
      let error = {email : "Email is already used"};
      res.status(400).json({error});
    }
    else{
      res.status(400).json({err}); 
    }
  }
}

export const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    if(email == undefined){
        let error = {email : "You should enter an email" , password : ""}
        throw(error);
    }
    const u = await findUser(email);
    await validateLogin(email , password);
    const token = doToken(u.id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ u : u.id });
  }catch (err) {
    console.log(err)
    res.status(400).json({err}); 
  }
}

export  const logout_get = (req, res) => {
  res.cookie('jwt', "", { httpOnly: true, maxAge: 1 });
  res.redirect('/');
}