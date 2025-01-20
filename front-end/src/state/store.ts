import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import rootReducer from "./rootReducer";

/**
 * Configura a store do Redux com os reducers e middlewares necessários.
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Inferência de tipos do estado Root e do Dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks customizados para uso no React
/**
 * Hook para acessar o dispatch da store do Redux.
 * @returns O dispatch da store.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Hook para acessar o estado da store do Redux.
 * @returns O estado da store.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
