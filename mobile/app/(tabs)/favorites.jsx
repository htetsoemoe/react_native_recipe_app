import { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { favoritesStyles } from '../../assets/styles/favorites.styles'
import UserInfoNavbar from '../../components/UserInfoNavbar'
import { useSelector, useDispatch } from 'react-redux'
import { getAllFavoritesThunk } from '../../redux/favorites/favoriteThunks'
import { selectUser, selectLoading } from '../../redux/auth/authSelectors'
import LoadingSpinner from '../../components/LoadingSpinner'
import FavoriteCard from '../../components/FavoriteCard'


const favorites = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites.favorites)
  const user = useSelector(selectUser)
  console.log(`user in favorites: ${JSON.stringify(user)}`)
  // console.log(`userId in favorites: ${user._id} type: ${typeof user._id}`)

  const loading = useSelector(selectLoading)

  useEffect(() => {
    dispatch(getAllFavoritesThunk(user._id))
  }, [])
  console.log(`favorites: ${JSON.stringify(favorites)}`)

  return (
    <View style={favoritesStyles.container}>
      {/* User info navbar */}
      <UserInfoNavbar />

      <Text style={favoritesStyles.title}>Favorites</Text>

      {/* Favorites list */}
      {loading ? (
        <View>
          <LoadingSpinner message="Loading favorites..." />
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <FavoriteCard
              favorite={item}
            />
          )}
          numColumns={2}
          columnWrapperStyle={favoritesStyles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={favoritesStyles.favoriteGrid}
          ListEmptyComponent={<NoResultsFound />}
        />
      )}
    </View>
  )
}

export default favorites

function NoResultsFound() {
  return (
    <View style={favoritesStyles.emptyState}>
      <Ionicons name="search-outline" size={64} color={COLORS.textLight} />
      <Text style={favoritesStyles.emptyTitle}>No favorites found</Text>
      <Text style={favoritesStyles.emptyDescription}>
        You have no favorites yet. Start adding some!
      </Text>
    </View>
  )
}