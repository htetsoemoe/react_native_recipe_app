import { View, Text, Image, TouchableOpacity } from 'react-native'
import { favoriteCardStyles, favoriteCardButtonStyles } from '../assets/styles/favorites.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants/colors'
import { selectLoading } from '../redux/auth/authSelectors'
import { useSelector } from 'react-redux'


const FavoriteCard = ({ favorite }) => {
    const loading = useSelector(selectLoading)

    return (
        <View
            style={favoriteCardStyles.container}
            activeOpacity={0.8}
        >
            <View style={favoriteCardStyles.imageContainer}>
                <Image
                    source={{ uri: favorite.image }}
                    style={favoriteCardStyles.image}
                    contentFit="cover"
                    transition={300}
                />
            </View>

            <View style={favoriteCardStyles.content}>
                <Text style={favoriteCardStyles.title} numberOfLines={2}>
                    {favorite.title}
                </Text>
            </View>

            <View style={favoriteCardStyles.footer}>
                {favorite.cookTime && (
                    <View style={favoriteCardStyles.timeContainer}>
                        <Ionicons name="time-outline" size={14} color={COLORS.textLight} />
                        <Text style={favoriteCardStyles.timeText}>{favorite.cookTime}</Text>
                    </View>
                )}
                {favorite.servings && (
                    <View style={favoriteCardStyles.servingsContainer}>
                        <Ionicons name="people-outline" size={14} color={COLORS.textLight} />
                        <Text style={favoriteCardStyles.servingsText}>{favorite.servings}</Text>
                    </View>
                )}
            </View>

            {/* DETAIL AND FAVORITE BUTTONS */}
            <View
                style={favoriteCardButtonStyles.container}
            >
                <TouchableOpacity
                    // style={authStyles.linkContainer}
                    style={[favoriteCardButtonStyles.recipeDeleteButton, loading && favoriteCardButtonStyles.buttonDisabled]}
                >
                    <Text style={favoriteCardButtonStyles.linkText}>
                        <Text style={favoriteCardButtonStyles.cardDeleteTextLink}>Delete</Text>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[favoriteCardButtonStyles.recipeCardButton, loading && favoriteCardButtonStyles.buttonDisabled]}
                >
                    <Text style={favoriteCardButtonStyles.linkText}>
                        <Text style={favoriteCardButtonStyles.cardTextLink}>Details</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FavoriteCard