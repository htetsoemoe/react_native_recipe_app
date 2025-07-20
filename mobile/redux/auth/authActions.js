export const setUser = (state, action) => {
    state.user = action.payload;
}

export const setToken = (state, action) => {
    state.token = action.payload;
}

export const clearAuth = (state) => {
    state.user = null;
    state.token = null;
    state.error = null;
    state.loading = false;
}