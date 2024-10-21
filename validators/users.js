import Joi from 'joi';

export const registerUserValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
    // role: Joi.string().valid('user','vendor')
});

export const loginUserValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
});


export const updateProfileValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
});

