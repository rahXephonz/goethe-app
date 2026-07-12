import { useTranslation } from "@goethepro/i18n/react";
import { useLogout, useMe } from "../hooks/query/use-auth";
import { withProviders } from "./with-providers";

/** Home header — greeting + logout. User info comes from the API (useMe), not the DB. */
function HomeHeader() {
  const { t } = useTranslation();
  const { data: user, isLoading } = useMe();
  const logout = useLogout();

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">
        {isLoading ? t("common.loading") : t("dashboard.greeting", { email: user?.email ?? "" })}
      </h1>
      <button
        type="button"
        disabled={logout.isPending}
        onClick={() => logout.mutate(undefined, { onSuccess: () => location.reload() })}
        className="rounded-md border border-gray-300 px-2 py-1 text-xs font-medium hover:bg-gray-100 disabled:opacity-50"
      >
        {t("auth.logout")}
      </button>
    </div>
  );
}

/** Self-contained island (carries its own providers) — mount in .astro. */
export const HomeHeaderIsland = withProviders(HomeHeader);
