import { Joi, validate } from "express-validation";

export const signupValidator = validate({
    body: Joi.object({
        name: Joi.string().required().messages({
            "any.required": "Name is required",
            "string.name": "Name must be a string",
        }),
        username: Joi.string().max(20).required().messages({
            "any.required": "Username is required",
            "string.username": "Username must be a string",
            "string.max": "Username must be less than 20 characters",
        }),
        password: Joi.string().min(6).max(100).required().messages({
            "any.required": "Password is required",
            "string.password": "Password must be a string",
            "string.min": "Password must be at least 6 characters",
            "string.max": "Password must be less than 100 characters",
        }),
        confirmPassword: Joi.string().min(6).max(100).required().messages({
            "any.required": "Confirm password is required",
            "string.confirmPassword": "Confirm password must be a string",
            "string.min": "Confirm password must be at least 6 characters",
            "string.max": "Confirm password must be less than 100 characters",
        }),
        email: Joi.string().email().required().messages({
            "any.required": "email is required",
            "string.email": "email must be a valid email address",
        }),
    }),
})

export const signinValidator = validate({
    body: Joi.object({
        email: Joi.string().email().required().messages({
            "any.required": "email is required",
            "string.email": "email must be a valid email address",
        }),
        password: Joi.string().min(6).max(100).required().messages({
            "any.required": "Password is required",
            "string.password": "Password must be a string",
            "string.min": "Password must be at least 6 characters",
            "string.max": "Password must be less than 100 characters",
        }),
    }),
})