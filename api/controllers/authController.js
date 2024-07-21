import { error } from 'console';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.js';
import bcryptjs from 'bcryptjs'; //hashed password
import jwt from 'jsonwebtoken';


export const signup = async(req, res) =>{
 const{username, email, password} = req.body;
 if(!username || !email || !password || username === ''|| email ===  '' || password === '' ){
  return res
    .status(400)
    .json({ success: false, message: 'All fields are required.' });
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
 res.json({ success: true, message: 'Signup Successful' });
 }catch(err){
  res.status(500).json({ success: false, message: err.message });
 }
 
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};