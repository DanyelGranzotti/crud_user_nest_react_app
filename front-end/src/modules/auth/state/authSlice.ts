import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { User } from "../../user/types/user";

interface AuthState {
  access_token: string | null;
  user: User | null;
  status: string;
  error: string | null;
}

/**
 * Estado inicial da autenticação.
 */
const initialState: AuthState = {
  access_token: null,
  user: null,
  status: "idle",
  error: null,
};

/**
 * Thunk para atualizar o access_token de autenticação.
 */
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { dispatch }) => {
    try {
      const response = await axios.post<{ access_token: string }>(
        `${process.env.API_END_POINT}${API_ENDPOINTS.AUTH.REFRESH}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        dispatch(logout());
        toast.error("Sessão expirada. Por favor, faça login novamente.");
      }
      throw error;
    }
  }
);

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
     * @param action - Ação contendo o access_token e o usuário.
     */
    login(state, action: PayloadAction<{ access_token: string }>) {
      console.log("login", action.payload);
      state.access_token = action.payload.access_token;
    },
    /**
     * Ação para realizar logout.
     * @param state - Estado atual.
     */
    logout(state) {
      state.access_token = null;
      state.user = null;
      localStorage.removeItem("persist:root"); // Remove persisted state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.access_token = action.payload.access_token;
    });
  },
});

export const { login, logout } = authSlice.actions;

/**
 * Seleciona se o usuário está autenticado.
 * @param state - Estado global.
 * @returns Booleano indicando se o usuário está autenticado.
 */
export const selectIsAuthenticated = (state: any) => !!state.auth.access_token;

export default authSlice.reducer;
