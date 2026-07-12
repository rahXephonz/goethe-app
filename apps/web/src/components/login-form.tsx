import { useTranslation } from "@goethepro/i18n/react";
import { useState } from "react";
import { useLogin } from "../hooks/query/use-auth";
import { ApiError } from "../lib/api/client";
import { withProviders } from "./query-provider";

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none";
const labelClass = "block text-sm font-medium text-gray-700";

function LoginForm() {
  const { t } = useTranslation();
  const login = useLogin();
  const [error, setError] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        const data = Object.fromEntries(new FormData(e.currentTarget)) as {
          email: string;
          password: string;
        };
        try {
          await login.mutateAsync(data);
          location.href = "/dashboard";
        } catch (err) {
          setError(err instanceof ApiError ? err.message : t("auth.login.error"));
        }
      }}
    >
      <div className="space-y-1">
        <label htmlFor="email" className={labelClass}>
          {t("auth.login.email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="password" className={labelClass}>
          {t("auth.login.password")}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={login.isPending}
        className="w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {login.isPending ? t("auth.login.submitting") : t("auth.login.submit")}
      </button>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}

export const LoginFormIsland = withProviders(LoginForm);
