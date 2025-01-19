import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FloatingButton from "./components/theme/FloatingButton";
import { createQueryClient } from "./hooks/useQuery";
import AppRoutes from "./routes/router";
import { RootState, store } from "./state/store";

import "bootstrap/dist/css/bootstrap.min.css";
import { setTheme } from "./state/global/themeSlice";
import "./styles/global.css";

const navigate = (path: string) => {
  window.location.href = path;
};

const queryClient = createQueryClient(navigate);

/**
 * Função para aplicar o tema.
 */
const applyTheme = (theme: string) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

/**
 * Função para aplicar o favicon.
 */
const applyFavicon = (theme: string) => {
  const favicon = document.getElementById("favicon") as HTMLLinkElement;
  favicon.href = theme === "dark" ? "/svg/logo.svg" : "/svg/dark_logo.svg";
};

/**
 * Componente principal que aplica o tema e configura o React Query.
 */
const ThemedApp = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;
    dispatch(setTheme(initialTheme));
    applyFavicon(systemTheme);
  }, [dispatch]);

  useEffect(() => {
    applyTheme(theme);
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
        <FloatingButton />
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
