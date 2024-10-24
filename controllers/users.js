
import { registerUserValidator, loginUserValidator, updateProfileValidator } from "../validators/users.js";
import { UserModel } from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdvertModel } from "../models/advert.js";

export const registerUser = async (req, res, next) => {
    try {
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            return res.status(409).json('User already exists');
        }

        if (value.role === 'vendor') {
            // Ensure vendor-specific fields are present
            if (!value.businessName || !value.product || !value.category || !value.contactNumber) {
                return res.status(422).json('Vendor-specific fields must be provided');
            }
        }

        const hashedPassword = bcrypt.hashSync(value.password, 10);
        await UserModel.create({
            ...value,
            password: hashedPassword
        });

        res.status(201).json('User registered successfully');
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        const user = await UserModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json('User does not exist');
        }

        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, role: user.role }, // Included role in the token payload
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'User logged in successfully',
            accessToken: token
        });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req, res, next) => {
    try {
        // Fetch user by ID from auth token
        const user = await UserModel
            .findById(req.auth.id)
            .select({ password: false }); // Exclude the password field

        // If the user doesn't exist, return a 404
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }



        // For example, include vendor-specific fields if the role is 'vendor'
        if (user.role === 'vendor') {
            res.json({
                ...user.toObject(),  // convert Mongoose model instance to plain object
                businessName: user.businessName,
                product: user.product,
                category: user.category,
                contactNumber: user.contactNumber
            });
        } else {
            // Return regular user profile for non-vendors
            res.json(user);
        }
    } catch (error) {
        next(error);
    }
};

export const getUserAdvert = async (req, res, next) => {
    try {
        const { title, category, price, limit = 0, skip = 0 } = req.query;
        let filter = {};

        if (title) {
            filter.title = { $regex: title, $options: 'i' };
        }
        if (category) {
            filter.category = category;
        }
        if (price) {
            filter.price = price;
        }

        // Fetch ads and populate vendor-specific fields from the User model
        const adverts = await AdvertModel
            .find({
                ...filter,
                user: req.auth.id
            })

            .populate({
                path: 'user',
                select: 'Product businessName category contactNumber' // Choose fields to populate
            })
            .limit(limit)
            .skip(skip);

        res.status(200).json(adverts);
    } catch (error) {
        next(error);

    }
}


export const logoutUser = (req, res, next) => {
    res.json('user logged out');
}

export const updateProfile = async (req, res, next) => {
    try {
        const { error, value } = updateProfileValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(req.auth.id, value, { new: true });
        if (!updatedUser) {
            return res.status(404).json('User not found');
        }

        res.json('User profile updated');
    } catch (error) {
        next(error);
    }
};

