import { expressjwt } from "express-jwt";
import { UserModel } from "../models/users.js";
import { permissions } from "../utils/rbac.js";

export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ['HS256'],
    requestProperty: 'auth',
    isRevoked: async (req, token) => {
        try {
            const user = await UserModel.findById(token.payload.id);
            
            if (!user) {
                return true; // Token is invalid if user doesn't exist
            }

            // Populate req.auth with id and role
            req.auth = {
                id: user._id,
                role: user.role
            };

            return false; // Token is valid
        } catch (error) {
            return true; // Invalid token
        }
    }
});

// isVendor Middleware
export const isVendor = (req, res, next) => {
    // Check if the authenticated user exists and has a role of 'vendor'
    if (req.auth && req.auth.role === 'vendor') {
        return next(); // Proceed if the user is a vendor
    }
    
    // If not a vendor, deny access
    return res.status(403).json({ message: 'Access denied. Only vendors can perform this action.' });
};


export const hasPermission = (action) => {
    return async (req, res, next) => {
        try {
            const user = await UserModel.findById(req.auth.id);

            const permission = permissions.find(value => value.role === user.role);
            if (!permission) {
                return res.status(403).json('No permission found!');
            }
            if (permission.actions.includes(action)) {
                next();
            } else {
                res.status(403).json('Action not allowed!');
            }
        } catch (error) {
            next(error);
        }
    };
};

// middlewares/validate.js
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(422).json({ error: error.details });
        }
        next();
    };
};

export default validate;
