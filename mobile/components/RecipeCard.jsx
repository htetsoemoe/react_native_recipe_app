import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'react-native'
import { useRouter } from 'expo-router'
import { COLORS } from '../constants/colors'
import { recipeCardStyles } from '../assets/styles/home.styles'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../redux/auth/authSelectors'


const RecipeCard = ({ recipe }) => {
    const router = useRouter()
    const user = useSelector(selectUser)

    return (
        <TouchableOpacity
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
        </TouchableOpacity>
    )
}

export default RecipeCard