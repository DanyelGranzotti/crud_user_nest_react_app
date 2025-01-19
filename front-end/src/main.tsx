import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/router";
import { RootState, store } from "./state/store";

import "bootstrap/dist/css/bootstrap.min.css";
import { setTheme, toggleTheme } from "./state/global/themeSlice";
import "./styles/global.css";

const queryClient = new QueryClient();

/**
 * Componente principal que aplica o tema e configura o React Query.
 */
const ThemedApp = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
      <BrowserRouter>
        <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

/**
 * Componente raiz que envolve a aplicação com os provedores necessários.
 */
const Root = () => (
  <StrictMode>
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  </StrictMode>
);

createRoot(document.getElementById("root")!).render(<Root />);
