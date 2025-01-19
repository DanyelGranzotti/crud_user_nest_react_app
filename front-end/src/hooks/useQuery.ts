import {
  MutationCache,
  MutationCacheNotifyEvent,
  QueryCache,
  QueryCacheNotifyEvent,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";

/**
 * Cria um QueryClient com manipuladores globais de erro
 * para tanto queries (useQuery) quanto mutations (useMutation).
 */
export const createQueryClient = (
  navigate: (path: string) => void
): QueryClient => {
  const queryCache = new QueryCache({
    onError: (error, query) => {
      if (isOfflineError(error)) {
        navigate("/maintenance");
      }
    },
  });

  const mutationCache = new MutationCache({
    onError: (error, variables, context, mutation) => {
      if (isOfflineError(error)) {
        navigate("/maintenance");
      }
    },
  });

  const queryClient = new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  queryCache.subscribe((event: QueryCacheNotifyEvent) => {
    console.log("QueryCache event:", event);
  });

  mutationCache.subscribe((event: MutationCacheNotifyEvent) => {
    console.log("MutationCache event:", event);
  });

  return queryClient;
};

/**
 * Verifica se o erro é relacionado a problemas de conexão ou backend offline.
 * @param error - O erro retornado pela query ou mutation.
 * @returns `true` se o erro for de rede/offline; caso contrário, `false`.
 */
function isOfflineError(error: unknown): boolean {
  if (!navigator.onLine) return true;

  if (
    axios.isAxiosError(error) &&
    (!error.response ||
      error.code === "ECONNABORTED" ||
      error.code === "ECONNREFUSED" ||
      error.code === "ERR_NETWORK" ||
      error.message === "Network Error")
  ) {
    return true;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    "status" in (error as any).response &&
    ((error as any).response.status === 503 ||
      (error as any).response.status === 0)
  ) {
    return true;
  }

  return false;
}
