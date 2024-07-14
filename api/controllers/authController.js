import User from '../models/user.js';
import bcryptjs from 'bcryptjs'; //hashed password

export const signup = async(req, res) =>{
 const{username, email, password} = req.body;
 if(!username || !email || !password || username === ''|| email ===  '' || password === '' ){
  return res.status(400).json({message:'All fields are required.'})
 }
 //Hashed password

 const hashedPassword = bcryptjs.hashSync(password,10);

 const newUser = new User({
  username,
  email,
  password: hashedPassword
 });
 try{
await newUser.save();
 res.json("Signup Succsessful");
 }catch(err){
  res.status(500).json({message:err.message})
 }
 
}