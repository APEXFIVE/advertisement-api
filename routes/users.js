

import { Router } from "express";
import { registerUser, loginUser, logoutUser } from '../controllers/users.js'


const userRouter = Router();

userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', loginUser);

userRouter.post('/user/logout', logoutUser);

export default userRouter;

