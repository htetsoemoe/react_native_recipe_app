import React, { useState, useEffect, use } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    RefreshControl,
    ScrollView,
    FlatList,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { authStyles } from '../../assets/styles/auth.styles'
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { logout } from '../../redux/auth/authThunks';
import { MealAPI } from '../../services/mealAPI';
import { homeStyles } from '../../assets/styles/home.styles';
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import RecipeCard  from '../../components/RecipeCard';

const index = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [recipes, setRecipes] = useState([])
    const [categories, setCategories] = useState([])
    const [featureRecipe, setFeaturedRecipe] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

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

    useEffect(() => {
        loadData()
    }, [])
    console.log(`recipes`, recipes)

    const handleLogout = () => {
        dispatch(logout())
    }

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
                {/* ANIMAL ICONS */}
                <View style={homeStyles.welcomeSection}>
                    <Image
                        source={require("../../assets/images/lamb.png")}
                        style={{
                            width: 100,
                            height: 100,
                        }}
                    />
                    <Image
                        source={require("../../assets/images/chicken.png")}
                        style={{
                            width: 100,
                            height: 100,
                        }}
                    />
                    <Image
                        source={require("../../assets/images/pork.png")}
                        style={{
                            width: 100,
                            height: 100,

                        }}
                    />
                    <View style={{ marginTop: 100 }}>

                        <TouchableOpacity
                            onPress={handleLogout}
                        >
                            <Text style={authStyles.linkText}>
                                <Text style={authStyles.link}>Logout</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

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