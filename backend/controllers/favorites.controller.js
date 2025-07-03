import FavoritesService from "../services/favorites.service.js";

export const createFavorite = async (req, res) => {
    try {
        const { recipeId, title, image, cookTime, servings } = req.body;
        const userId = req.userId;

        const favoriteService = new FavoritesService();
        const favoriteData = {
            userId,
            recipeId,
            title,
            image,
            cookTime,
            servings,
        };
        const createdFavorite = await favoriteService.createFavorite(favoriteData);

        res.status(201).json({
            data: createdFavorite,
            message: "Favorite created successfully",
            success: true,
        });
    } catch (error) {
        console.log(`Error in createFavorite controller: ${error.message}`);
        return res.status(500).json({
            message: "Error in createFavorite controller",
            error: error.message,
        })
    }
}

export const getAllFavoritesByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const favoriteService = new FavoritesService();
        const favorites = await favoriteService.getAllFavoritesByUserId(userId);

        res.status(200).json({
            data: favorites,
            message: "Favorites retrieved successfully",
            success: true,
        });
    } catch (error) {
        console.log(`Error in getAllFavoritesByUserId controller: ${error.message}`);
        return res.status(500).json({
            message: "Error in getAllFavoritesByUserId controller",
            error: error.message,
        })
    }
}

export const deleteRecipeByRecipeIdUserId = async (req, res) => {
    try {
        const { userId, recipeId } = req.params;
        const doubleRecipeId = parseFloat(recipeId);

        const favoriteService = new FavoritesService();
        const favorites = await favoriteService.deleteRecipeByRecipeIdUserId(userId, doubleRecipeId);

        res.status(200).json({
            data: favorites,
            message: "Favorite deleted successfully",
            success: true,
        });
    } catch (error) {
        console.log(`Error in deleteRecipeByRecipeIdUserId controller: ${error.message}`);
        return res.status(500).json({
            message: "Error in deleteRecipeByRecipeIdUserId controller",
            error: error.message,
        })
    }
}