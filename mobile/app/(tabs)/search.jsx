import { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { MealAPI } from '../../services/mealAPI'
import { useDebounce } from '../../hooks/useDebounce'
import { searchStyles } from '../../assets/styles/search.styles'
import { COLORS } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import RecipeCard from '../../components/RecipeCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import UserInfoNavbar from '../../components/UserInfoNavbar'

const search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  // Get the debounced search query
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  console.log(`debouncedSearchQuery: ${debouncedSearchQuery}`)

  // Perform the search when no search query is provided
  // search by name first, then by ingredients if no results are found
  // the debounced query changes when the user stops typing
  const performSearch = async (query) => {
    // if no search query
    if (!query.trim()) {
      const randomMeals = await MealAPI.getRandomMeals(12)
      return randomMeals
        .map((meal) => MealAPI.transformMealData(meal))
        .filter((meal) => meal !== null)
    }

    // search by recipe name first, then by ingredients if no results are found
    const nameResults = await MealAPI.searchMealsByName(query)
    let results = nameResults

    if (results.length === 0) {
      const ingredientResults = await MealAPI.filterByIngredient(query)
      results = ingredientResults
    }

    return results
      .slice(0, 12)
      .map((meal) => MealAPI.transformMealData(meal))
      .filter((meal) => meal !== null)
  }

  // load 12 random recipes on initial load
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const results = await performSearch('')
        setRecipes(results)
      } catch (error) {
        console.log(`Error loading initial data: ${error}`)
      } finally {
        setInitialLoading(false)
      }
    }

    loadInitialData()
  }, [])

  // perform search when the debounced query changes
  useEffect(() => {
    if (initialLoading) return // skip if initial loading

    const handleSearch = async () => {
      setIsLoading(true)

      try {
        const results = await performSearch(debouncedSearchQuery)
        setRecipes(results)
      } catch (error) {
        console.log(`Error searching for ${debouncedSearchQuery}: ${error}`)
      } finally {
        setIsLoading(false)
      }
    }

    handleSearch()
  }, [debouncedSearchQuery, initialLoading])

  if (initialLoading) return <LoadingSpinner message="Loading recipes..." />

  return (
    <View style={searchStyles.container}>
      {/* User info navbar */}
      <UserInfoNavbar />

      {/* Search bar */}
      <View style={searchStyles.searchSection}>
        <View style={searchStyles.searchContainer}>
          <Ionicons
            name='search'
            size={20}
            color={COLORS.textLight}
            style={searchStyles.searchIcon}
          />
          <TextInput
            style={searchStyles.searchInput}
            placeholder='Search recipes, ingredients...'
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType='search'
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")} style={searchStyles.clearButton}>
              <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Display recipes */}
      <View style={searchStyles.resultsSection}>
        <View style={searchStyles.resultsHeader}>
          <Text style={searchStyles.resultsTitle}>
            {searchQuery ? `Results for "${searchQuery}"` : "Popular recipes"}
          </Text>
          <Text style={searchStyles.resultsCount}>{recipes.length} found</Text>
        </View>

        {isLoading ? (
          <View>
            <LoadingSpinner message="Searching recipes..." size="small" />
          </View>
        ) : (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            numColumns={2}
            columnWrapperStyle={searchStyles.row}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={searchStyles.recipesGrid}
            ListEmptyComponent={<NoResultsFound />}
          />
        )}
      </View>
    </View>
  )
}

export default search

function NoResultsFound() {
  return (
    <View style={searchStyles.emptyState}>
      <Ionicons name="search-outline" size={64} color={COLORS.textLight} />
      <Text style={searchStyles.emptyTitle}>No recipes found</Text>
      <Text style={searchStyles.emptyDescription}>
        Try adjusting your search or try different keywords
      </Text>
    </View>
  )
}