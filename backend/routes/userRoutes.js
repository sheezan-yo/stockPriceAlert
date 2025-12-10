import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.get('/test', (req, res) => {
    return res.status(200).json({ message: "this route is working" })
});

export default userRouter;