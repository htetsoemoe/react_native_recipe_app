import express from "express";
import { verifyToken } from "../utils/index.js";
import {
    createFavoriteValidator,
    getAllFavoritesByUserIdValidator,
    deleteRecipeByRecipeIdUserIdValidator,
} from "../validators/favorites.validator.js";
import {
    createFavorite,
    getAllFavoritesByUserId,
    deleteRecipeByRecipeIdUserId,
} from "../controllers/favorites.controller.js";

const favoriteRouter = express.Router();

favoriteRouter.use(verifyToken);
favoriteRouter.post('/', createFavoriteValidator, createFavorite);
favoriteRouter.get('/:userId', getAllFavoritesByUserIdValidator, getAllFavoritesByUserId);
favoriteRouter.delete('/user/:userId/recipe/:recipeId', deleteRecipeByRecipeIdUserIdValidator, deleteRecipeByRecipeIdUserId);

export default favoriteRouter;