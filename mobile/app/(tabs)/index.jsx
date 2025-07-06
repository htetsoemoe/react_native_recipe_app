import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { useRouter } from 'expo-router'
import { authStyles } from '../../assets/styles/auth.styles'
import { selectToken, selectUser } from '../../redux/auth/authSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { logout } from '../../redux/auth/authThunks';

const index = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
        // router.push("/(auth)/SignIn")
    }

    useAuthRedirect()

    return (
        <View style={{ marginTop: 100 }}>
            <Text>This is recipe lists.</Text>

            {/* Logout Link */}
            <TouchableOpacity  
                onPress={handleLogout}
            >
                <Text style={authStyles.linkText}>
                    <Text style={authStyles.link}>Logout</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default index