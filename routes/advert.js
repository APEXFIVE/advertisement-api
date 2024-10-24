import express from 'express';
import { addAdverts, getAdverts, getOneAdvert, updateAdverts, deleteAdvert } from '../controllers/advert-controller.js';
import { isAuthenticated, isVendor } from '../middlewares/auth.js'; // Adjust the import path as needed
import validate from '../middlewares/auth.js';
import { advertImageUpload } from '../middlewares/upload.js';
// import { addAdvertValidator, updateAdvertVAlidator } from '../validators/advert.js';

const router = express.Router();

// Routes requiring authentication and vendor verification
router.post('/adverts', 
    isAuthenticated, 
    isVendor, 
    advertImageUpload.single('image'), // This middleware handles the image upload
    // validate(addAdvertValidator), 
    addAdverts
);
router.get('/adverts', getAdverts); // Anyone can access
router.get('/adverts/:id', getOneAdvert); // Anyone can access

router.patch('/adverts/:id', isAuthenticated, isVendor, advertImageUpload.single('image'), updateAdverts);
router.delete('/adverts/:id', isAuthenticated, isVendor, deleteAdvert);

export default router;
