import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../common/axiosInstance";
import { apiRoutes } from '../../common/apiRoutes';
import { STORAGE_KEYS } from '../../common/commons';
import { addFavorite, removeFavorite } from "./favoriteSlice";
import { selectUser } from "../auth/authSelectors";

/**
 * Add Favorite Thunk
 */
export const addFavoriteThunk = createAsyncThunk(
    'favorites/addFavorite',
    async (recipeData, { rejectWithValue, dispatch }) => {
        try {
            console.log(`recipeData in addFavoriteThunk: ${JSON.stringify(recipeData)}`);
            const response = await axiosInstance.post(
                `${apiRoutes.baseUrl}${apiRoutes.addFavorite}`,
                JSON.stringify(recipeData) 
            );
            console.log(`response in addFavoriteThunk: ${JSON.stringify(response.data.data)}`);
            // dispatch(addFavorite(response.data.data)); // show duplicate favorite card
            return response.data.data;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                'Failed to add favorite';
            return rejectWithValue(message);
        }
    }
)

/**
 * Get all Favorites Thunk
 */
export const getAllFavoritesThunk = createAsyncThunk(
    'favorites/getAllFavorites',
    async (userId, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosInstance.get(
                `${apiRoutes.baseUrl}${apiRoutes.getFavorites}${userId}`
            );
            console.log(`response in getAllFavoritesThunk: ${JSON.stringify(response.data.data)}`);
            dispatch(addFavorite(response.data.data));
            return response.data.data;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                'Failed to get all favorites';
            return rejectWithValue(message);
        }
    }
)

/**
 * Delete Favorite Thunk
 * 
 * /favorites/user/:userId/recipe/:recipeId
 */
export const deleteFavoriteThunk = createAsyncThunk(
    'favorites/deleteFavorite',
    async (favoriteData, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosInstance.delete(
                `${apiRoutes.baseUrl}${apiRoutes.deleteFavorite}user/${favoriteData.userId}/recipe/${favoriteData.recipeId}`
            );
            console.log(`response in deleteFavoriteThunk: ${JSON.stringify(response.data.data)}`);
            dispatch(removeFavorite(response.data.data));
            return response.data.data;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                'Failed to delete favorite';
            return rejectWithValue(message);
        }
    }
)