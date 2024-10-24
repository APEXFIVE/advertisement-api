import Joi from 'joi';

export const registerUserValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('user', 'vendor').default('user'), // Optional role field, default to 'user'

    // Vendor-specific fields, only required if the role is 'vendor'
    businessName: Joi.when('role', {
        is: 'vendor',
        then: Joi.string().required(),
        otherwise: Joi.forbidden()  // Not allowed for regular users
    }),
    product: Joi.when('role', {
        is: 'vendor',
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
    }),
    category: Joi.when('role', {
        is: 'vendor',
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
    }),
    contactNumber: Joi.when('role', {
        is: 'vendor',
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
    })
});

export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


export const updateProfileValidator = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    avatar: Joi.string(),  // Optional field for the user avatar
    role: Joi.string().valid('user', 'vendor', 'admin'), // Allow role updates if necessary

    // Vendor-specific fields
    businessName: Joi.when('role', {
        is: 'vendor',
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
    }),
    product: Joi.when('role', {
        is: 'vendor',
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
    }),
    category: Joi.when('role', {
        is: 'vendor',
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
    }),
    contactNumber: Joi.when('role', {
        is: 'vendor',
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
    })
}).min(1); // Ensure at least one field is being updated



