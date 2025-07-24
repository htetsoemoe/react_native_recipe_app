import { useState, useEffect, } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    RefreshControl,
    ScrollView,
    FlatList,
} from 'react-native'
import { MealAPI } from '../../services/mealAPI';
import { homeStyles } from '../../assets/styles/home.styles';
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import RecipeCard from '../../components/RecipeCard';
import CategoryFilter from '../../components/CategoryFilter'
import LoadingSpinner from '../../components/LoadingSpinner'
import UserInfoNavbar from '../../components/UserInfoNavbar'
import { useRouter } from 'expo-router';

const index = () => {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [recipes, setRecipes] = useState([])
    const [categories, setCategories] = useState([])
    const [featureRecipe, setFeaturedRecipe] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const router = useRouter()

    const loadData = async () => {
        try {
            setLoading(true)

            const [apiCategories, randomMeals, featureMeal] = await Promise.all([
                MealAPI.getCategories(),
                MealAPI.getRandomMeals(),
                MealAPI.getRandomMeal(),
            ])

            const transformedCategories = apiCategories.map((category, index) => ({
                id: index,
                name: category.strCategory,
                image: category.strCategoryThumb,
                description: category.strCategoryDescription,
            }))
            setCategories(transformedCategories)

            if (!selectedCategory) setSelectedCategory(transformedCategories[0].name)

            const transformedMeals = randomMeals
                .map((meal) => MealAPI.transformMealData(meal))
                .filter((meal) => meal !== null)
            setRecipes(transformedMeals)

            const transformedFeatured = MealAPI.transformMealData(featureMeal)
            setFeaturedRecipe(transformedFeatured)

        } catch (error) {
            console.log(`Error loading data: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await loadData()
        setRefreshing(false)
    }

    const loadCategoryData = async (category) => {
        try {
            const meals = await MealAPI.filterByCategory(category)
            const transformedMeals = meals
                .map((meal) => MealAPI.transformMealData(meal))
                .filter((meal) => meal !== null)
            setRecipes(transformedMeals)
        } catch (error) {
            console.log(`Error loading category data: ${error.message}`)
            setRecipes([])
        }
    }

    const handleCategorySelect = async (category) => {
        setSelectedCategory(category)
        await loadCategoryData(category)
    }

    useEffect(() => {
        loadData()
    }, [])
    // console.log(`recipes`, recipes)

    // Routing to details
    const handleDetails = (recipeId) => {
        router.push(`/recipe/${recipeId}`)
    }
   
    // Loading and not Refreshing
    if (loading && !refreshing) return <LoadingSpinner message='Loading delicious recipes...' />

    return (
        <View style={homeStyles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={COLORS.primary}
                    />
                }
                contentContainerStyle={homeStyles.scrollContent}
            >
                {/* USERNAME AND LOGOUT BUTTON */}
                <UserInfoNavbar />

                {/* FEATURED RECIPE */}
                {featureRecipe && (
                    <View style={homeStyles.featuredSection}>
                        <TouchableOpacity
                            style={homeStyles.featuredCard}
                            activeOpacity={0.9}
                            onPress={() => handleDetails(featureRecipe.id)}
                        >
                            <View style={homeStyles.featuredImageContainer}>
                                <Image
                                    source={{ uri: featureRecipe.image }}
                                    style={homeStyles.featuredImage}
                                    contentFit="cover"
                                    transition={500}
                                />
                                <View style={homeStyles.featuredOverlay}>
                                    <View style={homeStyles.featuredBadge}>
                                        <Text style={homeStyles.featuredBadgeText}>Featured</Text>
                                    </View>

                                    <View style={homeStyles.featuredContent}>
                                        <Text style={homeStyles.featuredTitle} numberOfLines={2}>
                                            {featureRecipe.name}
                                        </Text>

                                        <View style={homeStyles.featuredMeta}>
                                            <View style={homeStyles.metaItem}>
                                                <Ionicons name="time-outline" size={16} color={COLORS.white} />
                                                <Text style={homeStyles.metaText}>{featureRecipe.cookTime}</Text>
                                            </View>
                                            <View style={homeStyles.metaItem}>
                                                <Ionicons name="people-outline" size={16} color={COLORS.white} />
                                                <Text style={homeStyles.metaText}>{featureRecipe.servings}</Text>
                                            </View>
                                            <View style={homeStyles.metaItem}>
                                                <Ionicons name="location-outline" size={16} color={COLORS.white} />
                                                <Text style={homeStyles.metaText}>{featureRecipe.area}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}

                {/* CATEGORIES */}
                {categories.length > 0 && (
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategorySelect}
                    />
                )}

                {/* RECIPES */}
                <View style={homeStyles.recipesSection}>
                    <View style={homeStyles.sectionHeader}>
                        <Text style={homeStyles.sectionTitle}>{selectedCategory}</Text>
                    </View>

                    {recipes.length > 0 ? (
                        <FlatList
                            data={recipes}
                            renderItem={({ item }) => (
                                <RecipeCard recipe={item} />
                            )}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            columnWrapperStyle={homeStyles.row}
                            contentContainerStyle={homeStyles.recipesGrid}
                            scrollEnabled={false}
                        />
                    ) : (
                        <View style={homeStyles.emptyState}>
                            <Ionicons name="restaurant-outline" size={64} color={COLORS.textLight} />
                            <Text style={homeStyles.emptyTitle}>No recipes found</Text>
                            <Text style={homeStyles.emptyDescription}>Try a different category</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

export default index