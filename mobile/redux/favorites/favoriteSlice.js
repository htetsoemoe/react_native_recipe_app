import { createSlice } from "@reduxjs/toolkit";
import { addFavoriteThunk } from "./favoriteThunks";

const initialState = {
    favorites: [],
    loading: false,
    error: null,
};

export const favoriteSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(
                (favorite) => favorite.id !== action.payload
            );
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFavoriteThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFavoriteThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites.push(action.payload);
                state.error = null;
            })
            .addCase(addFavoriteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { addFavorite, removeFavorite, setError, setLoading } = favoriteSlice.actions;
export default favoriteSlice.reducer;