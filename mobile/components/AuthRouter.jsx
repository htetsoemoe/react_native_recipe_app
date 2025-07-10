import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectToken, selectLoading } from '../redux/auth/authSelectors'
import { setLoading, setToken } from '../redux/auth/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_KEYS } from '../common/commons';

const AuthRouter = ({ children }) => {
    const dispatch = useDispatch()
    const [isAppReady, setIsAppReady] = useState(false)

    useEffect(() => {
        const loadAuth = async () => {
            try {
                const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN)
                if (token) {
                    dispatch(setToken(token))
                }
            } catch (error) {
                console.log(`Error loading token from storage: ${error}`)
            } finally {
                dispatch(setLoading(false))
                setIsAppReady(true)
            }
        }

        loadAuth()
    }, [dispatch])

    if (!isAppReady) return null

    return (
        <>{children}</>
    )
}

export default AuthRouter