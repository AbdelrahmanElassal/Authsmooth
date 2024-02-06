// controller actions
import { addUser } from "../prisma/script.js"
export  const signup_get = (req, res) => {
  res.render('signup');
}

export  const login_get = (req, res) => {
  res.render('login');
}

export const signup_post = async (req, res) => {
  const { email, password } = req.body;
  const name = 'Abdelrahman'
  try{
    const u = await addUser(name , email , password);
    res.status(201).json(u);
  }catch(err){
    res.status(400).send('error user isnot created');
  }
}

export const login_post = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  res.send('user login');
}