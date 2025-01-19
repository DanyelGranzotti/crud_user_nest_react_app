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

/**
 * Estado inicial da autenticação.
 */
const initialState: AuthState = {
  token: null,
  user: null,
  status: "idle",
  error: null,
};

/**
 * Thunk para atualizar o token de autenticação.
 */
export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  const response = await axios.post<{ token: string }>(
    API_ENDPOINTS.AUTH.REFRESH
  );
  return response.data;
});

/**
 * Slice de autenticação que gerencia o estado de autenticação do usuário.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Ação para realizar login.
     * @param state - Estado atual.
     * @param action - Ação contendo o token e o usuário.
     */
    login(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    /**
     * Ação para realizar logout.
     * @param state - Estado atual.
     */
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

/**
 * Seleciona se o usuário está autenticado.
 * @param state - Estado global.
 * @returns Booleano indicando se o usuário está autenticado.
 */
export const selectIsAuthenticated = (state: any) => !!state.auth.token;

export default authSlice.reducer;
