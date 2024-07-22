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

export const google = async(req, res, next) =>{

  const{ email, name, googlePhotoUrl} = req.body;
   if (!email || !name || !googlePhotoUrl) {
     return res
       .status(400)
       .json({ success: false, message: 'All fields are required.' });
   }
  try{
    const user = await User.findOne({email});
    if(user){
      const token = jwt.sign({id:user._id}, process.envJWT_SECRET);
      const {password, ...rest} = user._doc;
      res.status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);

    }
  }catch(err){
    console.error(err);
  }

}