import { Router } from "express";
import { registerUser, loginUser, logoutUser, getProfile, updateProfile, getUserAdvert } from '../controllers/users.js';
import { userAvatarUpload } from "../middlewares/upload.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js"; // Assuming 'isAuthenticated' populates req.auth with id and role

const userRouter = Router();

// Register new users
userRouter.post('/users/register', registerUser);

// Log in a user and issue a JWT token
userRouter.post('/users/login', loginUser);

// Get the logged-in user's profile (requires authentication and permission)
userRouter.get('/users/me', isAuthenticated, hasPermission('get_profile'), getProfile);

userRouter.get('/users/me/adverts',isAuthenticated, getUserAdvert);

// Log out a user (optional, since JWT tokens are stateless, but you can handle session management here)
userRouter.post('/users/logout', isAuthenticated, logoutUser);

// Update the user's profile (requires authentication, permission, and optionally uploads an avatar)
userRouter.patch('/users/me', isAuthenticated, hasPermission('update_profile'), userAvatarUpload.single('avatar'), updateProfile);

export default userRouter;