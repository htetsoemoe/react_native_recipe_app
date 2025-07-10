const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

export const MealAPI = {
    // Search for meals by name
    searchMealsByName: async (query) => {
        try {
            const response = await fetch(`${BASE_URL}search.php?s=${encodeURIComponent(query)}`);
            const data = await response.json();
            return data.meals || [];
        } catch (error) {
            console.log(`Error fetching meals by name: ${error}`);
            return [];
        }
    },

    // Search a meal by ID
    getMealById: async (mealId) => {
        try {
            const response = await fetch(`${BASE_URL}/lookup.php?i=${mealId}`);
            const data = await response.json();
            return data.meals ? data.meals[0] : null;
        } catch (error) {
            console.log(`Error fetching meal by ID: ${error}`);
            return null
        }
    },

    // Get a random meal
    getRandomMeal: async () => {
        try {
            const response = await fetch(`${BASE_URL}/random.php`);
            const data = await response.json();
            return data.meals ? data.meals[0] : null;
        } catch (error) {
            console.log(`Error fetching random meal: ${error}`);
            return null;
        }
    },

    // Get multiple random meals
    getRandomMeals: async (count = 6) => {
        try {
            const promises = Array(count).fill().map(() => MealAPI.getRandomMeal());
            const meals = await Promise.all(promises);
            return meals.filter(meal => meal !== null);
        } catch (error) {
            console.log(`Error fetching random meals: ${error}`);
            return [];
        }
    },

    // Get all categories
    getCategories: async () => {
        try {
            const response = await fetch(`${BASE_URL}/categories.php`);
            const data = await response.json();
            return data.categories || [];
        } catch (error) {
            console.log(`Error fetching categories: ${error}`);
            return [];
        }
    },

    // Filter by main ingredient
    filterByIngredient: async (ingredient) => {
        try {
            const response = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
            const data = await response.json();
            return data.meals || [];
        } catch (error) {
            console.log(`Error filtering by ingredient: ${error}`);
            return [];
        }
    },

    // Filter by category
    filterByCategory: async (category) => {
        try {
            const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
            const data = await response.json();
            return data.meals || [];
        } catch (error) {
            console.log(`Error filtering by category: ${error}`);
            return [];
        }
    },

    // Transform TheMealDB API response to our app format
    transformMealData: (meal) => {
        if (!meal) return null;

        // Extract ingredients and measurements
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measurement = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                const measurementText = measurement && measurement.trim() ?
                    `${measurement.trim()} ` : "";
                ingredients.push(`${measurementText}${ingredient.trim()}`);
            }
        }

        // Extract instructions
        const instructions = meal.strInstructions
            ? meal.strInstructions.split(/\r?\n/).filter(line => line.trim())
            : [];

        return {
            id: meal.idMeal,
            name: meal.strMeal,
            description: meal.strInstructions
                ? meal.strInstructions.substring(0, 120) + "..."
                : "Delicious meal description",
            image: meal.strMealThumb,
            cookTime: "30 minutes",
            servings: 4,
            category: meal.strCategory || "Main Course",
            area: meal.strArea,
            ingredients,
            instructions,
            originalData: meal,
        }
    }
}