import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../../lib/api/profile";
import { queryKeys } from "./query-client";

/** Current user's profile. */
export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile.detail,
    queryFn: profileApi.get,
  });
}
