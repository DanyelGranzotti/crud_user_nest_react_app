import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme:
    localStorage.getItem("theme") ||
    (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),
};

/**
 * Slice do Redux para gerenciar o estado do tema.
 */
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    /**
     * Alterna o tema entre claro e escuro.
     * @param state - O estado atual do tema.
     */
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
    /**
     * Define o tema com base na ação fornecida.
     * @param state - O estado atual do tema.
     * @param action - A ação contendo o novo tema.
     */
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
