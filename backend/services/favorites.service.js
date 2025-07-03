import mongoose from "mongoose";
import favoritesSchema from "../models/favorites.model.js";

export default class FavoritesService {
    constructor() {
        this.favoritesCollectionName = "favorites";
        this.favoritesModel = mongoose.model(
            this.favoritesCollectionName,
            favoritesSchema
        )
    }

    async createFavorite(favoriteData) {
        // console.log(`In services: ${JSON.stringify(favoriteData)}`);
        return await this.favoritesModel.create(favoriteData);
    }

    async getAllFavoritesByUserId(userId) {
        return await this.favoritesModel.find({ userId });
    }

    async deleteRecipeByRecipeIdUserId(userId, recipeId) {
        return await this.favoritesModel.findOneAndDelete({ userId, recipeId });
    }
}