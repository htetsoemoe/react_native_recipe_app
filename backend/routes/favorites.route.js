import express from "express";
import { verifyToken } from "../utils/index.js";
import {
    createFavoriteValidator,
} from "../validators/favorites.validator.js";
import {
    createFavorite
} from "../controllers/favorites.controller.js";

const favoriteRouter = express.Router();

favoriteRouter.use(verifyToken);
favoriteRouter.post('/', createFavoriteValidator, createFavorite);

export default favoriteRouter;