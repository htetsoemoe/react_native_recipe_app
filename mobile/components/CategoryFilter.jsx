import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Image } from 'react-native'
import { homeStyles } from '../assets/styles/home.styles'

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <View style={homeStyles.categoryFilterContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={homeStyles.categoryFilterScrollContent}
            >
                {categories.map((category) => {
                    const isSelected = selectedCategory === category.name
                    return (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                homeStyles.categoryButton,
                                isSelected && homeStyles.selectedCategory,
                            ]}
                            onPress={() => onSelectCategory(category.name)}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={{ uri: category.image }}
                                style={[
                                    homeStyles.categoryImage,
                                    isSelected && homeStyles.selectedCategoryImage,
                                ]}
                            />
                            <Text
                                style={[
                                    homeStyles.categoryText,
                                    isSelected && homeStyles.selectedCategoryText,
                                ]}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default CategoryFilter