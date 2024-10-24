import Joi from "joi";;

export const addAdvertValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required()
});

export const updateAdvertVAlidator = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number(),
    category: Joi.string()
});

