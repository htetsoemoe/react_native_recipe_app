import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authSlice } from './authSlice';
import { apiRoutes } from '../../common/apiRoutes';
import { STORAGE_KEYS } from '../../common/commons';

const { setUser, setToken, setLoading, setError, clearAuth } = authSlice.actions;

// Signup Thunk
export const signUp = (userData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.post(`${apiRoutes.baseUrl}${apiRoutes.signup}`, userData);
        const { name, email } = response.data.user;

        dispatch(setLoading(false));
        await AsyncStorage.setItem(STORAGE_KEYS.EMAIL, email); // store email temporarily in AsyncStorage for OTP verification
        dispatch(setUser({ name, email }));

        return response.data;
    } catch (error) {
        dispatch(setError(error.response?.data?.message || 'Sign up failed'));
        dispatch(setLoading(false));
        throw error;
    }
}

// Signin Thunk
export const signIn = (credentials) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.post(`${apiRoutes.baseUrl}${apiRoutes.signin}`, credentials);

        const { token, user } = response.data;
        await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
        dispatch(setToken(token));
        dispatch(setUser(user));
        dispatch(setLoading(false));
        return response.data;
    } catch (error) {
        dispatch(setError(error.response?.data?.message || 'Sign in failed'));
        dispatch(setLoading(false));
        throw error;
    }
}

// Logout Thunk
export const logout = () => async (dispatch) => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
        dispatch(clearAuth());
    } catch (error) {
        dispatch(setError(error.response?.data?.message || 'Logout failed'));
    }
}