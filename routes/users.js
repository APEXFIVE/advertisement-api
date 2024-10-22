

import { Router } from "express";
import { registerUser, loginUser, logoutUser, getProfile, updateProfile } from '../controllers/users.js'
import{userAvatarUpload} from "../middlewares/upload.js";
import { hasPermission,isAuthenticated } from "../middlewares/auth.js";


const userRouter = Router();

userRouter.post('/users/register', registerUser);

userRouter.post('/users/login',
 loginUser);

userRouter.get('/users/me', isAuthenticated,hasPermission('get_profile'), getProfile);

userRouter.post('/user/logout', logoutUser);

userRouter.patch('/users/me', isAuthenticated,hasPermission('update_profile'), userAvatarUpload.single('avatar'),updateProfile);

export default userRouter;

