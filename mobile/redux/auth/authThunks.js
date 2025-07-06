import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiRoutes } from '../../common/apiRoutes';
import { STORAGE_KEYS } from '../../common/commons';
import { setToken, setUser, clearAuth } from './authSlice';

/**
 * Sign Up Thunk
 */
export const signUp = createAsyncThunk(
    'auth/signUp',
    async (userData, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post(`${apiRoutes.baseUrl}${apiRoutes.signup}`, userData);
            const { name, email } = response.data.user;

            await AsyncStorage.setItem(STORAGE_KEYS.EMAIL, email); // for OTP verification

            dispatch(setUser({ name, email }));
            return { name, email };
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                'Sign up failed';
            return rejectWithValue(message);
        }
    }
);

/**
 *  Verify OTP Thunk
 */
export const verifyOTP = createAsyncThunk(
    'auth/verifyOTP',
    async (otp, { rejectWithValue, dispatch }) => {
        try {
            const email = await AsyncStorage.getItem(STORAGE_KEYS.EMAIL);
            if (!email) {
                return rejectWithValue('Email not found in storage');
            }
            // console.log(`email: ${email}, typeof email: ${typeof email}`);
            // console.log(`otp: ${otp}, typeof otp: ${typeof otp}`);

            const response = await axios.post(`${apiRoutes.baseUrl}${apiRoutes.verifyOtp}`, { email, otp });
            const { token, user } = response.data.data;
            await AsyncStorage.multiSet([
                [STORAGE_KEYS.TOKEN, token],
                [STORAGE_KEYS.EMAIL, ""], // Clear email from storage
            ]);
            dispatch(setToken(token));
            dispatch(setUser(user));

            return { token, user };
            /*
                Caught error: Cannot read property 'user' of undefined
                This happens after a successful dispatch(signUp()).unwrap(), 
                so the problem is how you're handling unwrap() — it's expecting a return value, 
                but your verifyOTP thunk does not return anything.

                await dispatch(verifyOTP(otp)).unwrap();
                But your verifyOTP thunk does not return anything, so unwrap() tries to read .user from undefined.

                Solution: Return user data in the thunk
                Update your thunk to return the needed values, so that unwrap() gets a defined result.

                Fix this line in verifyOTP:

                dispatch(setToken(token));
                dispatch(setUser(user));
                return { token, user }; // ✅ return something meaningful
            */
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                'OTP verification failed';
            return rejectWithValue(message);
        }
    }
)


/**
 * Sign In Thunk (already refactored previously)
 */
export const signIn = createAsyncThunk(
    'auth/signIn',
    async (credentials, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post(`${apiRoutes.baseUrl}${apiRoutes.signin}`, credentials);
            const { token, user } = response.data.data;

            await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
            dispatch(setToken(token));
            dispatch(setUser(user));

            return user;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                'Sign in failed';
            return rejectWithValue(message);
        }
    }
);

/**
 * Logout Thunk
 */
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
            dispatch(clearAuth());
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                'Logout failed';
            return rejectWithValue(message);
        }
    }
);
