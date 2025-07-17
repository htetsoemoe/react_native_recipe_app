import { View, Text, Image, TouchableOpacity } from 'react-native'
import { favoriteCardStyles, favoriteCardButtonStyles } from '../assets/styles/favorites.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants/colors'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFavoriteThunk, getAllFavoritesThunk } from '../redux/favorites/favoriteThunks'
import { selectUser, selectLoading } from '../redux/auth/authSelectors'
import { setLoading, setError } from '../redux/favorites/favoriteSlice'
import Toast from 'react-native-toast-message'

const FavoriteCard = ({ favorite }) => {
    const loading = useSelector(selectLoading)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const handleRemoveFavorite = async () => {
        try {
            const favoriteData = {
                userId: user._id,
                recipeId: favorite.recipeId,
            }
            await dispatch(deleteFavoriteThunk(favoriteData)).unwrap()
            dispatch(getAllFavoritesThunk(user._id))
        } catch (error) {
            console.log(`error in handleRemoveFavorite: ${error}`)
            setError(error)
            let text2 = ''
            if (typeof error === 'string') {
                text2 = error
            } else {
                text2 = error.message
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

            {/* DETAIL AND REMOVE BUTTONS */}
            <View
                style={favoriteCardButtonStyles.container}
            >
                <TouchableOpacity
                    // style={authStyles.linkContainer}
                    style={[favoriteCardButtonStyles.recipeDeleteButton, loading && favoriteCardButtonStyles.buttonDisabled]}
                    onPress={handleRemoveFavorite}
                >
                    <Text style={favoriteCardButtonStyles.linkText}>
                        <Text style={favoriteCardButtonStyles.cardDeleteTextLink}>Remove</Text>
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