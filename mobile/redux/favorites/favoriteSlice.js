import { createSlice } from "@reduxjs/toolkit";
import { addFavoriteThunk, getAllFavoritesThunk, deleteFavoriteThunk } from "./favoriteThunks";

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
                (favorite) => favorite.id !== action.payload.id // <=== change this line
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
            })

            // --- Get All Favorites ---
            .addCase(getAllFavoritesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllFavoritesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload;
                state.error = null;
            })
            .addCase(getAllFavoritesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- Remove Favorite ---
            .addCase(deleteFavoriteThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFavoriteThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = state.favorites.filter(
                    (favorite) => favorite.id !== action.payload.id
                );
                state.error = null;
            })
            .addCase(deleteFavoriteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { addFavorite, removeFavorite, setError, setLoading } = favoriteSlice.actions;
export default favoriteSlice.reducer;