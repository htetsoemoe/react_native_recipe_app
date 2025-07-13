import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import favoriteReducer from "./favorites/favoriteSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    favorites: favoriteReducer,
});

export default rootReducer;