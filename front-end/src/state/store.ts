import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import rootReducer, { RootState } from "./rootReducer";

/**
 * Configura a store do Redux com os reducers e middlewares necessários.
 */
const secretKey = process.env.REACT_APP_ENCRYPTION_KEY;
if (!secretKey) {
  throw new Error("Encryption key is not defined in environment variables");
}

const encryptor = encryptTransform({
  secretKey: secretKey as string,
  onError: function (error) {
    // Handle the error.
    console.error("Encryption error:", error);
  },
});

const persistConfig = {
  key: "root",
  storage,
  transforms: [encryptor],
  whitelist: ["auth"], // Only persist the auth reducer
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Inferência de tipos do estado Root e do Dispatch
export type AppState = ReturnType<typeof store.getState>;
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
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
