import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/query/query-client";
import { profileApi } from "@/lib/api/profile";
import { runRequest } from "@/lib/api/run";

/** Current user's profile. */
export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile.detail,
    queryFn: () => runRequest(profileApi.get()),
  });
}
