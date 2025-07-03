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