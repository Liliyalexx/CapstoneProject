import express from 'express';
import { test, signout, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/signout', signout);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, updateUser);

export default router;