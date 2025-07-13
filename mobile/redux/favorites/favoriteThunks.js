import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../common/axiosInstance";
import { apiRoutes } from '../../common/apiRoutes';
import { STORAGE_KEYS } from '../../common/commons';
import { addFavorite, removeFavorite } from "./favoriteSlice";

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
            dispatch(addFavorite(response.data.data));
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