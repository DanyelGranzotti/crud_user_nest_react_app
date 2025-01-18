import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { User } from "../../user/types/user";

interface AuthState {
  token: string | null;
  user: User | null;
  status: string;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  status: "idle",
  error: null,
};

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  const response = await axios.post<{ token: string }>(
    API_ENDPOINTS.AUTH.REFRESH
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.token = action.payload.token;
    });
  },
});

export const { login, logout } = authSlice.actions;
export const selectIsAuthenticated = (state: any) => !!state.auth.token;

export default authSlice.reducer;
