import { Joi, validate } from "express-validation";

export const createFavoriteValidator = validate({
    body: Joi.object({
        recipeId: Joi.number().required().messages({
            "any.required": "recipeId is required",
            "number.recipeId": "recipeId must be a number",
        }),
        title: Joi.string().required().messages({
            "any.required": "title is required",
            "string.title": "title must be a string",
        }),
        image: Joi.string().required().messages({
            "any.required": "image is required",
            "string.image": "image must be a string",
        }),
        cookTime: Joi.string().required().messages({
            "any.required": "cookTime is required",
            "string.cookTime": "cookTime must be a string",
        }),
        servings: Joi.string().required().messages({
            "any.required": "servings is required",
            "string.servings": "servings must be a string",
        })
    })
})