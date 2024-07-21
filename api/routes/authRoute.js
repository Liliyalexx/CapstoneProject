import express from 'express';
import { signup, signin } from '../controllers/authController.js';

const authRoute = express.Router();
authRoute.post('/signup', signup);
authRoute.post('/signin', signin);

export default authRoute;
