import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from 'react-native'

const Recipe = () => {
    const { id } = useLocalSearchParams();
    console.log(`mealId: ${id}, typeof: ${typeof id}`)
    const router = useRouter();

    return (
        <View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/')}>
                <Text>Home</Text>
            </TouchableOpacity>

            <Text>Recipe Details Page</Text>
            <Text>Recipe ID: {id}</Text>
        </View>
    )
}

export default Recipe
