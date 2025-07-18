import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'react-native'
import { useRouter } from 'expo-router'
import { COLORS } from '../constants/colors'
import { recipeCardStyles, recipeCardButtonStyles } from '../assets/styles/home.styles'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../redux/auth/authSelectors'
import { authStyles } from '../assets/styles/auth.styles'
import { selectLoading } from '../redux/auth/authSelectors'
import { addFavoriteThunk } from '../redux/favorites/favoriteThunks'
import { setError, setLoading } from '../redux/favorites/favoriteSlice';
import Toast from 'react-native-toast-message'

const RecipeCard = ({ recipe }) => {
    const router = useRouter()
    const user = useSelector(selectUser)
    const loading = useSelector(selectLoading)
    const dispatch = useDispatch()

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
                text2 = error.message
            }
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2:  text2,
                visibilityTime: 10000,
                position: 'bottom',
            })
        }
    }

    // console.log(`recipeId: ${recipe.id}`)
    const handleDetails = (recipeId) => {
        router.push(`/recipe/${recipeId}`)
    }

    return (
        <View
            style={recipeCardStyles.container}
            activeOpacity={0.8}
        >
            <View style={recipeCardStyles.imageContainer}>
                <Image
                    source={{ uri: recipe.image }}
                    style={recipeCardStyles.image}
                    contentFit="cover"
                    transition={300}
                />
            </View>

            <View style={recipeCardStyles.content}>
                <Text style={recipeCardStyles.title} numberOfLines={2}>
                    {recipe.name}
                </Text>
                {recipe.description && (
                    <Text style={recipeCardStyles.description} numberOfLines={2}>
                        {recipe.description}
                    </Text>
                )}
            </View>

            <View style={recipeCardStyles.footer}>
                {recipe.cookTime && (
                    <View style={recipeCardStyles.timeContainer}>
                        <Ionicons name="time-outline" size={14} color={COLORS.textLight} />
                        <Text style={recipeCardStyles.timeText}>{recipe.cookTime}</Text>
                    </View>
                )}
                {recipe.servings && (
                    <View style={recipeCardStyles.servingsContainer}>
                        <Ionicons name="people-outline" size={14} color={COLORS.textLight} />
                        <Text style={recipeCardStyles.servingsText}>{recipe.servings}</Text>
                    </View>
                )}
            </View>

            {/* DETAIL AND FAVORITE BUTTONS */}
            <View
                style={recipeCardButtonStyles.container}
            >
                <TouchableOpacity
                    // style={authStyles.linkContainer}
                    style={[recipeCardButtonStyles.recipeCardButton, loading && recipeCardButtonStyles.buttonDisabled]}
                    onPress={() => handleDetails(recipe.id)}
                >
                    <Text style={recipeCardButtonStyles.linkText}>
                        <Text style={recipeCardButtonStyles.cardTextLink}>Details</Text>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[recipeCardButtonStyles.recipeCardButton, loading && recipeCardButtonStyles.buttonDisabled]}
                    onPress={handleAddFavorite}
                >
                    <Text style={recipeCardButtonStyles.linkText}>
                        <Text style={recipeCardButtonStyles.cardTextLink}>Add Favorite</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RecipeCard