import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from "../../constants/colors";
import { WebView } from 'react-native-webview';

import { recipeDetailStyles } from "../../assets/styles/recipeDetails.styles";
import { MealAPI } from "../../services/mealAPI";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/authSelectors";
import { addFavoriteThunk } from "../../redux/favorites/favoriteThunks";
import { setError } from "../../redux/favorites/favoriteSlice";
import Toast from "react-native-toast-message";

const Recipe = () => {
    const { id } = useLocalSearchParams();
    console.log(`mealId: ${id}, typeof: ${typeof id}`)
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState(null);
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    // load recipe with id
    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            try {
                const recipeData = await MealAPI.getMealById(id);
                if (recipeData) {
                    const transformedRecipe = MealAPI.transformMealData(recipeData);

                    const recipeWithVideo = {
                        ...transformedRecipe,
                        youtubeUrl: recipeData.strYoutube || null,
                    };
                    setRecipe(recipeWithVideo);
                }
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe()
    }, [])
    console.log(`recipe with id: ${JSON.stringify(recipe)}`)

    const getYouTubeEmbedUrl = (url) => {
        // example url: https://www.youtube.com/watch?v=mTvlmY4vCug
        const videoId = url.split('v=')[1];
        return `https://www.youtube.com/embed/${videoId}`;
    }
    console.log(`youtubeUrl: ${recipe?.youtubeUrl}`)

    // Add to favorite
    const handleAddFavorite = async () => {
        try {
            const recipeData = {
                userId: user?._id,
                recipeId: recipe.id,
                title: recipe.name,
                image: recipe.image,
                cookTime: recipe.cookTime,
                servings: recipe.servings,
            }
            console.log(`recipeData: ${JSON.stringify(recipeData)}`)
            await dispatch(addFavoriteThunk(recipeData)).unwrap()
        } catch (error) {
            setError(error)
            console.log(`error: ${JSON.stringify(error)}`)
            let text2 = ''
            if (typeof error === 'string') {
                text2 = error
            } else {
                text2 = error?.message
            }
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: text2,
                visibilityTime: 10000,
                position: 'bottom',
            })
        }
    }

    return (
        <View style={recipeDetailStyles.container}>
            <ScrollView>
                {/* Header */}
                <View style={recipeDetailStyles.headerContainer}>
                    <View style={recipeDetailStyles.imageContainer}>
                        <Image
                            source={{ uri: recipe?.image }}
                            style={recipeDetailStyles.headerImage}
                            contentFit="cover"
                        />
                    </View>

                    <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)"]}
                        style={recipeDetailStyles.gradientOverlay}
                    />

                    <View style={recipeDetailStyles.floatingButtons}>
                        <TouchableOpacity
                            style={recipeDetailStyles.floatingButton}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>

                    {/* Title */}
                    <View style={recipeDetailStyles.titleSection}>
                        <View style={recipeDetailStyles.categoryBadge}>
                            <Text style={recipeDetailStyles.categoryText}>
                                {recipe?.category}
                            </Text>
                        </View>
                        <Text style={recipeDetailStyles.recipeTitle}>
                            {recipe?.name}
                        </Text>
                        {recipe?.area && (
                            <View style={recipeDetailStyles.locationRow}>
                                <Ionicons name="location" size={16} color={COLORS.white} />
                                <Text style={recipeDetailStyles.locationText}>
                                    {recipe?.area}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={recipeDetailStyles.contentSection}>
                    {/* Quick stats 1. Cook Time */}
                    <View style={recipeDetailStyles.statsContainer}>
                        <View style={recipeDetailStyles.statCard}>
                            <LinearGradient
                                colors={["#FF6B6B", "#FF8E53"]}
                                style={recipeDetailStyles.statIconContainer}
                            >
                                <Ionicons name="time" size={20} color={COLORS.white} />
                            </LinearGradient>
                            <Text style={recipeDetailStyles.statValue}>
                                {recipe?.cookTime}
                            </Text>
                            <Text style={recipeDetailStyles.statLabel}>
                                Prep Time
                            </Text>
                        </View>

                        {/* Quick stats 2. Servings */}
                        <View style={recipeDetailStyles.statCard}>
                            <LinearGradient
                                colors={["#4ECDC4", "#44A08D"]}
                                style={recipeDetailStyles.statIconContainer}
                            >
                                <Ionicons name="people" size={20} color={COLORS.white} />
                            </LinearGradient>
                            <Text style={recipeDetailStyles.statValue}>
                                {recipe?.servings}
                            </Text>
                            <Text style={recipeDetailStyles.statLabel}>
                                Servings
                            </Text>
                        </View>
                    </View>


                    {/* Youtube Video */}
                    {recipe?.youtubeUrl && (
                        <View style={recipeDetailStyles.sectionContainer}>
                            <View style={recipeDetailStyles.sectionTitleRow}>
                                {/* Icon */}
                                <LinearGradient
                                    colors={["#FF0000", "#CC0000"]}
                                    style={recipeDetailStyles.sectionIcon}
                                >
                                    <Ionicons name="play" size={16} color={COLORS.white} />
                                </LinearGradient>
                                <Text style={recipeDetailStyles.sectionTitle}>
                                    Video Tutorial
                                </Text>
                            </View>
                            <View style={recipeDetailStyles.videoCard}>
                                <WebView
                                    style={recipeDetailStyles.webview}
                                    source={{ uri: getYouTubeEmbedUrl(recipe?.youtubeUrl) }}
                                    allowsFullscreenVideo={true}
                                    mediaPlaybackRequiresUserAction={false}
                                />
                            </View>
                        </View>
                    )}

                    {/* Ingredients Section */}
                    <View style={recipeDetailStyles.sectionContainer}>
                        <View style={recipeDetailStyles.sectionTitleRow}>
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.primary + "80"]}
                                style={recipeDetailStyles.sectionIcon}
                            >
                                <Ionicons name="list" size={16} color={COLORS.white} />
                            </LinearGradient>

                            <Text style={recipeDetailStyles.sectionTitle}>Ingredients</Text>
                            <View style={recipeDetailStyles.countBadge}>
                                <Text style={recipeDetailStyles.countText}>
                                    {recipe?.ingredients.length}
                                </Text>
                            </View>
                        </View>

                        <View style={recipeDetailStyles.ingredientsGrid}>
                            {recipe?.ingredients.map((ingredient, index) => (
                                <View key={index} style={recipeDetailStyles.ingredientCard}>
                                    <View style={recipeDetailStyles.ingredientNumber}>
                                        <Text style={recipeDetailStyles.ingredientNumberText}>
                                            {index + 1}
                                        </Text>
                                    </View>
                                    <Text style={recipeDetailStyles.ingredientText}>{ingredient}</Text>
                                    <View>
                                        <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.textLight} />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Instructions Section */}
                    <View style={recipeDetailStyles.sectionContainer}>
                        <View style={recipeDetailStyles.sectionTitleRow}>
                            <LinearGradient
                                colors={["#9C27B0", "#673AB7"]}
                                style={recipeDetailStyles.sectionIcon}
                            >
                                <Ionicons name="book" size={16} color={COLORS.white} />
                            </LinearGradient>
                            <Text style={recipeDetailStyles.sectionTitle}>Instructions</Text>
                            <View style={recipeDetailStyles.countBadge}>
                                <Text style={recipeDetailStyles.countText}>
                                    {recipe?.instructions.length}
                                </Text>
                            </View>
                        </View>

                        <View style={recipeDetailStyles.instructionsContainer}>
                            {recipe?.instructions.map((instruction, index) => (
                                <View key={index} style={recipeDetailStyles.instructionCard}>
                                    <LinearGradient
                                        colors={[COLORS.primary, COLORS.primary + "80"]}
                                        style={recipeDetailStyles.stepIndicator}
                                    >
                                        <Text style={recipeDetailStyles.stepNumber}>{index + 1}</Text>
                                    </LinearGradient>
                                    <View style={recipeDetailStyles.instructionContent}>
                                        <Text style={recipeDetailStyles.instructionText}>
                                            {instruction}
                                        </Text>
                                        <View style={recipeDetailStyles.instructionFooter}>
                                            <Text style={recipeDetailStyles.instructionText}>
                                                Step {index + 1}
                                            </Text>
                                            <TouchableOpacity
                                                style={recipeDetailStyles.completeButton}
                                            >
                                                <Ionicons name="checkmark" size={16} color={COLORS.primary} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Add to Favorites Section */}
                    <TouchableOpacity
                        style={recipeDetailStyles.primaryButton}
                        onPress={handleAddFavorite}
                    >
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.primary + "CC"]}
                            style={recipeDetailStyles.buttonGradient}
                        >
                            <Ionicons name="heart" size={20} color={COLORS.white} />
                            <Text style={recipeDetailStyles.buttonText}>
                                Add to Favorites
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* <TouchableOpacity onPress={() => router.push('/(tabs)/')}>
                <Text>Home</Text>
            </TouchableOpacity>

            <Text>Recipe Details Page</Text>
            <Text>Recipe ID: {id}</Text> */}
        </View>
    )
}

export default Recipe
