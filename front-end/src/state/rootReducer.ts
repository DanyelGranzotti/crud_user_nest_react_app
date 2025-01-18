import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/state/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
