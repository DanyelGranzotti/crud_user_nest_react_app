import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../state/store";
import { loginService, refreshTokenService } from "../services/authService";
import { login, logout, refreshToken } from "../state/authSlice";
import { Credential } from "../types/credential";

/**
 * Hook para realizar o login do usuário.
 * @returns Função de mutação para realizar o login.
 */
export const useLogin = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation<Credential, Error, Credential>({
    mutationFn: async (credentials: Credential) => {
      const data = await loginService(credentials); // Chamada ao serviço
      dispatch(login(data)); // Atualiza o estado global
      return credentials; // Retorna as credenciais para corresponder ao tipo esperado
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error: Error) => {
      console.error("Error logging in:", error); // Loga o erro no console.
    },
  });
};

/**
 * Hook para realizar o logout do usuário.
 * @returns Função para realizar o logout.
 */
export const useLogout = () => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(logout()); // Despacha a ação de logout
  };
};

/**
 * Hook para atualizar o token do usuário.
 * @returns Função de mutação para atualizar o token.
 */
export const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation<{ token: string }, Error, void>({
    mutationFn: async () => {
      const data = await refreshTokenService(); // Chamada ao serviço
      dispatch(refreshToken()); // Atualiza o token no estado global
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error: Error) => {
      console.error("Error refreshing token:", error); // Loga o erro no console.
    },
  });
};

/**
 * Hook para verificar se o usuário está autenticado.
 * @returns Booleano indicando se o usuário está autenticado.
 */
export const useSelectIsAuthenticated = () => {
  return useSelector((state: RootState) => !!state.rootReducer.auth.token);
};
