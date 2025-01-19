import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
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
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
