import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/query/query-client";
import { authApi } from "@/lib/api/auth";
import { runRequest } from "@/lib/api/run";
import type { LoginRequest, RegisterRequest } from "@/types/auth";

/** Current authenticated user (`null` when logged out). */
export function useMe() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => runRequest(authApi.me()),
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: LoginRequest) => runRequest(authApi.login(input)),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.auth.me }),
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: RegisterRequest) => runRequest(authApi.register(input)),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.auth.me }),
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => runRequest(authApi.logout()),
    onSuccess: () => {
      qc.setQueryData(queryKeys.auth.me, null);
      qc.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
  });
}
