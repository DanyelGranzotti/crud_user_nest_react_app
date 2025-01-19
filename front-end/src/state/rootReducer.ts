import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/state/authSlice";
import themeReducer from "./global/themeSlice";

/**
 * Combina os reducers de autenticação e tema em um único rootReducer.
 */
const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

export default rootReducer;
