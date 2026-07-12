import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, type LoginInput, type RegisterInput } from "../../lib/api/auth";
import { queryKeys } from "./query-client";

/** Current authenticated user (`null` when logged out). */
export function useMe() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authApi.me,
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: LoginInput) => authApi.login(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.auth.me }),
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: RegisterInput) => authApi.register(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.auth.me }),
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      qc.setQueryData(queryKeys.auth.me, null);
      qc.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
  });
}
