import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { useRouter } from 'expo-router'
import { authStyles } from '../../assets/styles/auth.styles'


const index = () => {
    const router = useRouter()

    return (
        <View>
            <Text>This is recipe lists.</Text>

            {/* Sign In Link */}
            <TouchableOpacity
                
                style={{ marginTop: 100 }}
                onPress={() => router.push("/(auth)/SignIn")}
            >
                <Text style={authStyles.linkText}>
                    Already have an account? <Text style={authStyles.link}>Sign In</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default index