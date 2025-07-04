import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearAuth: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
        }
    }
})

export const { setUser, setToken, setLoading, setError, clearAuth } = authSlice.actions;
export default authSlice.reducer;