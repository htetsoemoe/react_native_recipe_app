export const addFavorite = (state, action) => {
    state.favorites.push(action.payload);
}

export const removeFavorite = (state, action) => {
    state.favorites = state.favorites.filter(
        (favorite) => favorite.id !== action.payload.id // <=== change this line
    );
}