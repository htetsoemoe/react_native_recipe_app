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

export const getAllFavoritesByUserIdValidator = validate({
    params: Joi.object({
        userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
            .required().messages({
                "any.required": "user id is required",
                "string.pattern.base": "user id must be a valid MongoDB ID",
            }),
    })
})

export const deleteRecipeByRecipeIdUserIdValidator = validate({
    params: Joi.object({
        userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
            .required().messages({
                "any.required": "user id is required",
                "string.pattern.base": "user id must be a valid MongoDB ID",
            }),
        recipeId: Joi.number().required().messages({
            "any.required": "recipe id is required",
            "number.recipeId": "recipe id must be a number",
        }),
    })
})